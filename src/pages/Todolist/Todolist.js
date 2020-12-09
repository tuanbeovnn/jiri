import React, { Component } from 'react';
import axios from 'axios';
import './Todolist.css';
export default class Todolist extends Component {
    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }

    }
    getTaskList = () => {
        let promise = axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: "GET"
        });
        promise.then((res) => {
            this.setState({
                taskList: res.data
            })
        })

        promise.catch((error) => { console.log(error) });
    }
    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type="button" className="remove" onClick={() => { this.delTask(item.taskName) }} >
                        <i className="fa fa-trash-alt"></i>
                    </button>
                    <button type="button" className="complete" onClick={() => { this.checkTask(item.taskName) }}>
                        <i className="far fa-check-circle"></i>
                        <i className="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>
        })
    }
    renderTaskToDoDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type="button" className="remove" onClick={() => { this.delTask(item.taskName) }} >
                        <i className="fa fa-trash-alt"></i>

                    </button>
                    <button type="button" className="complete" onClick={() => { this.rejectTask(item.taskName) }} >
                        <i className="fa fa-undo-alt"></i>
                    </button>

                </div>
            </li>
        })
    }
    rejectTask = (taskName) =>{
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "PUT",

        });
        promise.then(res => {
            console.log(res);
            this.getTaskList();
        });
        promise.catch(err => {
            console.log(err);
        })
    }
    checkTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT",

        });
        promise.then(res => {
            console.log(res);
            this.getTaskList();
        });
        promise.catch(err => {
            console.log(err);
        })
    }
    delTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: "DELETE"
        })
        promise.then(result => {
            this.getTaskList();
        });
        promise.catch(errors => {
            console.log(errors);
        })
    }
    componentDidMount() {
        this.getTaskList();
    }
    handleChange = (event) => {
        let { value, name } = event.target;
        let newValues = { ...this.state.values };
        let newErrors = { ...this.state.errors };
        newValues = { ...newValues, [name]: value }
        let regexString = /[a-z A-z]+$/;
        if (!regexString.test(value) || value.trim() === "") {
            newErrors[name] = name + " invalid !";
        } else {
            newErrors[name] = "";
        }

        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        })
    }
    addTask = (e) => {
        e.preventDefault();


        let promise = axios({
            url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
            method: "POST",
            data: { taskName: this.state.values.taskName }
        });
        promise.then(result => {
            this.getTaskList();
        });
        promise.catch(errors => {
            console.log(errors)
        })
    }

    render() {
        return (
            <form onSubmit={this.addTask}>
                <button className="btn btn-success">Get task list</button>
                <div className="card">
                    <div className="card__header">
                        <img src={require('./img/X2oObC4.png')} alt="hinhnen" />
                    </div>
                    <div className="card__body">

                        <div className="card__content">
                            <div className="card__title">
                                <h2>My Tasks</h2>
                                <p>September 9,2020</p>
                            </div>
                            <div className="card__add">
                                <input id="newTask" type="text" name="taskName" value={this.state.values.taskName} onChange={this.handleChange} placeholder="Enter an activity..." />

                                <button id="addItem" type="submit">
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <div className="text-danger">{this.state.errors.taskName}</div>
                            <div className="card__todo">
                                {/* Uncompleted tasks */}

                                <ul className="todo" id="todo">
                                    {this.renderTaskToDo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskToDoDone()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>


        )
    }
}

