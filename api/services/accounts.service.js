'use strict'

//Imports from moleculer
const { MoleculerClientError } = require('moleculer').Errors;

//DbServices and Mongo
const DbService = require('moleculer-db');
const Account = require('../models/account.model');
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
                const user = await User.findById(_id)

                //handler Error
                if (!user) {
                    throw new MoleculerClientError(
                        'the user was not found!',
                        422,
                        '', [{ message: 'the user was not found!' }]
                    )
                }
                console.log(user)
                //Create 2 account for this user. The first in "Pesos a.k.a. accountOne" , 
                //and the second in 'Dolares a.k.a. accountTwo'
                //In my userSeeds i dont have dni, and i go to change it for phone
                const pesosCVU = await this.generateCVU(user.phone)
                const dolaresCVU = await this.generateCVU(user.phone)
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
        createdTransaction: {
            rest: 'POST /transactions',
            async handler(ctx) {

            }
        },
        getTransactions: {
            rest: 'GET /transactions',
            async handler(ctx) {

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