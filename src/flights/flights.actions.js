import * as flightsGateway from './flightsGateway';

export const LIST_RECIEVED = 'FLIGHTS/LIST_RECIEVED';
export const UPDATE_FILTER = 'FLIGHTS/UPDATE_FILTER';
export const TOGGLE_FLIGHT_DIRECTION = 'FLIGHTS/TOGGLE_FLIGHT_DIRECTION';
export const UPDATE_SEARCH_DATA = 'FLIGHTS/UPDATE_SEARCH_DATA';

export const updateFilter = (filterText) => {
  return {
    type: UPDATE_FILTER,
    payload: {
      newFilterText: filterText,
    },
  };
};

export const flightsListRecieved = (flightsList) => {
  return {
    type: LIST_RECIEVED,
    payload: {
      flightsList,
    },
  };
};

export const toggleFlightDirection = (flightDirection) => {
  return {
    type: TOGGLE_FLIGHT_DIRECTION,
    payload: {
      newFlightDirection: flightDirection,
    },
  };
};

export const updateSearchData = (searchData) => {
  return {
    type: UPDATE_SEARCH_DATA,
    payload: {
      newSearchData: searchData,
    },
  };
};

export const getFlightsList = () => {
  const thunkAction = function (dispatch) {
    flightsGateway
      .fetchFlights()
      .then((flightsList) => dispatch(flightsListRecieved(flightsList.body)));
  };

  return thunkAction;
};
