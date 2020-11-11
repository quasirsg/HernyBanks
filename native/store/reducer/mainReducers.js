import jwtUserRducers from "./jwtUsersReducers";
import userReducers from "./userReducer";


import { combineReducers } from "redux";

const mainReducers = combineReducers({

  users: userReducers,
  session: jwtUserRducers,
});

export default mainReducers;
