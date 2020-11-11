import axios from 'axios';
import { CREATE_USER, LOGIN_USER } from '../constans/constans';

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

// export const loginUser = (email, password) => (dispatch) => {
   
//       axios
//         .post(`${url}/api/auth/login`, {
//           email: email,
//           password: password,
//         })
//         .then((res) => {
//           const token = res.data.token;
//           console.log(res)
//           if (token) {
//             localStorage.setItem("token", token);
//             dispatch({
//               type: LOGIN_USER,
//             });

//             /* dispatch(getCurrentUser(token));
//             Swal.fire({
//               position: "center",
//               icon: "success",
//               title: `¡Bienvenido!`,
//               showConfirmButton: false,
//               timer: 2000,
//             }); */
//           }
          
//         })
//         .catch((error) => {
//           console.log(error)
//           });
        
    
  // };

 /*  export const getCurrentUser = (token) => async (dispatch) => {
  //Headers con Token
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  await axios.get(`${url}/users/me/`, config).then((res) => {
    dispatch({
      type: actionTypes.CURRENT_USER,
      user: res.data,
    });
  });
}; */