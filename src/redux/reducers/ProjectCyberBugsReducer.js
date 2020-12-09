const initialState = {
projectList : [
    {id: "1",
    projectName: "abc", 
    description: "React Jira"}
]
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