const mongoose = require('mongoose');

const MembersSchema = mongoose.Schema({
    nom:{
        type:String,
        required: true
    },
    prenom:{
        type:String,
        required:true
    },
    Adresse:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Member',MembersSchema);