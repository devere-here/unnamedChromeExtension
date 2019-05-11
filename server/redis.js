const redis = require('redis')
const client = redis.createClient()

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});


client.set('poop', 'my test value', redis.print);
client.get('poop', function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('GET result ->' + result);
});
