const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_app',{ useNewUrlParser:true ,useUnifiedTopology: true },()=>{
    console.log(`COnnected DB successfully!!!`);
})