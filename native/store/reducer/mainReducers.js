import jwtUserRducers from "./jwtUsersReducers";
import userReducers from "./userReducer";
import userUpReducers from './upUserReducer'
import contactsReducer from './ContactReducers'

import { combineReducers } from "redux";

const mainReducers = combineReducers({
  users: userReducers,
  session: jwtUserRducers,
  userUp: userUpReducers,
  contacts:contactsReducer
});

export default mainReducers;
