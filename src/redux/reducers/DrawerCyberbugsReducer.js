import React from 'react';
const initialState = {
    visible: false, 
    title : '', 
    ComponentDrawerContent: <p>Default content</p>, 
   callBackSubmit: (propsValue) => { alert('click demo!') }
}


 const DrawerCyberbugsReducer = (state = initialState, action) => {
    switch (action.type) {

    case "OPEN_DRAWER":
        return { ...state, visible: true }

    case "CLOSE_DRAWER": 
    return { ...state, visible: false }
    
    case "OPEN_FORM_EDIT_PROJECT":  
        return {...state, visible: true, ComponentDrawerContent: action.Component, title: action.title}
    case "OPEN_FORM_CREATE_TASK": 
    return {...state, visible: true, ComponentDrawerContent: action.Component, title: action.title}
    case "SET_SUBMIT_EDIT_PROJECT": 
        state.callBackSubmit = action.submitFunction;
        return {...state}

    default:
        return state
    }
}
export default DrawerCyberbugsReducer
