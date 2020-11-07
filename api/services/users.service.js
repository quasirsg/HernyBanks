"use strict";

const DbService = require("moleculer-db");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const { MoleculerClientError } = require("moleculer").Errors;
//const MongooseAdapter = require("moleculer-db-adapter-mongoose");

module.exports = {

	name: "users",

	mixin: [DbService],

	model: User,
	  
	settings: {
	/** Public fields */
		fields: ["_id", "username", "password"],
	/** Validator schema for entity */
		entityValidator: {
		 username: { type: "string"},
		 password: { type: "number"},
		}
	},

	afterConnected() {
        console.log('afterConnected')
    },

	actions: {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * The "moleculer-db" mixin registers the following actions:   *
		 *  - list													   *
		 *  - find													   *
		 *  - count													   *
		 *  - create												   *
		 *  - insert												   *
		 *  - update									   			   *
		 *  - remove												   *
		 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	    getUsers(ctx) {
	        return 'Hola User';
		},
		nameUser(ctx) {
			console.log('AQUI ES ID !!', ctx)
	        return 'Hola User whit name ' + ctx;
		},

		list: {
			async handler(){
				 const users = await User.find({});
				 return users
			}
		},

		remove: {
			async handler(ctx){
				let {id} = ctx.params;
				// const users = await this.adapter.remove({ _id: id }));
				const userDeleted = await User.findByIdAndRemove({ _id: id })
				console.log(id)
				return userDeleted
			}
		},

		update: {
			async handler(ctx){
				let {id, username, password} = ctx.params;

				const userUpdated = await User.findByIdAndUpdate({ _id: id }, {username, password})
				return userUpdated
			}
		},
		
		create: {
			// params: {
			// 	user: { type: "object" }
			// },
			async handler(ctx) {
				let entity = ctx.params;
				//await this.validateEntity(entity);
				if (entity.name) {
					//return 'Hola POST'
					const found = await User.findOne({ name: entity.name });
					if (found)
						return Promise.reject(
							new MoleculerClientError("Name exists!", 422, "Name exists!", [{ field: "name", message: "Name exists"}])
						);
				}
				// entity.password = bcrypt.hashSync(entity.password, 10);
				entity.password = entity.password || "";
		 		entity.name = entity.name || ""

				const doc = await User.create(entity);
				//const user = await this.transformDocuments(ctx, {}, doc);
				return doc
			    }
			},
		},

	created() {

		mongoose.connect("mongodb://localhost/henrybankDB", { 
			useCreateIndex: true,
			useNewUrlParser: true, 
			useFindAndModify: true,
			useUnifiedTopology: true
		})
		.then(() => {
			console.log('DATABASE IS CONNECTED');
		})
		.catch(error => {		
			console.error(error);
		});
	}
}