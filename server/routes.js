const router = require("express").Router()
const redisClient = require('./redis')

router.get('/all', async (req, res) => {
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

router.get('/', async (req, res) => {
  const data = await redisClient.get(req.query.name)
  res.json(data)
})

router.post('/', async (req, res) => {
  const { url, allotedTime = 0, timeUsed = 0 } = req.body
  const data = await redisClient.hset(url, allotedTime, timeUsed)

  res.json(data)
})
