const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 4000
const routes = require('./routes')

app.use(bodyParser.json())
app.use(cors())

app.use('/redisClient', routes)

app.use((req, res) => {
  const err = new Error("Not Found")
  err.status = 404
  res.send(err)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
