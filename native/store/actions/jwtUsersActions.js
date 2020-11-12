import axios from 'axios';
import jwt_decode from 'jwt-decode';

import * as actionTypes from '../constans/constans';

const url = 'http://localhost:3000' || 'http://192.168.0.20:3000';
// const url = 'http://192.168.0.25:3000';

//loguin  -> funciona loguin correcto e incorrecto.
export const loguinUser = (email, password) => (dispatch) => {
	try {
		axios
			.post(`${url}/api/auth/login`, {
				email: email,
				password: password,
			})
			.then((res) => {
				console.log(res);
				const token = res.data;
				var decoded = jwt_decode(token);
				console.log(decoded.id);
				// console.log('soy el token',token);
				if (token) {
					localStorage.setItem('token', token);
					dispatch({
						type: actionTypes.USER_LOGIN,
					});
					dispatch(getCurrentUser(token));
					// Swal.fire({
					//   position: "center",
					//   icon: "success",
					//   title: `¡Bienvenido!`,
					//   showConfirmButton: false,
					//   timer: 2000,
					// });
				}
			});
		// .catch((error) => {
		//   Toast.fire({
		//     icon: "error",
		//     title: "Error: email o contraseña no válidos",
		//   });
		// });
	} catch {
		dispatch({
			type: actionTypes.USER_LOGIN_ERROR,
			message: 'Error de login',
		});
	}
};

//obtener información del usuario logueado
export const getCurrentUser = (token) => async (dispatch) => {
	//Headers con Token
	var decoded = jwt_decode(token);
	console.log(typeof decoded.id);
	axios
		.get(`${url}/api/users/by-id`, {
			params: {
				_id: decoded.id,
			},
		})
		.then((res) => {
			dispatch({
				type: actionTypes.CURRENT_USER,
				user: res.data,
			});
		});
};

export const verifySession = () => (dispatch) => {
	const { token } = localStorage;
	if (token) {
		alert('usuario logeado');
		dispatch(getCurrentUser(token));
	} else {
		dispatch({
			type: actionTypes.NOT_CURRENT_USER,
			message: 'No hay un usuario logueado.',
		});
	}
};

//logout
export const logoutUser = (path) => (dispatch) => {
  // Swal.fire({
  //   html: `<h5>¿Deseas cerrar sesión?<h5/>`,
  //   width: "30%",
  //   icon: "info",
  //   showCancelButton: true,
  //   customClass: {
  //     confirmButton: "btn btn-sm btn-primary",
  //     cancelButton: "btn btn-sm btn-default border",
  //   },
  //   cancelButtonText: "Cancelar",
  //   confirmButtonText: "Cerrar sesión",
  // }).then((res) => {
    // if (res.isConfirmed) {
      alert("¡Has cerrado sesión!", `Hasta la proxima`, "info");
      dispatch({
        type: actionTypes.LOGOUT_USER,
      });
      dispatch({
        type: actionTypes.DELETE_ALL_CART,
      });
      localStorage.removeItem("token");
    // }
  // });
};

// export const passwordChange = (id, values) => (dispatch) => {
//   return axios
//     .put(`${url}/users/${id}/passwordChange`, values)
//     .then((res) => {
//       dispatch({
//         type: actionTypes.USER_PUT_PASSWORD,
//         pass: res.data,
//       });
//       toast.fire({
//         icon: "success",
//         title: "Ha modificado su contraseña con exito!",
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//       Toast.fire({
//         icon: "error",
//         title: "Error: No se ha podido actualizar la contraseña",
//       });
//     });
// };
