const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userrouter =  require('./routes/userRoute')
const articleRouter = require('./routes/articleRoute')
const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(userrouter)
app.use(articleRouter)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
