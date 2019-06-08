const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 4000
const redisClient = require('./redis')

app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res) => {
  const data = await redisClient.get(req.query.name)
  res.json(data)
})

app.get('/all', async (req, res) => {
  const multi = redisClient.multi()
  const keys = await redisClient.keys('*')

  keys.forEach(key => {
    multi.get(key)
  })

  multi.exec(function(err, result) {
    const websiteArray = result.map((ele, idx) => ({
        timeUsed: result[idx],
        allotedTime: null,
        url: keys[idx]
    }))

    res.json(websiteArray)
  })
})

app.post('/', async (req, res) => {
  const { url, allotedTime = 0, timeUsed = 0 } = req.body
  const data = await redisClient.hset(url, allotedTime, timeUsed)

  res.json(data)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
