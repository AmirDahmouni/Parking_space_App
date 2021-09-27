import {PARKING_LIST_REQUEST,PARKING_LIST_SUCCESS,PARKING_LIST_FAIL,
  PARKING_ADMIN_LIST_REQUEST,PARKING_ADMIN_LIST_SUCCESS,PARKING_ADMIN_LIST_FAIL,
  PARKING_ADMIN_DELETED,PARKING_ADMIN_ADDED,
  PARKING_DETAILS_SUCCESS,PARKING_DETAILS_FAILED
} from "../constants/parkingConstants"


function parkingListReducer(state = { parkings:[],parkingsAdmin:[], parking:{} }, action) {
    switch (action.type) {
      case PARKING_LIST_REQUEST:
        return {loading: true, parkings: [] };
      case PARKING_LIST_SUCCESS:
        return { loading: false, parkings: [...action.payload] }; 
      case PARKING_DETAILS_SUCCESS:
        return {...state,loading:false,parking:action.payload}
      case PARKING_DETAILS_FAILED:
        return {...state,loading:false,error:action.payload};
      case PARKING_LIST_FAIL:
        return { loading: false, error: action.payload };
      case PARKING_ADMIN_LIST_REQUEST:
        return {loading:true}
      case PARKING_ADMIN_LIST_SUCCESS:
        return { loading: false, parkingsAdmin: [...action.payload]}
      case PARKING_ADMIN_LIST_FAIL:
        return { loading: false, error: action.payload };
      case PARKING_ADMIN_DELETED:
        return {parkingsAdmin:state.parkingsAdmin.filter(parking=>parking._id!==action.payload)}
      case PARKING_ADMIN_ADDED: 
      return {parkingsAdmin:[...state.parkingsAdmin,action.payload]}
      default:
        return state;
    }
  }

export {parkingListReducer}