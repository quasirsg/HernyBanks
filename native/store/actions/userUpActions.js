import axios from 'axios';
import { CREATE_USER, UP_USER } from '../constans/constans';
import { BACK_URL } from '../../env';

// CREAR USUARIO
export function userUp(code) {


    return(dispatch) => {

        console.log(code);
        axios.get(`${BACK_URL}/api/emails/confirm/${code}`)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: UP_USER,
                    user: res.data || {},
                });
            }).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
             });
    }
};