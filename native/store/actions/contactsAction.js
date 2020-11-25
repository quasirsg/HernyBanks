import axios from "axios";
import { GET_CONTACTS, ADD_CONTACT_EMAIL } from "../constans/constans";

import { BACK_URL } from "../../env";
import Toast from "react-native-toast-message";

export function getContacts(id) {
  return (dispatch) => {
    axios
      .get(`${BACK_URL}/api/contacts/getContacts/`, {
        params: {
          _id: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_CONTACTS,
          contacts: res.data || [],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function addContact(currentId, email) {
  return (dispatch) => {
    axios
      .post(`${BACK_URL}/api/contacts/`, { _id: currentId, email: email })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: ADD_CONTACT_EMAIL,
          contact: res.data || [],
        });
        Toast.show({
          type: "success",
          position: "top",
          text1: "Contacto agregado",
          visibilityTime: 6000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function deleteContact(id, loginId, OnSucess) {
  return (dispatch) => {
    axios
      .delete(`${BACK_URL}/api/contacts/`, { id: id, loginId: loginId })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: ADD_CONTACT_EMAIL,
          contact: res.data || [],
        });
        setTimeout(function () {
          OnSucess();
          Toast.show({
            type: "success",
            position: "top",
            text1: "Contacto eliminado",
            visibilityTime: 6000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
