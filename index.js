const express = require('express')
const app =  express()  
const PORT = 3000
const mysql = require('mysql')
const urlencodedParser = express.urlencoded({extended: false});

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'app',
  password : ''
})

const sql_append_user = `INSERT INTO info_users(username, password, email) VALUES('Sam', '31', '123123@gmail.com')`;



app.get('/', (req, res) =>{
  res.sendFile(__dirname + "/public.html")
})

app.post("/", urlencodedParser, function (request, response) {
  if(!request.body) return response.sendStatus(400);
  console.log(request.body);
  response.send(`${request.body.username} - ${request.body.password}`);
});


connection.connect()
connection.query(sql_append_user, function(err, results) {
  if (err) console.log(err)
  console.log(results)
})


connection.end()


app.listen(PORT, () => {
    console.log(`SERVER STARTED WITH PORT ${PORT}`)
})