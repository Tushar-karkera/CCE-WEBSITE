const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()


router.use(express.static(path.join(__dirname, '../templates')))


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../templates/htmlpages/3rdsem/3rdsempage.html"))
})
module.exports = router