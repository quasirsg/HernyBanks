import { CREATE_USER, LOGIN_USER } from "../constans/constans";

const initialState = {
  users: [],
  userDetail: [],
  err: [],
  message: "",
};

const userReducers = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CREATE_USER:
      return { ...state, users: state.users.concat(action.users) };
    // case LOGIN_USER:
    //   return { user: action.users };
    default:
      return state;
  }
};

export default userReducers;
