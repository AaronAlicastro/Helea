const mongoose = require("mongoose");
const Schema = mongoose.Schema

var collection = new Schema({
    name: "String",
    background: "String",
    basicName: "String"
})

module.exports = mongoose.model( "Categorias" , collection);