import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Departures from '../departures/Departures';
import Arrivals from '../arrivals/Arrivals';
import * as flightsActions from '../../flights.actions';
import * as flightsSelectors from '../../flights.selectors';

const Scoreboard = ({
  getFlightsList,
  arrivalFlights,
  departureFlights,
  departureFlightsList,
  arrivalFlightsList,
  toggleFlightDirection,
  searchData,
}) => {
  useEffect(() => getFlightsList(), []);

  return (
    <div className='scoreboard'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Departures
              flights={
                departureFlightsList === null
                  ? departureFlights
                  : departureFlightsList
              }
              toggleFlightDirection={toggleFlightDirection}
              searchData={searchData}
            />
          </Route>
          <Route path='/departures'>
            <Departures
              flights={
                departureFlightsList === null
                  ? departureFlights
                  : departureFlightsList
              }
              toggleFlightDirection={toggleFlightDirection}
              searchData={searchData}
            />
          </Route>
          <Route path='/arrivals'>
            <Arrivals
              flights={
                arrivalFlightsList === null
                  ? arrivalFlights
                  : arrivalFlightsList
              }
              toggleFlightDirection={toggleFlightDirection}
              searchData={searchData}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

Scoreboard.propTypes = {
  getFlightsList: PropTypes.func.isRequired,
  searchData: PropTypes.string.isRequired,
  toggleFlightDirection: PropTypes.func.isRequired,
  arrivalFlights: PropTypes.arrayOf(PropTypes.shape()),
  departureFlights: PropTypes.arrayOf(PropTypes.shape()),
  departureFlightsList: PropTypes.arrayOf(PropTypes.shape()),
  arrivalFlightsList: PropTypes.arrayOf(PropTypes.shape()),
};

const mapDispatch = {
  getFlightsList: flightsActions.getFlightsList,
  toggleFlightDirection: flightsActions.toggleFlightDirection,
};

const mapState = (state) => ({
  arrivalFlights: flightsSelectors.todayArrivalFlightsListSelector(state),
  departureFlights: flightsSelectors.todayDepartureFlightsListSelector(state),
  departureFlightsList:
    flightsSelectors.filteredDepartureFlightsListSelector(state),
  arrivalFlightsList:
    flightsSelectors.filteredArrivalFlightsListSelector(state),
  searchData: flightsSelectors.searchDataSelector(state),
});

export default connect(mapState, mapDispatch)(Scoreboard);
