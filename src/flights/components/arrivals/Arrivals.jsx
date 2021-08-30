import React from 'react';
import { Link } from 'react-router-dom';
import Flight from '../flight/Flight.jsx';
import Info from '../info/Info.jsx';
import NoFlights from '../noFlights/NoFlights.jsx';
import { formatMinutes } from '../../flightsDateUtils';

const Arrivals = ({ flights, toggleFlightDirection, searchData }) => (
  <div className='arrivals'>
    <div className='arrivals__buttons'>
      <Link to={searchData ? `/departures${searchData}` : '/departures'}>
        <button
          className='arrivals__departures-btn'
          onClick={() => toggleFlightDirection('departures')}
        >
          <i className='fas fa-plane arrivals__departures-btn-icon' />
          <h3 className='arrivals__departures-btn-title'>DEPARTURES</h3>
        </button>
      </Link>
      <button className='arrivals__btn'>
        <i className='fas fa-plane arrivals__btn-icon' />
        <h3 className='arrivals__btn-title'>ARRIVALS</h3>
      </button>
    </div>
    <Info />
    {flights && flights.length > 0 ? (
      flights.map((flight, index) => (
        <Flight
          color={index % 2 === 0 ? 'dark' : 'white'}
          key={flight.ID}
          terminal={flight.term}
          time={`${new Date(flight.timeToStand).getHours()}:${formatMinutes(
            new Date(flight.timeToStand)
          )}`}
          destination={flight['airportFromID.city_en']}
          status={
            (flight.status === 'CK' ? 'Check-in' : null) ||
            (flight.status === 'CC' ? 'Check-in closed' : null) ||
            (flight.status === 'ON' ? 'On time' : null) ||
            (flight.status === 'FR' ? 'In flight' : null) ||
            (flight.status === 'GC' ? 'Gate closed' : null) ||
            (flight.status === 'BD' ? 'Boarding' : null) ||
            (flight.status === 'CX' ? 'Cancelled' : null) ||
            (flight.status === 'DL'
              ? `Departure expected at ${new Date(
                  flight.timeDepExpectCalc
                ).getHours()}:${formatMinutes(
                  new Date(flight.timeDepExpectCalc)
                )}`
              : null) ||
            (flight.timeTakeofFact
              ? `Landed ${new Date(
                  flight.timeLandFact
                ).getHours()}:${formatMinutes(new Date(flight.timeLandFact))}`
              : null)
          }
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

export default Arrivals;
