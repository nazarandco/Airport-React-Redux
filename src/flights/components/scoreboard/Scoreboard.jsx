import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Direction from '../direction/Direction.jsx';
import * as flightsActions from '../../flights.actions';
import * as flightsSelectors from '../../flights.selectors';

const Scoreboard = ({
  getFlightsList,
  arrivalFlights,
  departureFlights,
  departureFlightsList,
  arrivalFlightsList,
  searchData,
}) => {
  const path =
    window.location.pathname === '/'
      ? 'departures'
      : window.location.pathname.substring(1);

  const [urlDirection, setUrlDirection] = useState(path);

  useEffect(() => getFlightsList(), []);

  const isFlightsList = (flights, flightsList) =>
    flightsList === null ? flights : flightsList;

  return (
    <div className='scoreboard'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Direction
              flights={isFlightsList(departureFlights, departureFlightsList)}
              searchData={searchData}
              urlDirection={urlDirection}
              setUrlDirection={setUrlDirection}
            />
          </Route>
          <Route path='/departures'>
            <Direction
              flights={isFlightsList(departureFlights, departureFlightsList)}
              searchData={searchData}
              urlDirection={urlDirection}
              setUrlDirection={setUrlDirection}
            />
          </Route>
          <Route path='/arrivals'>
            <Direction
              flights={isFlightsList(arrivalFlights, arrivalFlightsList)}
              searchData={searchData}
              urlDirection={urlDirection}
              setUrlDirection={setUrlDirection}
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
  arrivalFlights: PropTypes.arrayOf(PropTypes.shape()),
  departureFlights: PropTypes.arrayOf(PropTypes.shape()),
  departureFlightsList: PropTypes.arrayOf(PropTypes.shape()),
  arrivalFlightsList: PropTypes.arrayOf(PropTypes.shape()),
};

const mapDispatch = {
  getFlightsList: flightsActions.getFlightsList,
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
