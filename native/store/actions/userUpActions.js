import axios from 'axios';
import { CREATE_USER, UP_USER } from '../constans/constans';

// const env = require('../../env.js')
import  {BACK_URL}  from '../../env';

//const {URL} = BACK_URL

// const localhost= env.localhost;




// CREAR USUARIO
export function userUp(code, onSuccess) {


    return(dispatch) => {

        console.log(code);
        axios.get(`${BACK_URL}/api/emails/confirm/${code}`)
            .then(res => {
                console.log("Funciona el Action UPUSER")
                dispatch({
                    type: UP_USER,
                    user: res.data || {},
                });
                onSuccess()

            }).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
             });
    }
};