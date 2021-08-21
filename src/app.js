const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const app = express();

//const { Pool } = require('pg');
//const pool = new Pool();

const db = require('./models');
db.conn.sync({foce:true})
.then(()=>{console.log("sync completed!")});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.use(index);

module.exports = app;