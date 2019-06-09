const router = require("express").Router()
const redisClient = require('./redis')

router.get('/all', async (req, res) => {
  const multi = redisClient.multi()
  const keys = await redisClient.keys('*')

  keys.forEach(key => {
    multi.hmget(key, 'url', 'allotedTime', 'timeUsed')
  })

  multi.exec(function(err, result) {
    const websiteArray = result.map((ele, idx) => ({
        url: result[idx][0],
        allotedTime: result[idx][1],
        timeUsed: result[idx][2],
    }))

    res.json(websiteArray)
  })
})

router.get('/', async (req, res) => {
  const data = await redisClient.hmget(req.query.name, 'url', 'allotedTime', 'timeUsed')

  res.json({
    url: data[0],
    allotedTime: data[1],
    timeUsed: data[2]
  })
})

router.post('/', async (req, res) => {
  const { url, allotedTime = 0, timeUsed = 0 } = req.body
  const data = await redisClient.hmset(url, ['url', url, 'allotedTime', allotedTime, 'timeUsed', timeUsed])

  res.json(data)
})

module.exports = router
