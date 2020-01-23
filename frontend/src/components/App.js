import React from "react";
// import axios from 'axios';
import Login from "./Login";
import SignUp from "./SignUp";
import Tasks from "./Tasks";
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';


class App extends React.Component {


    render() {

        return (

            <div><BrowserRouter>
                <div>
                    <Route exact path="/"  render={()=>(
                        <Redirect to="/login/login"/>
                    )}/>
                    <Route path="/login/login" exact component={Login}
                    />
                    <Route path="/login/signup" exact component={SignUp}/>
                    <Route path="/tasks" exact component={Tasks}/>
                </div>
            </BrowserRouter></div>
        );


    }

}

export default App;