import axios from 'axios';
import { CREATE_USER } from '../constans/constans';

const url = '192.168.1.84:3000';

// CREAR USUARIO
export function createUser(userData) {
	return (dispatch) => {
		console.log(userData);
		axios
			.post(`http://${url}/api/users`, userData)
			.then((res) => {
				console.log(res.data);
				dispatch({
					type: CREATE_USER,
					users: res.data || {},
					createUserSuccess: true,
				});
			})
			.catch((error) => {
				console.log('Api call error');
				alert(error.message);
			});
	};
}
