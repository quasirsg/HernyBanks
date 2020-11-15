import axios from "axios";
import jwt_decode from "jwt-decode";

import { BACK_URL } from "../../env";
import Toast from "react-native-toast-message";
import AsyncStorage from "react-native";

// const {URL} = BACK_URL

import * as actionTypes from "../constans/constans";
// const env = require('../../env.js')

// const localhost= env.localhost;

//loguin  -> funciona loguin correcto e incorrecto.
export const loguinUser = (email, password, onSuccess) => (dispatch) => {
  axios
    .post(`${BACK_URL}/api/auth/login`, {
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
        AsyncStorage.setItem("@token", token);
        dispatch({
          type: actionTypes.USER_LOGIN,
        });
        dispatch(getCurrentUser(token));
        onSuccess();
      }
    });
};

//obtener información del usuario logueado
export const getCurrentUser = (token) => async (dispatch) => {
  //Headers con Token
  var decoded = jwt_decode(token);
  console.log(typeof decoded.id);
  axios
    .get(`${BACK_URL}/api/users/by-id`, {
      params: {
        _id: decoded.id,
      },
    })
    .then((res) => {
      dispatch({
        type: actionTypes.CURRENT_USER,
        user: res.data,
      });
      Toast.show({
        type: "success",
        position: "top",
        text1: `Bienvenido ${res.data.name} `,
        visibilityTime: 6000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setTimeout(function () {
        onSuccess();
      }, 3000);
    })
    .catch((eror) => {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: `${error.message}`,
        visibilityTime: 6000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    });
};

export const verifySession = () => (dispatch) => {
  const { token } = AsyncStorage;
  if (token) {
    alert("usuario logeado");
    dispatch(getCurrentUser(token));
  } else {
    dispatch({
      type: actionTypes.NOT_CURRENT_USER,
      message: "No hay un usuario logueado.",
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
  Toast.show({
    type: "info",
    position: "top",
    text1: "Cerraste sesión",
    visibilityTime: 6000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
  dispatch({
    type: actionTypes.LOGOUT_USER,
  });
  dispatch({
    type: actionTypes.DELETE_ALL_CART,
  });
  AsyncStorage.removeItem("@token");
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
