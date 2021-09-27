
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {userSigninReducer,userRegisterReducer,userListReducer} from './reducers/userReducers';
import {parkingListReducer} from "./reducers/parkingReducers"
import {bookingListReducer} from "./reducers/bookingReducers" 
import {carListReducer} from "./reducers/carsReducers"
import Cookie from 'js-cookie';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  userSignin: { userInfo },
};
const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userList:userListReducer,
    parkingList:parkingListReducer,
    bookingList:bookingListReducer,
    carsList:carListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;
