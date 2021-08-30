import { createSelector } from 'reselect';
import { formatDate } from './flightsDateUtils';

export const arrivalFlightsListSelector = (state) =>
  state.flights.flightsList.arrival;

export const departureFlightsListSelector = (state) =>
  state.flights.flightsList.departure;

export const filterTextSelector = (state) => state.flights.filterText;

export const flightDirectionSelector = (state) => state.flights.flightDirection;

export const searchDataSelector = (state) => state.flights.searchData;

export const todayDepartureFlightsListSelector = createSelector(
  [departureFlightsListSelector],
  (flightsList) =>
    flightsList
      ? flightsList.filter(
          (flight) =>
            formatDate(new Date(flight.actual)) === formatDate(new Date())
        )
      : null
);

export const todayArrivalFlightsListSelector = createSelector(
  [arrivalFlightsListSelector],
  (flightsList) =>
    flightsList
      ? flightsList.filter(
          (flight) =>
            formatDate(new Date(flight.actual)) === formatDate(new Date())
        )
      : null
);

const filterInputText = (value, textToFilter) =>
  value.toUpperCase().includes(textToFilter);

export const filteredDepartureFlightsListSelector = createSelector(
  [filterTextSelector, todayDepartureFlightsListSelector],
  (filterText, flightsList) =>
    filterText && flightsList
      ? flightsList.filter(
          (flight) =>
            filterInputText(flight.airline.en.name, filterText) ||
            filterInputText(flight['airportToID.city_en'], filterText) ||
            filterInputText(flight.codeShareData[0].codeShare, filterText)
        )
      : null
);

export const filteredArrivalFlightsListSelector = createSelector(
  [filterTextSelector, todayArrivalFlightsListSelector],
  (filterText, flightsList) =>
    filterText && flightsList
      ? flightsList.filter(
          (flight) =>
            filterInputText(flight.airline.en.name, filterText) ||
            filterInputText(flight['airportFromID.city_en'], filterText) ||
            filterInputText(flight.codeShareData[0].codeShare, filterText)
        )
      : null
);
