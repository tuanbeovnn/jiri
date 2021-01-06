import { takeEvery } from 'redux-saga/effects';
import {fork, take, call, takeLatest, put, all} from 'redux-saga/effects'; 
import axios from 'axios';
import {GET_TASK_API} from './../constants/ToDoListContants';
import * as Cyberbugs from './Cyberbugs/UserCyberBugsSaga'; 
import {theoDoiActionGetTaskApi, theoDoiActionAddTaskApiAction, theoDoiActionDeleteTaskApiAction, theoDoiActionRejectTaskApiAction, theoDoiActionCheckTaskApiAction} from './ToDoListSaga';
import * as ProjectCategory from './Cyberbugs/ProjectCategorySaga'; 
import * as ProjectSaga from './Cyberbugs/ProjectSaga'; 
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga'; 
import * as PrioritySaga from './Cyberbugs/PrioritySaga'; 
import * as TaskSaga from './Cyberbugs/TaskSaga'; 
import * as StatusSaga from './Cyberbugs/StatusSaga'; 
export function * rootSaga(){
//    yield fork(getTaskAPI);  

yield all([
    
    theoDoiActionGetTaskApi(),
    theoDoiActionAddTaskApiAction(),
    theoDoiActionDeleteTaskApiAction(),
    theoDoiActionRejectTaskApiAction(),
    theoDoiActionCheckTaskApiAction(),

    Cyberbugs.theoDoiSignin(), 

    ProjectCategory.theoDoiGetAllCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(), 
    ProjectSaga.theoDoiGetProjectDetailSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(), 
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUser(),
    Cyberbugs.theoDoiGetUserByProjectId(),
    Cyberbugs.theoDoiDeleteUserProject(),
    TaskTypeSaga.theoDoiGetAllTypeTaskSaga(),
    PrioritySaga.theoDoiGetAllPriorityList(),
    TaskSaga.theoDoiCreateTaskSaga(),
    StatusSaga.theoDoiGetAllStatusSaga()
])


} 