
import { takeEvery } from 'redux-saga/effects';
import {push} from 'react-router-redux'; 
import { fork, take, call, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import {USER_SIGNIN_API, USLOGIN} from './../../constants/Cyberbugs/Cyberbugs'; 
import { cyberbugsService } from '../../../services/CyberbugsService';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import {history} from '../../../util/history/history';
//Quản lý các action saga
function * signinSaga(action){
    yield delay (1000); 
    yield put({
        type: DISPLAY_LOADING
    });
//gọi api 
try {
  const {data, status} = yield cyberbugsService.signinCyberBugs(action.userLogin) ; 
  //lưu vào local store khi đăng nhập sucessfull
  localStorage.setItem(TOKEN, data.content.accessToken); 
  localStorage.setItem(USER_LOGIN,JSON.stringify(data.content)); 
// yield put(push("/home")); 
// action.userLogin.history.push("./home");
    yield put({
        type: USLOGIN,
        userLogin: data.content
    })
history.push("./home");

} catch(err){
    console.log(err.response.data)
}
yield put({
    type: HIDE_LOADING
});
}

export function * theoDoiSignin(){
    yield takeLatest(USER_SIGNIN_API, signinSaga); 
}