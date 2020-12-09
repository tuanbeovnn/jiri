import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from './reducers/ToDoListReducer'; 
import LoadingReducer from './reducers/LoadingReducer'; 
import ModalReducer from './reducers/ModalReducer'; 
import UserLoginCyberBugsReducer from './reducers/UserCyberBugsReducer'; 
import reduxThunk from 'redux-thunk';
import createMiddleWareSaga from 'redux-saga'; 
import {rootSaga} from './sagas/rootSaga'; 
import ProjectCategoryReducer from "./reducers/ProjectCategoryReducer";
import ProjectCyberBugsReducer from "./reducers/ProjectCyberBugsReducer";
import DrawerCyberbugsReducer from "./reducers/DrawerCyberbugsReducer";
import { ProjectEditReducer } from "./reducers/ProjectEditReducer";
import ProjectReducer from "./reducers/ProjectReducer";


const middleWareSaga = createMiddleWareSaga(); 


const rootReducer = combineReducers({
    ToDoListReducer, 
    LoadingReducer,
    ModalReducer,
    UserLoginCyberBugsReducer, 
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    DrawerCyberbugsReducer, 
    ProjectEditReducer, 
    ProjectReducer

}); 


const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));

 middleWareSaga.run(rootSaga); 
export default store; 