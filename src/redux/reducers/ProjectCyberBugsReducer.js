const initialState = {
projectList : []
}

const ProjectCyberBugsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_PROJECT_LIST": 
        state.projectList = action.projectList; 
        return {...state}
    default:
        return {...state}
    }
}
export  default ProjectCyberBugsReducer; 