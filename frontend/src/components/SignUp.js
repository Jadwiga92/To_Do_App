import React from "react";
import login from './../CSS/login.css';
import restClient from "./api/restClient";
import {BrowserRouter, Route, Link} from 'react-router-dom';


class SignUp extends React.Component {
    state = {
        email: '',
        password: ''

    };

    addUser = (event) => {
        event.preventDefault();

        restClient.post('/login/signup', {

            "email": this.state.email,
            "password": this.state.password

        }, {
            'content-type': 'application/json',


        }).then((response) => {

            this.props.history.push("/login/login",);



        })
            .catch((exception) => {
                console.log(exception);

            });

    };

    render() {

        return (
            <div className="login">
                <h1>Sign up</h1>
                <form>

                    <input type="text" name="u" placeholder="Email" value={this.state.email} onChange={(e) => {
                        this.setState({email: e.target.value})
                    }}/>
                    <input type="password" name="p" placeholder="Password" value={this.state.password}
                           onChange={(e) => {
                               this.setState({password: e.target.value})
                           }}/>
                    <button type="submit" className="btn btn-primary btn-block btn-large"
                            onClick={this.addUser}>Sign up
                    </button>
                </form>
            </div>


        )
    }
}

export default SignUp;



