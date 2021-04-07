// const env = require("dotenv").config();
// const dotevn = require('dotenv')
require("dotenv").config()

config = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  user: process.env.USER_DB || 'root',
  password: process.env.PASS_DB || 'root',
  database: process.env.NAME_DB || 'image_firebase',
  port_db: 3006,
  dialect: "mysql"
}
module.exports = config

