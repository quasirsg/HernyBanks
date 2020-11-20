// Enlaces del Menu Lateral

// En un array de secciones que adentro tienen dos propiedades: 'title' que es el titulo de cada seccion y un array 'links' donde que contiene los objetos de los enlaces

// Cada enlace tiene a su vez tres propiedades:
//      label       ------>       Lo que va a decir en el menu lateral
//      icon      ------->        Nombre del icono, ver el enlace (https://ionicons.com/v4/cheatsheet.html)
//      screen      ----->        Nombre de la screen a la que tiene que redirigir

// NO HACE FALTA MODIFICAR EL ARCHIVO CustomDrawerContent.js

export const EnlacesMenuLateral = [
	{
		sectionTitle: 'Resumen de la cuenta',
		links: [
			{ label: 'Inicio', icon: 'ios-home', screen: 'Inicio' },
			{ label: 'Ultimos movimientos', icon: 'ios-swap', screen: 'Ultimos Movimientos' },
			{ label: 'Estadisticas', icon: 'ios-stats', screen: 'Estadisticas' },
		],
	},
	{
		sectionTitle: 'Acciones',
		links: [
			{ label: 'Recargar dinero', icon: 'ios-wallet', screen: 'Recargar Dinero' },
			{ label: 'Transferir dinero', icon: 'ios-send', screen: 'Transferir Dinero' },
			{ label: 'Contactos', icon: 'ios-contact', screen: 'Contactos' },
		],
	},
	{
		sectionTitle: 'Mas',
		links: [{ label: 'FAQ', icon: 'ios-help-circle-outline', screen: 'FAQ' }],
	},
];
