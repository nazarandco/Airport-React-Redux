import {
  LIST_RECIEVED,
  UPDATE_FILTER,
  UPDATE_SEARCH_DATA,
} from './flights.actions';

const initialState = {
  flightsList: [],
  filterText: '',
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
