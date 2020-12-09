import {GET_TASK_API} from '../constants/ToDoListContants'; 

const initialState = {
taskList: []
}

const ToDoListReducer =  (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_API:
            state.taskList = action.taskList;          
            return {...state}  
        default:
             break; 
    }
    return {...state}
}
export default ToDoListReducer; 
