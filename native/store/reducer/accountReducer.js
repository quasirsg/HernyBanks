import { GET_ACCOUNT } from "../constans/constans";

const initialState = {
  users: [],
  userDetail: [],
  err: [],
  message: "",
  userUp:{},
  account: []
};



const acoountReducers = (state = initialState, action) => {
  console.log(action);
  console.log("****Reducer***")

  switch (action.type) {
    case GET_ACCOUNT:
      return { ...state, account: action.data };
    default:
      return state;
  }
};

export default acoountReducers;