const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet');
const compression = require('compression');
const app = express()


// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())

//init db

// init routes
app.get('/', (req, res, next) => {
    const strCompress = 'Hello Factipjs'

    return res.status(500).json({
        message: 'Wellcome',
        metadata: strCompress.repeat(10000)
    })
})

// handing error

module.exports = app