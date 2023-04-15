const express = require('express');
const path = require('path');


const app = express();
const port = process.env.PORT || 8080;
var mysql = require('mysql');
const http = require('http');
const cors = require("cors")



app.use(cors())




var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "blackbox"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// sendFile will go here
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/bin/index.html'));
  });
app.get('/alldata', (req, res) => {
    con.query('SELECT * FROM student ', (err, results) => {
        if (err) throw err;
         res.status(200).json({ data: results})
        //console.log('user:', results)
        ;
     });
})
app.get('/filter', (req, res) => {
  let querywhere='SELECT * FROM student '+req.query.ParamWHERE;
  con.query(querywhere, (err, results) => {
      if (err) throw err;
       res.status(200).json({ data: results})
       ;
   });
})
app.get('/insertstudent', (req, res) => {
  let querywhere='INSERT INTO student (name,pid,classification) VALUES '+req.query.ParamVALUES;
  con.query(querywhere, (err, results) => {
      if (err) throw err;
   });
})
app.listen(port);
console.log('Server started at http://localhost:' + port);

