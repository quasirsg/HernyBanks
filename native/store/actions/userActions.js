import axios from 'axios';
import { CREATE_USER } from '../constans/constans';

const url =  'localhost:3000' || '192.168.1.84:3000';

// CREAR USUARIO
export function createUser(userData) {
    const dataUser = {
        username:userData.username,
        email:userData.email,
        password:userData.password
    }
    return(dispatch) => {
        console.log(dataUser);
        axios.post(`http://${url}/api/users/create`, dataUser)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: CREATE_USER,
                    users: res.data || {},
                    createUserSuccess: true,
                });
            }).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
             });
    }
};