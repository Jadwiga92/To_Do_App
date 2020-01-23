
const express = require('express'), app = express(), bodyParser = require('body-parser');
const mysql = require('mysql');
const  cors = require('cors');
const port = process.env.PORT || 3001;
const tasks = require('./routes/tasks');
const login = require('./routes/login');
const dotenv = require("dotenv");
const Joi = require('@hapi/joi');
const priv = require('./private');
app.use(cors({credentials : true, origin : ['http://localhost:3000']}));


dotenv.config();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers","x-auth")
    next();
});

const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'to_do'
});

// connect to database
mc.connect();


app.listen(port, function() {
    console.log(`listening on ${port}`)
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/tasks", priv, tasks);
app.use("/login", login);

