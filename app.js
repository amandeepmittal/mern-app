const express = require('express')
const bodyParser = require('body-parser')

const MONGODB_URI = 'mongodb://127.0.0.1:27017/mern-app'
const PORT = 5000

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB')
})
mongoose.connection.on('error', error => {
  console.log(error)
})

const app = express()

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'client/build')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})
