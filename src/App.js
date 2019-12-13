import React, { Component } from 'react';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Analysis from './components/Analysis';
import AuthPage from './components/Auth';
import './App.css';
import Navigation from './components/mainNavigation';
import AuthContext from './context/auth-context';


class App extends Component {
  state = {
    token: null,
    userId: null
  }
  
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  }

  logout = () => {
    this.setState({ token: null, userId: null });
  }


  render (){
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider value={{ 
            token: this.state.token, 
            userId: this.state.userId, 
            login: this.login, 
            logout: this.logout }}>
          <Navigation/>
          <main className="main-content">
            <Switch>
              {!this.state.token && <Redirect from="/" to="/auth" exact/>}
              {!this.state.token && <Redirect from="/dashboard" to="/auth" exact/>}
              {!this.state.token && <Redirect from="/analysis" to="/auth" exact/>}
              {this.state.token && <Redirect from="/auth" to="/dashboard" exact/>}
              {!this.state.token && (
              <Route path="/auth" component={AuthPage}/>)
              }
              {this.state.token && (
              <Route path="/dashboard" component={Dashboard}/>
              )}
              {this.state.token && ( 
              <Route path="/analysis" component={Analysis}/>
              )}
            </Switch>
            </main>
            </AuthContext.Provider>
        </React.Fragment>
    </BrowserRouter>
    );
  }
}
export default App;
