const express = require('express')
const { init } = require('./util')
const bodyParser = require('body-parser')
const routePhone = require('./src/routes/route-phone')
const app = express()


const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Phones API - 2042408',
      version: '1.0.0',
      description: 'Use http://localhost:8080/api/{resoure endpoint} to access apis' 
    },
  },
  apis: [
    './src/routes/route-phone.js',
    './src/controllers/controller-phone.js',
  ], 
}
const swaggerSpec = swaggerJsDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routePhone)
app.use('/', (req, res) => {
  res.redirect('/docs')
})
app.use('*', (req, res) => {
  res.status(404).send("Invalid Resource Link");
})

app.listen(port, () => {
    init()
    console.log(`Server running at http://localhost:${port}`)
})