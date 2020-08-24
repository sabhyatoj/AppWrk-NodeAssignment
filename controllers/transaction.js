const transactionDB = require('../models/transactions');
const { check, validationResult } = require('express-validator');



async function getTransactions(req, res, next){
    try{
        const transactions = await transactionDB.find().sort({createdAt: -1} );
        // console.log(transactions);

        return res.send({transactions, success: true});
    }catch(e){
        console.log(e);
        next(e);
    }
}

async function transaction(req, res, next){
    try{
        await check('type').exists().run(req);
        await check('description').exists().run(req);
        await check('amount').exists().run(req);

        const result = validationResult(req);

        if(!result.isEmpty){
            return res.status(422).send({error : result.array()});
        } else {
            let lastClosingBalance = await transactionDB.aggregate([{$sort : {createdAt : -1}},
                { $limit : 1 }]);
            if(!lastClosingBalance || lastClosingBalance.length == 0){
                lastClosingBalance = 0;
            } else {
                lastClosingBalance = lastClosingBalance[0].closingBalance 
            }
            console.log(lastClosingBalance);
            const amount = Number(req.body.amount);
            
            const create = await transactionDB.create({description : req.body.description,
                  type : req.body.type,
                  amount : amount,
                  closingBalance: (req.body.type == 'CREDIT'? lastClosingBalance + amount : lastClosingBalance -amount )
                });

                return res.status(201).send({success: true})
        }

    } catch(e){
        console.log(e);
        next(e);
    }
}

module.exports = {
    getTransactions, transaction
}