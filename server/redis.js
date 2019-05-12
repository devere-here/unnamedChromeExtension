const asyncRedis = require("async-redis")
const client = asyncRedis.createClient()

client.on('connect', function() {
  console.log('Redis client connected')
})

client.on('error', function (err) {
  console.log('Something went wrong ' + err)
})

const clientTest = async () => {
  await client.set('poop', 'my test value')
  const testValue = await client.get('poop')

}

clientTest()

module.exports = client
