import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import Flight from '../flight/Flight.jsx';
import Info from '../info/Info.jsx';
import NoFlights from '../noFlights/NoFlights.jsx';
import * as flightsActions from '../../flights.actions';
import * as flightsSelectors from '../../flights.selectors';

const Direction = ({
  searchData,
  getFlightsList,
  arrivalFlights,
  departureFlights,
  departureFlightsList,
  arrivalFlightsList,
}) => {
  useEffect(() => getFlightsList(), []);

  const { direction } = useParams();

  const isFlightsList = (flightsList, flightsFilteredList) =>
    flightsFilteredList === null ? flightsList : flightsFilteredList;

  const flights = (checkDir) => {
    if (checkDir === 'departures' || !checkDir) {
      return isFlightsList(departureFlights, departureFlightsList);
    }
    if (checkDir === 'arrivals') {
      return isFlightsList(arrivalFlights, arrivalFlightsList);
    }
    return null;
  };

  const currentDepStatus = (currentDirection) =>
    currentDirection === 'departures' ||
    !currentDirection ||
    currentDirection !== ('departures' && 'arrivals')
      ? 'd-act'
      : 'd-pass';

  const currentArrStatus = (currentDirection) =>
    currentDirection === 'arrivals' ? 'a-act' : 'a-pass';

  return (
    <div className='direction'>
      <div className='direction__buttons'>
        <Link to={searchData ? `/departures${searchData}` : '/departures'}>
          <button
            className={`direction__common-for-btn direction__${currentDepStatus(
              direction
            )}-btn`}
          >
            <i
              className={`fas fa-plane direction__${currentDepStatus(
                direction
              )}-btn-icon`}
            />
            <h3
              className={`direction__${currentDepStatus(direction)}-btn-title`}
            >
              DEPARTURES
            </h3>
          </button>
        </Link>
        <Link to={searchData ? `/arrivals${searchData}` : '/arrivals'}>
          <button
            className={`direction__common-for-btn direction__${currentArrStatus(
              direction
            )}-btn`}
          >
            <i
              className={`fas fa-plane direction__${currentArrStatus(
                direction
              )}-btn-icon`}
            />
            <h3
              className={`direction__${currentArrStatus(direction)}-btn-title`}
            >
              ARRIVALS
            </h3>
          </button>
        </Link>
      </div>
      <Info />
      {flights(direction) ? (
        flights(direction).map((flight, index) => (
          <Flight
            flight={flight}
            index={index}
            key={flight.ID}
            direction={direction}
          />
        ))
      ) : (
        <NoFlights text='No flights' />
      )}
    </div>
  );
};

Direction.propTypes = {
  getFlightsList: PropTypes.func.isRequired,
  searchData: PropTypes.string,
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

export default connect(mapState, mapDispatch)(Direction);
