import jwtUserRducers from "./jwtUsersReducers";
import userReducers from "./userReducer";
import userUpReducers from './upUserReducer'
import acoountReducers from './accountReducer'


import { combineReducers } from "redux";

const mainReducers = combineReducers({
  users: userReducers,
  session: jwtUserRducers,
  userUp: userUpReducers,
  contacts:contactsReducer,
  acoount : acoountReducers
});

export default mainReducers;
