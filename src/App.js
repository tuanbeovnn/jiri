import React, { Component } from 'react'
import { BrowserRouter, Route, Switch,Router } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Detail from './pages/Detail/Detail'; 
import PageNotFound from './pages/NotFound/PageNotFound'; 
import Profile from './pages/Profile/Profile'; 
import Todolist from './pages/Todolist/Todolist'; 
import TodolistRFC from './pages/Todolist/TodolistRFC'; 
import ToDoListRedux from './pages/Todolist/ToDoListRedux'; 
import BaiTapToDoListSaga from './pages/BaiTapToDoListSaga/BaiTapToDoListSaga'; 
import Loading from './components/GlobalSetting/Loading';  
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import UserLoginTemplate from './templates/HomeTemplate/UserLoginTemplate'; 
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBug/LoginCyberBugs';
import {history} from './util/history/history'; 
import CyberbugsTemplate from './templates/HomeTemplate/CyberbugsTemplate';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import DrawerCyberbugs from './HOC/CyberbugsHOC/DrawerCyberbugs';
import IndexCyberBugs from './redux/sagas/Cyberbugs/IndexCyberBugs';

export default class App extends Component {
  render() {
    return (
      <Router history = {history}>
<DrawerCyberbugs/>
      {/* <Modal/> */}
      <Loading/>
      <Switch>
      
        <HomeTemplate path="/home" exact Component = {Home}/>
        <HomeTemplate exact  path="/contact" Component={Contact} />
        <HomeTemplate exact  path="/about" Component={About} />
        <CyberbugsTemplate exact path="/"  Component={ProjectManagement} />
        <UserLoginTemplate exact path="/login"  Component={LoginCyberBugs} />
        <HomeTemplate exact path="/detail/:id"  Component={Detail} />
        <HomeTemplate exact path="/profile"  Component={Profile} />
        <HomeTemplate  exact path="/todolistrcc"  Component={Todolist} />
        <HomeTemplate  exact path="/todolistrfc"  Component={TodolistRFC} />
        <HomeTemplate  exact path="/todolistredux"  Component={ToDoListRedux} />
        <HomeTemplate  exact path="/todolistsaga"  Component={BaiTapToDoListSaga} />      
        <CyberbugsTemplate exact path = "/cyberbugs" Component = {IndexCyberBugs}/>
        <CyberbugsTemplate exact path = "/createproject" Component = {CreateProject}/>
        <CyberbugsTemplate exact path = "/projectmanagement" Component = {ProjectManagement}/>
        <CyberbugsTemplate exact path = "/projectdetail/:projectId" Component = {IndexCyberBugs}/>
        <Route  path="*"  Component={PageNotFound} />      
      </Switch>

      </Router>
    )
  }
}
