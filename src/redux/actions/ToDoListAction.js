import axios from 'axios';
import {GET_TASK_API} from '../constants/ToDoListContants'; 
export const getTaskListAPI = () => {
    //tiền xử lý dữ liệu => xử lý function 
    return dispatch => {
        let promise = axios({
            url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
            method: "GET"
        });
        promise.then((res) => {
            dispatch({
              type:GET_TASK_API, 
              taskList: res.data
            })
        })
        promise.catch((error) => { console.log(error) });
    }
}
export const addTaskAPI = (taskName) =>{
    return dispatch =>{
        let promise = axios({
            url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
            method: "POST",
            data: { taskName:taskName }
        });
        promise.then(result => {
            dispatch(getTaskListAPI());
        });
        promise.catch(errors => {
            console.log(errors)
        })
    }
}
export const deleteTaskAPI = (taskName) =>{
    return dispatch =>{
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: "DELETE"
        })
        promise.then(result => {
            dispatch(getTaskListAPI());
        });
        promise.catch(errors => {
            console.log(errors);
        })
    }
}
export const checkTaskAPI = (taskName) => {
    return dispatch =>{
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT"   
        });
        promise.then(res => {
            dispatch(getTaskListAPI());
        });
        promise.catch(err => {
            console.log(err);
        })
    }
}

export const rejectTaskAPI = (taskName) =>{
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "PUT"    
        });
        promise.then(res => {
            dispatch(getTaskListAPI());
        });
        promise.catch(err => {
            console.log(err);
        })
    }

}


    

