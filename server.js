const express = require('express');
const app = express();
const path = require('path');
let port = process.env.PORT;
port = 8080;


app.use(express.static('public'));

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'))
// })

// app.get("/", (req, res) => {
//  res.send({ hello: "world" });
// });

app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "index.html"));
});


app.listen(port, function() {
  console.log('App is running on port: ' + port);
});








