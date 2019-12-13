import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';

import './mainNavigation.css';
import AuthContext from '../context/auth-context';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
           return (
            <header className="main-navigation">

            <nav className="main-navigation__items">
                <ul>
                    {!context.token &&(
                    <li>
                        <NavLink to="/auth">Authenticate</NavLink>
                    </li> 
                    )}
                    {context.token &&(
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    )}   
                    {context.token &&(
                    <li>
                        <NavLink to="/analysis">Analysis</NavLink>
                    </li>
                    )}
                    <React.Fragment>
                    {context.token && (
                    <li>
                        <button onClick={context.logout}>Logout</button>
                    </li>
                    )}
                    </React.Fragment>
                    
                  </ul>
            </nav> 
        </header>
           )
        }}
    </AuthContext.Consumer>

);

        
        


export default mainNavigation