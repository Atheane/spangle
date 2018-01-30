var express = require('express');
var app = express();
var path = require('path');



// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'))
// })

app.get("/", (req, res) => {
   res.send({ hello: "world" });
});

// app.get('/rgb', function(req, res) {
//     res.sendFile(path.join(__dirname + '/projects/rgbGame.html'))
// })

// app.get('/resugame', function(req, res) {
//     res.sendFile(path.join(__dirname + '/projects/resuGame.html'))
// })

// app.use(express.static('assets'))

var PORT = process.env.PORT;

app.listen(PORT);
