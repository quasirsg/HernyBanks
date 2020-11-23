import axios from "axios";
import { GET_CONTACTS } from "../constans/constans";


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
          console.log(res.data)
        dispatch({
          type: GET_CONTACTS,
          contacts: res.data || [],
        });

      })
      .catch((error) => {
        console.log(error)
      });
  };
}


