var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()

mongoose.connect('mongodb://localhost/daily')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))

var Schema = mongoose.Schema // /
var thing = new Schema({}, {strict: false}) // /	create NoSchema for support schema
var daily = mongoose.model('dailyAccount', thing) // /

app.post('/', function (req, res) {
  var obj = new daily(req.body)
  obj.save(function (err) {
    if (err) console.log(err)
    else res.send(req.body)
  })
})

app.get('/db', function (req, res) {
  daily.find(function (err, done) {
    if (err) res.send(err)
    else res.send(done)
  })
})

app.delete('/db/:id', function (req, res) {
  daily.findById(req.params.id, function (err, done) {
    done.remove(function (err) {
      if (err) console.log(err)
      else res.send(done)
    })
  })
})

app.listen(3000, function () {
  console.log('connecting on port 3000 ...')
})
