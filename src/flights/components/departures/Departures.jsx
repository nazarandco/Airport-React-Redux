import React from 'react';
import { Link } from 'react-router-dom';
import Flight from '../flight/Flight.jsx';
import Info from '../info/Info.jsx';
import NoFlights from '../noFlights/NoFlights.jsx';
import { formatMinutes } from '../../flightsDateUtils';

const Departures = ({ flights, toggleFlightDirection, searchData }) => (
  <div className='departures'>
    <div className='departures__buttons'>
      <button className='departures__btn'>
        <i className='fas fa-plane departures__btn-icon' />
        <h3 className='departures__btn-title'>DEPARTURES</h3>
      </button>
      <Link to={searchData ? `/arrivals${searchData}` : '/arrivals'}>
        <button
          className='departures__arrivals-btn'
          onClick={() => toggleFlightDirection('arrivals')}
        >
          <i className='fas fa-plane departures__arrivals-btn-icon' />
          <h3 className='departures__arrivals-btn-title'>ARRIVALS</h3>
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
          time={`${new Date(flight.timeDepShedule).getHours()}:${formatMinutes(
            new Date(flight.timeDepShedule)
          )}`}
          destination={flight['airportToID.city_en']}
          status={
            (flight.status === 'CK' ? 'Check-in' : null) ||
            (flight.status === 'ON' ? 'On time' : null) ||
            (flight.status === 'FR' ? 'In flight' : null) ||
            (flight.status === 'GC' ? 'Gate closed' : null) ||
            (flight.status === 'BD' ? 'Boarding' : null) ||
            (flight.status === 'CC' ? 'Check-in closed' : null) ||
            (flight.status === 'CX' ? 'Cancelled' : null) ||
            (flight.status === 'DL'
              ? `Departure expected at ${new Date(
                  flight.timeDepExpectCalc
                ).getHours()}:${formatMinutes(
                  new Date(flight.timeDepExpectCalc)
                )}`
              : null) ||
            (flight.timeTakeofFact
              ? `Departed at ${new Date(
                  flight.timeTakeofFact
                ).getHours()}:${formatMinutes(new Date(flight.timeTakeofFact))}`
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

export default Departures;
