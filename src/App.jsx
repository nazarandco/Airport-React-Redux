import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import Header from './flights/components/header/Header.jsx';
import Scoreboard from './flights/components/scoreboard/Scoreboard.jsx';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Scoreboard />
    </BrowserRouter>
  </Provider>
);

export default App;
