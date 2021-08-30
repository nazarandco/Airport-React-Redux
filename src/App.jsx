import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store.js';
import Header from './flights/components/header/Header';
import Scoreboard from './flights/components/scoreboard/Scoreboard';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Scoreboard />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
