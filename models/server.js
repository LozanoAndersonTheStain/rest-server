const express = require('express')
const cors = require('cors')
const { dbConection } = require('../database/config.db')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/users'
    this.authPath = '/api/auth'

    // Conectar a la base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares()

    //Lectura y parseo del body
    this.app.use(express.json())

    // Rutas de mi app
    this.routes()
  }

  conectarDB() {
    dbConection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Directorio público
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user.routes'))
    this.app.use(this.authPath, require('../routes/auth.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App escuchando en http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
