import React, { Component } from 'react';

import './Auth.css';
import AuthContext from '../context/auth-context';

export class AuthPage extends Component {

    state = {
        isLogin: true
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };

        if (!this.state.isLogin) {
            
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {email: "${email}", password: "${password}"}) {
                            _id
                            email
                        }
                    }
                `
            };
            alert ('User created! Press Switch to Login button to Login!')
        }
        
        

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201) {
                alert ('Väärät kirjautumistiedot');
            }
            return res.json();
        })
        .then(resData => {
            if (resData.data.login.token) {
                this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration)
            }
        })
        
        .catch(err => {
            console.log(err);
        });
    };

    render() {
        return(
        <form className="auth-form" onSubmit={this.submitHandler}>
            <h1>{this.state.isLogin ? "Login" : "Signup"}</h1>
            <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" ref={this.emailEl} />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordEl} />
            </div>
            <div className="form-actions">
                <button type="button" onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Signup' : 'Login'} </button>
                <button type="submit">Submit</button>
            </div>
        </form>
        );
    }
}

export default AuthPage;