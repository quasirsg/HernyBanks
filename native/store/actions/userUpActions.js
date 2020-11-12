import axios from 'axios';
import { CREATE_USER, UP_USER } from '../constans/constans';

// const url = 'http://localhost:3000' || 'http://192.168.0.20:3000';
const url = 'http://192.168.0.20:3000';

// CREAR USUARIO
export function userUp(code) {


    return(dispatch) => {

        console.log(code);
        axios.get(`${url}/api/emails/confirm/${code}`)
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