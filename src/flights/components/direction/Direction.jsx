import React from 'react';
import { Link } from 'react-router-dom';
import Flight from '../flight/Flight.jsx';
import Info from '../info/Info.jsx';
import NoFlights from '../noFlights/NoFlights.jsx';
import { formatMinutes } from '../../flightsDateUtils';
import { flightsStatusChecking } from '../../flightsStatusChecking';

const Direction = ({ flights, searchData, urlDirection, setUrlDirection }) => {
  const currentDepStatus = () =>
    urlDirection === 'departures' ? 'd-act' : 'd-pass';

  const currentArrStatus = () =>
    urlDirection === 'arrivals' ? 'a-act' : 'a-pass';

  return (
    <div className='direction'>
      <div className='direction__buttons'>
        <Link to={searchData ? `/departures${searchData}` : '/departures'}>
          <button
            className={`direction__common-for-btn direction__${currentDepStatus()}-btn`}
            onClick={() => setUrlDirection('departures')}
          >
            <i
              className={`fas fa-plane direction__${currentDepStatus()}-btn-icon`}
            />
            <h3 className={`direction__${currentDepStatus()}-btn-title`}>
              DEPARTURES
            </h3>
          </button>
        </Link>

        <Link to={searchData ? `/arrivals${searchData}` : '/arrivals'}>
          <button
            className={`direction__common-for-btn direction__${currentArrStatus()}-btn`}
            onClick={() => setUrlDirection('arrivals')}
          >
            <i
              className={`fas fa-plane direction__${currentArrStatus()}-btn-icon`}
            />
            <h3 className={`direction__${currentArrStatus()}-btn-title`}>
              ARRIVALS
            </h3>
          </button>
        </Link>
      </div>
      <Info />
      {flights && flights.length > 0 ? (
        flights.map((flight, index) => (
          <Flight
            color={index % 2 === 0 ? 'dark' : 'white'}
            key={flight.ID}
            terminal={flight.term}
            time={`${new Date(
              urlDirection === 'arrivals'
                ? flight.timeToStand
                : flight.timeDepShedule
            ).getHours()}:${formatMinutes(
              new Date(
                urlDirection === 'arrivals'
                  ? flight.timeToStand
                  : flight.timeDepShedule
              )
            )}`}
            destination={
              urlDirection === 'arrivals'
                ? flight['airportFromID.city_en']
                : flight['airportToID.city_en']
            }
            status={flightsStatusChecking(flight, urlDirection)}
            airlineName={flight.airline.en.name}
            airlineLogo={flight.airline.en.logoSmallName}
            flight={flight.codeShareData[0].codeShare}
          />
        ))
      ) : (
        <NoFlights text='No flights' />
      )}
    </div>
  );
};

export default Direction;
