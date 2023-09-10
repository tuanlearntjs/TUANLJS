const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet');
const compression = require('compression');
const app = express()


// init middlewares
app.use(morgan("dev"))
app.use(helmet()) // ngan tran bin an cap thong tin phien ban minh su dung
app.use(compression()) // làm giảm băng thông truyền tải

//init db
 require('./dbs/init.mongodb')
  const {  countConnect } = require('./helpers/check.connect')
  countConnect()
  const { checkOverload } = require('./helpers/check.connect')
  checkOverload()

// init routes
app.get('/', (req, res, next) => {
    const strCompress = 'Hello Factipjs'

    return res.status(500).json({
        message: 'Wellcome',
        //metadata: strCompress.repeat(10000)
    })
})

// handing error

module.exports = app