import axios from "axios";
import { GET_CONTACTS } from "../constans/constantsContacts";
import { BACK_URL } from "../../env";
import Toast from "react-native-toast-message";


// ver los contactos de un usuario
export const getContacts = (id) => async(dispatch) =>{ 
    axios
      .get(`${BACK_URL}/api/contacts/`,{
        params:{
          _id:id
        },
      })
      .then((res) => {
        // console.log("action en contact");
        // console.log(res);
        dispatch({
          type: GET_CONTACTS,
          contacts: res.data || {},
        });
      })
      .catch((error) => {
          console.log(error);
      });

}

// export function editContact(idUserLoggedIn, email, username) { //id del usuario logueado
//     return (dispatch) => {
//       axios
//         .put(`${BACK_URL}/api/contacts/editusername`, {idUserLoggedIn, email, username})
//         .then((res) => {
//           dispatch({
//             type: EDIT_CONTACT,
//             user: res.data, // devuelve mensaje 'Updated'
//           });
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     };
//   }

// export function addContactEmail(id, email) { //_id del usuario logueado, email del contacto que queres agregar
// return (dispatch) => {
//     axios
//     .post(`${BACK_URL}/api/contacts/`, {id, email})
//     .then((res) => {
//         dispatch({
//         type: ADD_CONTACT_EMAIL,
//         user: res.data, // DEVUELVE JSON CON EL NUEVO CONTACTO
//         });
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// };
// }

// export function addContactPhone(idUserLoggedIn, phone) { //enviar phone del usuario que queres agregar y idUserLoggedIn
//     return (dispatch) => {
//       axios
//         .post(`${BACK_URL}/api/contacts/addbyphone`, {idUserLoggedIn, phone})
//         .then((res) => {
//           dispatch({
//             type: ADD_CONTACT_PHONE,
//             user: res.data, // DEVUELVE JSON CON EL NUEVO CONTACTO
//           });
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     };
//   }

//   export function deleteContact(idUserLoggedIn, id) { //id <<<de tu contacto,idUserLoggedIn
//     return (dispatch) => {
//       axios
//         .post(`${BACK_URL}/api/contacts`, {idUserLoggedIn, id})
//         .then((res) => {
//           dispatch({
//             type: DELETE_CONTACT,
//             user: res.data, // DEVUELVE mensaje con 'Contact deleted'
//           });
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     };
//   }

// export function sendWhatsapp(phone) { //ENVIAR INVITACION POR WHATSAPP
//     return (dispatch) => {
//       axios
//         .post(`${BACK_URL}/api/contacts`, {phone})
//         .then((res) => {
//           dispatch({
//             type: SEND_WHATSAPP,
//             user: res.data, // DEVUELVE mensaje con 'Notificacion enviada'
//           });
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     };
//   }
