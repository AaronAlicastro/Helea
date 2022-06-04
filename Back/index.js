var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.LINK)
    .then((db) => { console.log("Se ha conectado a la BD") })
    .catch((err) => { console.log(err) });

var publicaciones = require("./models/publicaciones");
var categorias = require("./models/categories");

app.get("/posts", async(req, res)=>{
    var content = await publicaciones.find();
    res.send(content);
});

app.get("/posts/categories", async(req, res)=>{
    var content = await categorias.find();
    res.send(content);
});

app.post("/posts", async(req, res)=>{
    var saving = new publicaciones(req.body);
    await saving.save();
    res.send(saving);
});

app.listen(3000);
