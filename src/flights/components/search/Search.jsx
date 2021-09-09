import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as flightsActions from '../../flights.actions';
import { currentDate } from '../../flightsDateUtils';

const Search = ({ updateFilter, updateSearchData }) => {
  const [input, setInput] = useState('');
  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchParam = urlSearchParams.get('search');

  useEffect(() => {
    setInput(searchParam);
    updateFilter(!searchParam ? null : searchParam);
    updateSearchData(!input ? null : `?date=${currentDate}&search=${input}`);
  }, []);

  const onChange = (e) => {
    setInput(e.target.value.toUpperCase());
  };

  return (
    <div className='search'>
      <div className='search__input'>
        <div className='search__input-loupe'>
          <i className='fas fa-search search__input-loupe-icon' />
        </div>
        <input
          type='text'
          value={input}
          onChange={(e) => onChange(e)}
          className='search__input-field'
          placeholder='Airline, destination or flight #'
        />
      </div>
      <Link
        to={
          input
            ? `${window.location.pathname}?date=${currentDate}&search=${input}`
            : `${window.location.pathname}`
        }
      >
        <button
          className='search__btn'
          onClick={() => {
            updateFilter(!input ? null : input);
            updateSearchData(
              !input ? null : `?date=${currentDate}&search=${input}`
            );
          }}
        >
          <span className='search__btn-text'>SEARCH</span>
        </button>
      </Link>
    </div>
  );
};

Search.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  updateSearchData: PropTypes.func.isRequired,
};

const mapDispatch = {
  updateFilter: flightsActions.updateFilter,
  updateSearchData: flightsActions.updateSearchData,
};

export default connect(null, mapDispatch)(Search);
