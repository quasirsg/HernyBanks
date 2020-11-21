import { GET_CONTACT } from "../constans/constans";

const initialState = {
  users: [],
  userDetail: [],
  err: [],
  message: "",
  userUp:{},
  contact: []
};



const contactReducers = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case GET_CONTACT:
      return { ...state, contact: action.data };
    
    default:
      return state;
  }
};

export default contactReducers;