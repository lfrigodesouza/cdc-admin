import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Autor from './Autor';
import Livro from './Livro';
import Home from './Home';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/autor' component={Autor} />
        <Route path='/livro' component={Livro} />
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
);
