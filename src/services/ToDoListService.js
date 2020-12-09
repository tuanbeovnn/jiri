import axios from 'axios';
import {DOMAIN} from './../util/constants/settingSystem'; 
export class ToDoListService {
    constructor(){}
    getTaskApi = () =>{
        return axios ({
            url: `${DOMAIN}ToDoList/GetAllTask`,
            method: "GET"
        })
    }
    addTaskApi = (taskName) =>{
        return axios ({
            url: `${DOMAIN}ToDoList/addTask`,
            method: "POST",
            data:{
                taskName:taskName
            }
        })
    }
    deleteTaskApi = (taskName) =>{
        return axios ({
            url:`${DOMAIN}ToDoList/deleteTask?taskName=${taskName}`, 
            method: "DELETE",
            
        })
    }
    checkTaskApi = (taskName) =>{
        return axios ({
            url:`${DOMAIN}ToDoList/doneTask?taskName=${taskName}`, 
            method: "PUT",
            
        })
    }
    rejectTaskAPI = (taskName) =>{
        return axios ({
            url:`${DOMAIN}ToDoList/rejectTask?taskName=${taskName}`, 
            method: "PUT",           
        })
    }
}
export const toDoListService = new ToDoListService(); 