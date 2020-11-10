"use strict";
require('dotenv').config();

const nodemailer = require('nodemailer');
const Token = require('../models/token.model');
const { ADMIN_EMAIL, PASSW_EMAIL, VERIFICATION_URL } = process.env;

module.exports = {

	name: "emails",

	actions: {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Acción para el envío del correo de confirmación de cuenta   *
		 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		send_email(ctx) {
			
			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: ADMIN_EMAIL,
					pass: PASSW_EMAIL
				},
				tls: {
					rejectUnauthorized: false
				}
			});
			
			let mailOptions = {

				from: ADMIN_EMAIL,
				to: ctx.params.email,
				subject: 'Account Verification Token',
				text: 'Hola,\n\n' + 'Por favor verifica tu cuenta dando clic al siguente enlace:\n' + VERIFICATION_URL + ctx.params.token	 
			};
			
			transporter.sendMail(mailOptions, (error, info) => {

				if(error) { 
					console.log('Ocurrió un error, corrija el correo ingresado') 
				} 
				else { 
					console.log('Email enviado a: ', info.accepted) 
				}
				
			});
		},

		/* * * * * * * * * * * * * * * * * * * * * * * * *  * * * *
		 * Acción para confirmar correo y verificar al usuario	  *
		 * * * * * * * * * * * * * * * * * * * * * * ** * * * * * */
		email_confirmation: { 

			rest: "GET /confirm/:token",
			async handler(ctx){ 

				const token = await Token.findOne({ token: ctx.params.token });

				if(token) {
					
					const confirm = await ctx.call("users.verify_user", token._userId )

					if (confirm) return confirm;					
					else console.log('Falta esta opción'); //falta terminar
				}
				 
			}

		},

		/* * * * * * * * * * * * * * * * * * * * * * * * *
		 * Obtener todos los token (Solo para pruebas)	 *
		 * * * * * * * * * * * * * * * * * * * * * * * * */
		token: { 

			rest: "GET /token",
			async handler(){ 
				const exist = await Token.find();
				
				return exist
			}

		},
	}	
}