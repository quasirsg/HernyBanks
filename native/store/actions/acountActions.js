import axios from "axios";
import { GET_ACCOUNT, UP_USER } from "../constans/constans";


import { BACK_URL } from "../../env";
import Toast from "react-native-toast-message";


// CREAR USUARIO
export function getAccount(id) {
  return (dispatch) => {
    axios
      .get(`${BACK_URL}/api/accounts/getAccounts/`, {
        params: {
          _id: id,
        },
      })
      .then((res) => {
          console.log(res.data)
        dispatch({
          type: GET_ACCOUNT,
          data: res.data || [],
        });

      })
      .catch((error) => {
        console.log(error)
      });
  };
}
