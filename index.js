const express = require('express')
var ejs = require('ejs');
const path = require('path')
const app = express()

// Static Middleware 
app.use(express.static(path.join(__dirname, 'views')))

// View Engine Setup 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs') 

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
