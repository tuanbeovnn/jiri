import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Todolist.css'; 
import {useDispatch, useSelector} from 'react-redux'; 
import {ADD_TASK_API, GET_TASKLIST_API, DELETE_TASK_API, CHECK_TASK_API, REJECT_TASK_API} from './../../redux/constants/ToDoListContants'; 
export default function BaiTapToDoListSaga(props) {
    const dispatch  = useDispatch();
    const {taskList} = useSelector(state=> state.ToDoListReducer); 

    let [state, setState] = useState({
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    });
    const addTask = (e) =>{
        e.preventDefault(); 
        dispatch({
            type: ADD_TASK_API,
            taskName: state.values.taskName
        })
    }
    const deleteTask = (taskName) =>{
        dispatch({
            type: DELETE_TASK_API, 
            taskName: taskName
        })
    }
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

    const getTaskList = ()=>{
        dispatch({
            type: GET_TASKLIST_API,
        })
    }
    const checkTask = (taskName) =>{
        dispatch({
            type: CHECK_TASK_API,
            taskName: taskName
        })
    }
    const rejectTask = (taskName) => {
        dispatch({
            type: REJECT_TASK_API,
            taskName: taskName
        })
    }
   useEffect(()=>{
    getTaskList(); 
    return ()=>{
    }
   }, []); 

    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type="button" onClick = {()=>{deleteTask(item.taskName)}} className="remove"  >
                        <i className="fa fa-trash-alt"></i>
                    </button>
                    <button type="button" onClick = {()=>{checkTask(item.taskName)}} className="complete">
                        <i className="far fa-check-circle"></i>
                   
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
                    <button type="button" onClick = {()=>{deleteTask(item.taskName)}} className="remove"  >
                        <i className="fa fa-trash-alt"></i>

                    </button>
                    <button type="button" onClick = {()=>{rejectTask(item.taskName)}} className="complete" >
                        <i className="fa fa-undo-alt"></i>
                    </button>

                </div>
            </li>
        })
    }

    return (
        <form>
        <div className="card">
        <button className="btn btn-success" type="button">Dispatch action sage getTaskAPI</button>
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
                        <input id="newTask" type="text" onChange={handleChange} value={state.values.taskName} name="taskName"  placeholder="Enter an activity..." />
                        <button id="addItem"  onClick={()=>{addTask()}} type="submit">
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
