"use strict";

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context 
 */

module.exports = {
	name: "products",

	/* * * * * * 
	 * Mixins  *
	 * * * * * */
	mixins: [DbMixin("products")],

	/* * * * * * * 
	 * Settings  *
	 * * * * * * */
	settings: {
		// Campos disponibles en la respuesta 
		fields: [
			"_id",
			"name",
			"quantity",
			"price"
		],
		// Validador para las acciones `create` & `insert`.
		entityValidator: {
			name: "string|min:3",
			price: "number|positive"
		}
	},

	/* * * * * * * * *
	 * Action Hooks  *
	 * * * * * * * * */
	hooks: {
		before: {
			/* * * * * * * * * * * * * * * * * * * * * * * * * * *
			 * Register a before hook for the `create` action.   *
			 * It sets a default value for the quantity field.   *
			 *													 *
			 * @param {Context} ctx								 *
			 * * * * * * * * * * * * * * * * * * * * * * * * * * */
			create(ctx) {
				ctx.params.quantity = 0;
			}
		}
	},

	/* * * * * * * * * * * * * * * *
	 * Definición de las acciones  *
	 * * * * * * * * * * * * * * * */
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

		// --- ADDITIONAL ACTIONS ---

	   	/* * * * * * * * * * * * * * * * * * * * * * * *
		 * Increase the quantity of the product item.  *
		 * * * * * * * * * * * * * * * * * * * * * * * */
		increaseQuantity: {
			rest: "PUT /:id/quantity/increase",
			params: {
				id: "string",
				value: "number|integer|positive"
			},
			async handler(ctx) {
				const doc = await this.adapter.updateById(ctx.params.id, { $inc: { quantity: ctx.params.value } });
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);

				return json;
			}
		},

	   /* * * * * * * * * * * * * * * * * * * * * * * *
		* Decrease the quantity of the product item.  *
		* * * * * * * * * * * * * * * * * * * * * * * */
		decreaseQuantity: {
			rest: "PUT /:id/quantity/decrease",
			params: {
				id: "string",
				value: "number|integer|positive"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const doc = await this.adapter.updateById(ctx.params.id, { $inc: { quantity: -ctx.params.value } });
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);

				return json;
			}
		}
	},

	/* * * * * * * * * * * * * * * *
	 * Definición de los métodos   *
	 * * * * * * * * * * * * * * * */
	methods: {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
		 * Cargado data de ejemplo a la colección.						   *
		 * Se llama en DB.mixin después de que se establece la conexión a  *
		 * la base de datos y la colección está vacía  					   *
		 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		async seedDB() {
			await this.adapter.insertMany([
				{ name: "Samsung Galaxy", quantity: 10, price: 704 },
				{ name: "iPhone 11 Pro",  quantity: 25, price: 999 },
				{ name: "Huawei P30 Pro", quantity: 15, price: 679 },
			]);
		}
	},

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Se activa después de establecer la conexión a la base de datos  *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
		console.log('Connected');
	}
};
