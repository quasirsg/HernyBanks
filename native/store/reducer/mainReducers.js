import jwtUserRducers from "./jwtUsersReducers";
import userReducers from "./userReducer";
import userUpReducers from './upUserReducer'
import acoountReducers from './accountReducer'
import contactsReducers from './contactReducers'


import { combineReducers } from "redux";

const mainReducers = combineReducers({
  users: userReducers,
  session: jwtUserRducers,
  userUp: userUpReducers,
  contacts:contactsReducers,
  acoount : acoountReducers
});

export default mainReducers;
