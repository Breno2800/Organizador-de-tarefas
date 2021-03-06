const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Categoria = new Schema ({
    email: {
        type: String,
        required: true
    },
    opção1: {
        type: Number,
    
    },
    opção2: {
        type: Number, 
        
    },
    texto: {
        type: String,
        required: true
    }
})

mongoose.model('categorias', Categoria)