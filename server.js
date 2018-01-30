const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT;



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








