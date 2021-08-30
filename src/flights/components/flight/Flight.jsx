import React from 'react';

const Flight = ({
  color,
  terminal,
  time,
  destination,
  status,
  airlineLogo,
  airlineName,
  flight,
}) => (
  <div className={`flight ${color}`}>
    <div className='flight__block'>
      <div className='flight__block-terminal'>
        <span className='flight__block-terminal-text'>{terminal}</span>
      </div>
    </div>
    <div className='flight__block'>{time}</div>
    <div className='flight__block'>{destination}</div>
    <div className='flight__block'>{status}</div>
    <div className='flight__block flight__block-airline'>
      <img
        src={airlineLogo}
        alt='Airline Logo'
        className='flight__block-airline-logo'
      />
      <div className='flight__block-airline-name'>{airlineName}</div>
    </div>
    <div className='flight__block'>{flight}</div>
    <div className='flight__block flight__details'>Flight details</div>
  </div>
);

export default Flight;
