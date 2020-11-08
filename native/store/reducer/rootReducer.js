
import { 
    CREATE_USER  
} from '../constans/constans';


const initialState = {
    users:[]
}

const Reducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type){
        case CREATE_USER:
            return {...state, users: state.users.concat(action.users)};
    default:
        return state
    }

}


export default Reducer