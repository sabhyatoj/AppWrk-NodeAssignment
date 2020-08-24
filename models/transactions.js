const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    description: {type: String, required: true},
    type : {type : String, enum: ['CREDIT', 'DEBIT'], required: true},
    amount: {type: Number, required: true},
    closingBalance: {type: Number, required: false, default : 0},
}, {timestamps: true});

module.exports = mongoose.model("Transactions", TransactionSchema, 'transactions');