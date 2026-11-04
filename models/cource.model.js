const mongoose = require('mongoose')
const { types } = require('pg')

const courceSchema = new mongoose.Schema( { 
    title:{
        type:String,
        require: true
    },
    price:{
        type:Number,
        require:true
    }
})


module.exports = mongoose.model('Cources', courceSchema, 'Cources');    

