const profileReducer=(state={profile:null,error:null,isLoading: false},action)=>{
    switch (action.type) {
        case "START_LOADING":
            return {...state,isLoading: true}
        case "END_LOADING":
            return {...state,isLoading: false}
        case "CREATE_PROFILE":
            return {...state,profile: action?.data}
        case "FETCH_PROFILE_BY_ID":
            localStorage.setItem("profile",JSON.stringify(action?.data))
            return {...state,profile: action.data}
        case "FETCH_PROFILE_BY_USERNAME":
            return {...state,profile: action.data}
        case "UPDATE_PROFILE":
            return {...state,profile:action?.data }
        case "UPDATE_SUBDOC_IN_PROFILE":
            return {...state,profile:action?.data}
        case "PROFILE_ERROR":
            return {...state,error: action.data}
        case "ADD_IMAGE":
            return {...state,profile: action?.data}
        case "PROFILE_REQUEST":
            return {...state,profile: action?.data}
        case "DELETE_SUBDOC_IN_PROFILE_BY_ID":
            return {...state,profile: action?.data}
        case "LIKE_PROFILE":
            return {...state,profile: action?.data}
        case "CONFIRM_REQUEST":
            localStorage.setItem("profile",JSON.stringify(action?.data))
            return {...state,profile: action?.data}
        case "GET_COOKIE_DATA":
            return {...state,profcookie: JSON.parse(localStorage.getItem("profile"))}
        default:
            return state
    }
}

export default profileReducer