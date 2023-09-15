require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet');
const compression = require('compression');
const app = express()

console.log(`Process::`, process.env)
// init middlewares
app.use(morgan("dev"))
app.use(helmet()) // ngan tran bin an cap thong tin phien ban minh su dung
app.use(compression()) // làm giảm băng thông truyền tải
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

//init db
 require('./dbs/init.mongodb')
  const {  countConnect } = require('./helpers/check.connect')
  countConnect()
  const { checkOverload } = require('./helpers/check.connect')
  checkOverload()

// init routes
app.use('/', require('./routes'))

// handing error

module.exports = app