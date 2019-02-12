import React, { Component } from 'react';
import './style/App.scss';
import Header from './Header';
import Calculator from './Calculator';

import Footer from './Footer';
import { HashRouter, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <>
          <Header/>
          <Switch>
            <Route exact path = "/" component = {Calculator}/>
          </Switch>
          <Footer/>
        </>
      </HashRouter>
    );
  }
}

export default App;