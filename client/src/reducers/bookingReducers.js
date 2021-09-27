import {BOOKINGS_LIST_SUCCESS,BOOKING_DELETED} from "../constants/bookingConstant"


function bookingListReducer(state = { }, action) {
    switch (action.type) {
      case BOOKINGS_LIST_SUCCESS:
          return { loading: false ,bookings:[...action.payload] };
      case BOOKING_DELETED:
        return { loading: false, bookings:state.bookings.filter(booking=>booking._id!==action.payload) };
      default: 
          return state;
    }
  }

export {bookingListReducer}