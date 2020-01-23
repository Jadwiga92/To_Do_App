import React from "react";
import task from './../CSS/task.css'
import restClient from "./api/restClient";
import signup from './SignUp';


class Tasks extends React.Component {

    state = {
        tasks: [],
        id: null,
        description: '',

    };


    addTask = (event) => {
        // event.preventDefault();

        restClient.post('/tasks/', {

            "status": "to_do",
            "description": this.state.description

        }, {
            'content-type': 'application/json',


        }).then((response) => {

            this.showTasks();

        })
            .catch((exception) => {
                console.log(exception);
                this.setState({errorMessage: true})
            });

    };

    deleteClickTask = (id) => {

        const headers = {'content-type': 'application/json'};

        restClient.delete(`/tasks/${id}`, {headers}).then((response) => this.showTasks())
            .catch((error) => {
                console.log(error)
            })
    };


    showTasks = () => {


        restClient.get('/tasks/')
            .then((response) => {
                this.setState({tasks: response.data})
            })
            .catch(exception => console.log(exception));
    };

    renderTask = () => {
        return this.state.tasks.map((task, i) => {

            return (

                <div key={i}>
                    <div>
                        <input onClick={() => this.deleteClickTask(task.id)} type="checkbox" id="toggle"
                               className="visually-hidden"/>
                        <label htmlFor="toggle">{task.description}</label>


                    </div>

                    <hr/>

                </div>
            )
        })
    };

    componentDidMount() {
        this.showTasks();
    }


    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.addTask();
            this.setState({
                description: ''
            })
        }
    };
logOut=()=>{
    localStorage.removeItem('token');
    this.props.history.push("/login/login")
};

    render() {

        return (
            <div>
                <div id="myDIV" className="header">
                    <div className ='position'>
                        <button onClick={this.logOut} className="logout">Logout</button>

                    </div>
                    <input className="button" type="text" id="myInput" placeholder="Add task..."
                           onKeyDown={this.handleKeyDown} value={this.state.description} onChange={(e) => {
                        this.setState({description: e.target.value})
                    }}/>
                    <span className="addBtn" onClick={this.addTask}>
       Add
     </span>
                </div>
                <ul id="myUL">
                    <li>  {this.renderTask()}</li>


                </ul>
            </div>


        )


    }


}

export default Tasks;