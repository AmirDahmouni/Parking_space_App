import {CARS_LIST_SUCCESS,CAR_DELETED,CAR_ADDED} from "../constants/carConstants"


function carListReducer(state = { }, action) {
    switch (action.type) {
      case CARS_LIST_SUCCESS:      
        return { loading: false ,cars:[...action.payload] };
      case CAR_DELETED:
        return { loading: false, cars:state.cars.filter(car=>car._id!==action.payload) };
      case CAR_ADDED:
            return {loading:false,cars:[...state.cars,action.payload]}
      default: 
          return state;
    }
  }

export {carListReducer}