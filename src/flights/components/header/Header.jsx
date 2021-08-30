import React from 'react';
import Search from '../search/Search';

const Header = () => {
  return (
    <div className='header'>
      <h1 className='header__title'>SEARCH FLIGHT</h1>
      <Search />
    </div>
  );
};

export default Header;
