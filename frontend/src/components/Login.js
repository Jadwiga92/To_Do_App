import React from "react";
import login from './../CSS/login.css';
import restClient from './api/restClient'
import axios from "axios";
import {BrowserRouter as Router, Link} from 'react-router-dom';


class Login extends React.Component {

    state = {
        email: '',
        password: '',
        errorMessage: false

    };


    letMeInClick = (event) => {
        event.preventDefault();
//
        restClient.post('/login/login', {
            "email": this.state.email,
            "password": this.state.password

        }, {
            'content-type': 'application/json',
            'x-auth': localStorage.getItem('token')

        }).then((response) => {
            localStorage.setItem('token', response.headers['x-auth']);
            this.props.history.push("/tasks")

        })
            .catch((exception) => {
                console.log(exception);
                this.setState({errorMessage: true})
            });

    };
    componentDidMount() {
        console.log(this.props);
    }

    moveToSignUp = () => {

        this.props.history.push("/login/signup");

    };


    render() {

        return (
            <div className="login">
                <h1>Login</h1>


                <input type="text" name="u" placeholder="Email" value={this.state.email} onChange={(e) => {
                    this.setState({email: e.target.value})
                }}/>
                <input type="password" name="p" placeholder="Password" value={this.state.password}
                       onChange={(e) => {
                           this.setState({password: e.target.value})
                       }}/>
                <div>

                    <button type="text" className="btn btn-primary btn-block btn-large"
                            onClick={this.letMeInClick}>Let me in.
                    </button>

                </div>
                <div>
                    <p className="center">Not logged in </p>

                    <button onClick={this.moveToSignUp} type="text" className="btn btn-primary btn-block btn-large">Sign
                        up
                    </button>

                    <p/>
                </div>
                {this.state.errorMessage &&
                <h3 className="error" style={{color: 'red'}}> Wrong email or password</h3>}

                <h3 className="error" style={{color: 'green'}}> {this.props.location.state}</h3>


            </div>


        )
    }
}

export default Login;



