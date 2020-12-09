import { takeEvery } from 'redux-saga/effects';
import { fork, take, call, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { GET_TASK_API, ADD_TASK_API, GET_TASKLIST_API, DELETE_TASK_API, REJECT_TASK_API, CHECK_TASK_API } from './../constants/ToDoListContants';
import { toDoListService } from '../../services/ToDoListService';
import { STATUSCODE } from '../../util/constants/settingSystem';
import {DISPLAY_LOADING,HIDE_LOADING } from './../constants/LoadingConst'; 
function* getTaskAPIAction(action) {
    yield put({
        type: DISPLAY_LOADING
    });
    try {
        let { data, status } = yield call(toDoListService.getTaskApi);
        yield delay(1000);
        if(status === STATUSCODE.SUCCESS){
            yield put({
                type: GET_TASK_API,
                taskList: data
            });
        } else {
            console.log("Error"); 
        }
    } catch (error) {
        console.log(error);
    }
    yield put({
        type: HIDE_LOADING
    });
}
export function* theoDoiActionGetTaskApi() {
    //    yield fork(getTaskAPI);  
    yield takeLatest(GET_TASKLIST_API, getTaskAPIAction)

} 

function* addTaskApiAction (action) {
    const {taskName} = action; 
    try {
       const {data, status} =   yield call(()=> {return toDoListService.addTaskApi(taskName)});
        if(status === STATUSCODE.SUCCESS){
             yield put ({
                 type:GET_TASKLIST_API
             })
         }
    }catch(err){
        console.log(err)
    }
}

export function* theoDoiActionAddTaskApiAction () {
    yield takeLatest(ADD_TASK_API, addTaskApiAction )


} 
function* deleteTaskApiAction (action) {
    const {taskName} = action; 
    try {
       const {data, status} =   yield call(()=> {return toDoListService.deleteTaskApi(taskName)});
       console.log(status);
        if(status === STATUSCODE.SUCCESS){
             yield put ({
                 type:GET_TASKLIST_API             
             })
         }
     }catch(err){
        console.log(err)
     }   
}
export function* theoDoiActionDeleteTaskApiAction (){
    yield takeLatest(DELETE_TASK_API, deleteTaskApiAction); 
}

function* rejectTaskApiAction (action) {
    const {taskName} = action; 
    try {
       const {data, status} =   yield call(()=> {return toDoListService.rejectTaskAPI(taskName)});
        if(status === STATUSCODE.SUCCESS){
             yield put ({
                 type:GET_TASKLIST_API             
             })
         }
     }catch(err){
        console.log(err)
     }   
}
export function* theoDoiActionRejectTaskApiAction (){
    yield takeLatest(REJECT_TASK_API, rejectTaskApiAction); 
}

function* checkTaskApiAction (action) {
    const {taskName} = action; 
    try {
       const {data, status} =   yield call(()=> {return toDoListService.checkTaskApi(taskName)});
        if(status === STATUSCODE.SUCCESS){
             yield put ({
                 type:GET_TASKLIST_API             
             })
         }
     }catch(err){
        console.log(err)
     }   
}
export function* theoDoiActionCheckTaskApiAction (){
    yield takeLatest(CHECK_TASK_API, checkTaskApiAction); 
}