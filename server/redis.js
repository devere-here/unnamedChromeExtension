const asyncRedis = require("async-redis")
const client = asyncRedis.createClient()

client.on('connect', function() {
  console.log('Redis client connected')
})

client.on('error', function (err) {
  console.log('Something went wrong ' + err)
})

module.exports = client
