const express = require('express')

const app = express()
const PORT = 1234 || process.env.PORT

app.listen(PORT, () => console.log(`App is live on port ${PORT}`))

const path = require('path')

app.use(express.static(path.join(__dirname,'public')))