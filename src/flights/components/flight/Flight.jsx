import React from 'react';
import { formatMinutes } from '../../flightsDateUtils';
import { flightsStatusChecking } from '../../flightsStatusChecking';

const Flight = ({ flight, index, direction }) => (
  <div className={`flight ${index % 2 === 0 ? 'dark' : 'white'}`}>
    <div className='flight__block'>
      <div className='flight__block-terminal'>
        <span className='flight__block-terminal-text'>{flight.term}</span>
      </div>
    </div>
    <div className='flight__block'>{`${new Date(
      direction === 'arrivals' ? flight.timeToStand : flight.timeDepShedule
    ).getHours()}:${formatMinutes(
      new Date(
        direction === 'arrivals' ? flight.timeToStand : flight.timeDepShedule
      )
    )}`}</div>
    <div className='flight__block'>
      {direction === 'arrivals'
        ? flight['airportFromID.city_en']
        : flight['airportToID.city_en']}
    </div>
    <div className='flight__block'>{flightsStatusChecking(flight)}</div>
    <div className='flight__block flight__block-airline'>
      <img
        src={flight.airline.en.logoSmallName}
        alt='Airline Logo'
        className='flight__block-airline-logo'
      />
      <div className='flight__block-airline-name'>{flight.airline.en.name}</div>
    </div>
    <div className='flight__block'>{flight.codeShareData[0].codeShare}</div>
    <div className='flight__block flight__details'>Flight details</div>
  </div>
);

export default Flight;
