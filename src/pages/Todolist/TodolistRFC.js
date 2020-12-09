import React, {useState, useEffect} from 'react';

import axios from 'axios';
import './Todolist.css'; 
export default function TodolistRFC(props) {
    let [state, setState] = useState({
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    });

    const handleChange = (event) =>{
        let { value, name } = event.target;
        let newValues = { ...state.values };
        let newErrors = { ...state.errors };
        newValues = { ...newValues, [name]: value }
        let regexString = /[a-z A-z]+$/;
        if (!regexString.test(value) || value.trim() === "") {
            newErrors[name] = name + " invalid !";
        } else {
            newErrors[name] = "";
        }
        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })
    
    }
    useEffect (()=>{
        getTaskList();
    })
    const checkTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT",

        });
        promise.then(res => {
            console.log(res);
            getTaskList();
        });
        promise.catch(err => {
            console.log(err);
        })
    }
    const getTaskList = () => {
        let promise = axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: "GET"
        });
        promise.then((res) => {
            setState({
                ...state,
                taskList: res.data
            })
        })

        promise.catch((error) => { console.log(error) });
    }
    
    const rejectTask = (taskName) =>{
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "PUT",

        });
        promise.then(res => {
            console.log(res);
            getTaskList();
        });
        promise.catch(err => {
            console.log(err);
        })
    }
    const delTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: "DELETE"
        })
        promise.then(result => {
            getTaskList();
        });
        promise.catch(errors => {
            console.log(errors);
        })
    }
    const renderTaskToDo = () => {
        return state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type="button" className="remove" onClick={() => {delTask(item.taskName) }} >
                        <i className="fa fa-trash-alt"></i>
                    </button>
                    <button type="button" className="complete" onClick={() => { checkTask(item.taskName) }}>
                        <i className="far fa-check-circle"></i>
                        <i className="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>
        })
    }
    const renderTaskToDoDone = () => {
        return state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type="button" className="remove" onClick={() => {delTask(item.taskName) }} >
                        <i className="fa fa-trash-alt"></i>

                    </button>
                    <button type="button" className="complete" onClick={() => {rejectTask(item.taskName) }} >
                        <i className="fa fa-undo-alt"></i>
                    </button>

                </div>
            </li>
        })
    }
   const  addTask = (e) => {
        e.preventDefault();
        let promise = axios({
            url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
            method: "POST",
            data: { taskName: state.values.taskName }
        });
        promise.then(result => {
            getTaskList();
        });
        promise.catch(errors => {
            console.log(errors)
        })
    }
    return (
        <form onSubmit={addTask}>
        <div className="card">
            <div className="card__header">
                <img  src={require('./img/X2oObC4.png')}  alt ="hinhNen"/>
            </div>
            {/* <h2>hello!</h2> */}
            <div className="card__body">

                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input id="newTask" type="text" value={state.values.taskName} name="taskName" onChange={handleChange} placeholder="Enter an activity..." />
                        <button id="addItem" type="submit" onClick={addTask}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="text-danger">{state.errors.taskName}</div>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskToDo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskToDoDone()}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </form>

    )

}
