import jwtUserRducers from "./jwtUsersReducers";
import userReducers from "./userReducer";
import userUpReducers from './upUserReducer'


import { combineReducers } from "redux";

const mainReducers = combineReducers({
  users: userReducers,
  session: jwtUserRducers,
  userUp: userUpReducers
});

export default mainReducers;
