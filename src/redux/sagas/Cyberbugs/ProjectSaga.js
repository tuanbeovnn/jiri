
import { takeEvery } from 'redux-saga/effects';
import {push} from 'react-router-redux'; 
import { fork, take, call, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { STATUSCODE } from '../../../util/constants/settingSystem';
import { GET_ALL_PROJECT, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../constants/Cyberbugs/Cyberbugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import {history} from '../../../util/history/history'; 
function * createProjectSaga(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500); 
    console.log(action);
    try {
        let {data, status} = yield call(() => cyberbugsService.createProjectAuthorization(action.newProject)); 
        console.log(status);
        if(status === STATUSCODE.SUCCESS){
        history.push('/projectmanagement'); 
        }; 
    } catch(error){
        console.log(error.response.data);
    }
    yield put({
        type: HIDE_LOADING
    })

}
export function * theoDoiCreateProjectSaga(){
    yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga)
}

//sage dùng get all project từ api 
//thoa code ngày 24 - 11 -2021 
function * getListProjectSaga(action) {  
    try{
     const {data, status}  =  yield call(() => cyberbugsService.getListProject()); 
     if(status === STATUSCODE.SUCCESS){
         yield put({
             type: "GET_ALL_PROJECT_LIST", 
             projectList: data.content
         })
     }
    } catch(error){
        console.log(error);
    }
}
export function * theoDoiGetListProjectSaga(){
    yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga)
}

function * updateProjectSaga(action) {  
    console.log(action);

    try{
     const {data, status}  =  yield call(() => cyberbugsService.updateProject(action.projectUpdate)); 
     if(status === STATUSCODE.SUCCESS){
        console.log(data);
        yield call(getListProjectSaga);      
        yield put({
            type: "CLOSE_DRAWER"
        })
     }
    } catch(error){
        console.log(error.data);
    }
}

export function * theoDoiUpdateProjectSaga(){
    yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga)
}


