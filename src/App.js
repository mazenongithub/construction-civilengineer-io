import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { CheckUserLogin } from './components/actions/api';
import * as actions from './components/actions/api';
import './App.css';

const Landing = () => {
  return (<div> Hello Construction App </div>)
}
class App extends Component {
  componentDidMount() {
    this.checkuser()
  }
  async checkuser() {
    let response = await CheckUserLogin();
    console.log(response)
  }
  render() {
    return (
      <BrowserRouter>
        <div className="general-container">

          <Switch>
            <Route exact path="/" component={Landing} />


          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    allusers: state.allusers
  }
}

export default connect(mapStateToProps, actions)(App);