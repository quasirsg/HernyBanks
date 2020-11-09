"use strict";
require('dotenv').config();

const nodemailer = require('nodemailer');
const { ADMIN_EMAIL, PASSW_EMAIL } = process.env;


module.exports = {
	name: "emails",

	actions: {
		send_email(){

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
				to: 'carlossaballe@gmail',
				subject: 'Este es el subject',
				text: 'Texto de prueba para el email' 
			};
			
			transporter.sendMail(mailOptions, (error, info) =>{
				if(error){
					console.log('Hubo un error', error);
				} else{
					console.log('Emial enviado');
				}
			});
		}
	}
}