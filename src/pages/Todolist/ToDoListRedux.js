import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'; 
import axios from 'axios';
import {GET_TASK_API} from './../../redux/constants/ToDoListContants';
import {getTaskListAPI, addTaskAPI, deleteTaskAPI, checkTaskAPI, rejectTaskAPI} from './../../redux/actions/ToDoListAction';  
export default function ToDoListRedux(props) {
    let  taskList = useSelector(state => state.ToDoListReducer.taskList); 
    const dispatch = useDispatch(); 
    let [state, setState] = useState({
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
        dispatch(checkTaskAPI(taskName)); 
    }
    const getTaskList = () => {
        dispatch(getTaskListAPI); 
    }
    
    const rejectTask = (taskName) =>{
        dispatch(rejectTaskAPI(taskName)); 
    }
    const delTask = (taskName) => {
       dispatch(deleteTaskAPI(taskName))
    }
    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
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
        return taskList.filter(item => item.status).map((item, index) => {
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
       dispatch(addTaskAPI(state.values.taskName))
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
