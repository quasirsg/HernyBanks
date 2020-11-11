import axios from 'axios';
import { CREATE_USER } from '../constans/constans';

const url =  'localhost:3000' || '192.168.1.84:3000';

// CREAR USUARIO
export function userUp(code) {


    return(dispatch) => {

        console.log(code);
        axios.get(`http://${url}/api/emails/confirm/${code}`)
            .then(res => {
                console.log(res.data)
                // dispatch({
                //     type: CREATE_USER,
                //     users: res.data || {},
                //     createUserSuccess: true,
                // });
            }).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
             });
    }
};