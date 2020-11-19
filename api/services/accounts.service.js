'use strict'

//Imports from moleculer
const { MoleculerClientError } = require('moleculer').Errors;

//DbServices and Mongo
const DbService = require('moleculer-db');
const Account = require('../models/account.model');
const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');
const MongooseAdapter = require('moleculer-db-adapter-mongoose');
const mongoose = require('mongoose');

module.exports = {

    name: 'accounts',

    mixin: [DbService],

    adapter: new MongooseAdapter(
        'mongodb://localhost/henrybank', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ),

    model: Account,

    settings: {
        rest: '/accounts',
        fields: [

            ]
            //Validators
    },

    actions: {
        //Acount Actions
        createdAccounts: {
            rest: 'POST /',
            async handler(ctx) {
                
                const { _id } = ctx.params; //user id
                console.log("id cuenta: ", _id)
                const user = await User.findById(_id)

                //handler Error
                if (!user) {
                    throw new MoleculerClientError(
                        'the user was not found!',
                        422,
                        '', [{ message: 'the user was not found!' }]
                    )
                }

                //Create 2 account for this user. The first in "Pesos a.k.a. accountOne" , 
                //and the second in 'Dolares a.k.a. accountTwo'
                //In my userSeeds i dont have dni, and i go to change it for phone
                const pesosCVU = await this.generateCVU(user.dni)
                const dolaresCVU = await this.generateCVU(user.dni)
                const accountOne = await this.generateAccount(pesosCVU, 'Pesos', user._id)
                const accountTwo = await this.generateAccount(dolaresCVU, 'Dolares', user._id);

                await accountOne.save();
                await accountTwo.save();
                user.accounts.push(accountOne, accountTwo)
                await user.save()

                return ({ 'CuentaEnPesos': accountOne, 'CuentaEnDolares': accountTwo })

            }
        },
        getAccounts: {
            rest: 'GET /',
            async handler(ctx) {
                const { _id } = ctx.params; //user id
                const accounts = await Account.find({ _userId: _id })

                if (!accounts) {
                    throw new MoleculerClientError(
                        'there are not accounts for this user!',
                        422,
                        '', [{ message: 'there are not accounts for this user!' }]
                    )
                }

                return accounts;
            }
        },
        deleteAccount: {
            rest: 'DELETE /',
            async handler(ctx) {

            }
        },
        //Transaction Actions
        getTransactions: {
            rest: 'GET /transactions',
            async handler(ctx) {
                const { cvu } = ctx.params; //account id
                const account = await Account.findOne({ cvu })

                if (!account) {
                    throw new MoleculerClientError(
                        'there are not accounts for this user!',
                        422,
                        '', [{ message: 'there are not accounts for this user!' }]
                    )
                }

                const transactions = await Transaction.find({
                    $or: [
                        { fromAccount: account._id },
                        { toAccount: account._id }
                    ]
                }).populate('fromAccount').populate('toAccount')

                return transactions && transactions;
            }
        },
        rechargeByQR: {
            rest: 'POST /rechargebyqr',
            async handler(ctx) {
                const { amount, cvu } = ctx.params;
                const recharge = await this.recharge(amount, cvu, 'QR');

                return recharge && recharge;
            }
        },
        rechargeByCard: {
            rest: 'POST /rechargebycard',
            async handler(ctx) {
                const { amount, cvu } = ctx.params;
                const recharge = await this.recharge(amount, cvu, 'Credit Card');

                return recharge && recharge;
            }
        },
        transfer: {
            rest: 'POST /transfer',
            async handler(ctx) {
                const { from, to, amount, description } = ctx.params;

                const fromAccount = await Account.findOne({ cvu: from })
                const toAccount = await Account.findOne({ cvu: to })

                if (fromAccount.balance - parseInt(amount, 10) >= 0) {
                    fromAccount.balance = fromAccount.balance - parseInt(amount, 10);
                    toAccount.balance += parseInt(amount, 10);

                    const transaction = await this.generateTransaction(
                        'Transfer',
                        fromAccount._id,
                        toAccount._id,
                        description,
                        parseInt(amount, 10),
                    );

                    await transaction.save()

                    fromAccount.transactions.push(transaction);
                    toAccount.transactions.push(transaction);

                    await fromAccount.save()
                    await toAccount.save()

                    return 'the transaction was succesful'
                } else {
                    return 'You do not have enough balance'
                };
            }
        },

    },

    methods: {
        generateCVU(dni) {
            const rdm = () => parseInt(Math.random() * 10).toString();
            const x = dni.toString();
            const last4 = x.substring(x.length - 4, x.length)
            const cvu = '00000000' + rdm() + rdm() + rdm() + rdm() + rdm() + rdm() + rdm() + rdm() + rdm() + rdm() + last4;
            return cvu
        },
        generateAccount(cvu, type, _userId) {
            const account = new Account({
                cvu,
                type,
                _userId
            })
            if (!account) {
                throw new MoleculerClientError(
                    'there are not accounts for this user!',
                    422,
                    '', [{ message: 'there are not accounts for this user!' }]
                )
            }
            return account
        },
        generateTransaction(by, fromAccount, toAccount, description, amount) {
            const transaction = new Transaction({
                by,
                fromAccount,
                toAccount,
                description,
                amount
            })
            if (!transaction) {
                throw new MoleculerClientError(
                    'there are not accounts for this user!',
                    422,
                    '', [{ message: 'there are not accounts for this user!' }]
                )
            }
            return transaction
        },
        async recharge(amount, cvu, type) {
            const account = await Account.findOne({ cvu })

            const transaction = await this.generateTransaction(
                type,
                account._id,
                account._id,
                'Recharge',
                parseInt(amount, 10)
            );
            transaction.save()
            account.transactions.push(transaction)
            const balance = account.balance + parseInt(amount, 10)
            account.balance = balance;
            account.save();

            return account;
        }
    },

    created() {
        mongoose.connect(
                'mongodb://localhost/henrybank', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            )
            .then(() => console.log('Account Service Online'))
            .catch(err => console.log({
                message: 'Error to connect DB',
                error: err
            }));
    },

}







