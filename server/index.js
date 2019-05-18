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

app.post('/', async (req, res) => {
  const { url, time } = req.body
  const data = await redisClient.set(url, time)

  res.json(data)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
