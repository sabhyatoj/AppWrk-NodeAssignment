const mongoose = require('mongoose');
const url = `localhost:27017/transactionApp`;

mongoose.connect('mongodb://'+url,  { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> {
    console.log('Mongodb is connected ');
}).catch(err=>{
    console.log('unable to connect mongoDB');
    console.error(err);
    process.exit(1);
})

module.exports = mongoose.connection;