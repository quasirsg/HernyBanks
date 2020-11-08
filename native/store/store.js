
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from './reducer/rootReducer';
import thunk from 'redux-thunk';



export const st = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));