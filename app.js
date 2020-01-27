const express = require('express')
const app = express()
const port = 4000
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/', (req, res) => res.json('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}! 🍉`))
