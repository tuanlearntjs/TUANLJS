'use strict'

const express = require('express')
const router = express.Router()


router.use('/v1/api', require('./access'))
// router.get('', (req, res, next) => {
//     const strCompress = 'Hello Factipjs'

//     return res.status(500).json({
//         message: 'Wellcome',
//     })
// })

module.exports = router 