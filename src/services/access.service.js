'use strict'

const shopModel = require("../models/shop.model")
// dùng brcypt để băm password nhằm mã hoá mật khẩu
const brcypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData } = require("../ultils/index")

const RoleShop = {
    SHOP: 'SHOP' ,
    WRITER: 'WRITER' ,
    EDITOR: 'EDITOR' , 
    ADMIN: 'ADMIN'
}

class AccessService {

    static signUp = async ({ name, email, password}) => {
        try {
                // step 1: check sự tồn tại của email
                const holderShop = await shopModel.findOne({ email }).lean()
                if(holderShop) {
                    return {
                        code: 'xxx' ,
                        message: 'Shop already registered'
                    }
                }
                // brcypt.hash(biến mk, số salt băm )
                const passwordHash = await brcypt.hash(password, 10 )
                const newShop = await shopModel.create({
                    name: name?.trim(),
                    email: email?.trim(),
                    password: passwordHash,
                    roles: [RoleShop.SHOP],
                  });
              

                if(newShop) {
                    // created privateKey : lấy token, publicKey : kiểm tra token, tránh để lộ public mà lộ thông tin login ,  npm i crypto --save
                    // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa' , {
                    //     modulusLength: 4096,
                    //     publicKeyEncoding: {
                    //         type: 'pkcs1' ,
                    //         format: 'pem'
                    //     },
                    //     privateKeyEncoding: {
                    //         type: 'pkcs1' ,
                    //         format: 'pem'
                    //     }
                    // })

                    const privateKey = crypto.randomBytes(64).toString('hex')
                    const publicKey = crypto.randomBytes(64).toString('hex')
                    // Public key CryptoGraphy Standard

                    console.log({privateKey, publicKey}) // save Collection KeyStore

                    const keyStore = await KeyTokenService.createKeyToken({
                        userId: newShop._id ,
                        publicKey,
                        privateKey
                    })

                    if(!keyStore){
                        return {
                            code: 'xxxx' , 
                            message: 'keyStore error'
                        }
                    }
                    //create token pair
                    const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey)
                    console.log(`Created Token Success::`, tokens)

                    return {
                        code: 201 ,
                        metadata: {
                            shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop}),
                            tokens
                        }
                    }
                    //const tokens = await 
                }
                return {
                    code: 200 ,
                    metadata: null
                }

        } catch (error) {
            return {
                code:'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService