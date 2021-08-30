import {
  LIST_RECIEVED,
  UPDATE_FILTER,
  TOGGLE_FLIGHT_DIRECTION,
  UPDATE_SEARCH_DATA,
} from './flights.actions';

const initialState = {
  flightsList: [],
  filterText: '',
  flightDirection: 'departures',
  searchData: null,
};

const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_RECIEVED: {
      return {
        ...state,
        flightsList: action.payload.flightsList,
      };
    }
    case UPDATE_FILTER: {
      const { newFilterText } = action.payload;
      return {
        ...state,
        filterText: newFilterText,
      };
    }
    case TOGGLE_FLIGHT_DIRECTION: {
      const { newFlightDirection } = action.payload;
      return {
        ...state,
        flightDirection: newFlightDirection,
      };
    }
    case UPDATE_SEARCH_DATA: {
      const { newSearchData } = action.payload;
      return {
        ...state,
        searchData: newSearchData,
      };
    }
    default:
      return state;
  }
};

export default flightsReducer;
