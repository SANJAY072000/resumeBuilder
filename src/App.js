import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './components/Home';

export default class App extends Component {
  render(){
    return(
      <Router>
      <div>
      <Route path='/' exact component={Home}/>
      </div>
      </Router>
    );
  }
}
