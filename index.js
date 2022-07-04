const express = require('express')
const { init } = require('./util')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routePhone = require('./src/routes/route-phone')

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).send("invalid token...");
      } else {
        next(err)
      }
})

app.use('/api', routePhone)
app.use('*', (req, res) => {
  res.status(404).send("Invalid Resource Link");
})

app.listen(port, () => {
    init()
    console.log(`Server running at http://localhost:${port}`)
})