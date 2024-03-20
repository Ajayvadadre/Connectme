const authReducer=(state={allUser:null,isLoading:false},action)=>{
    switch (action.type) {
        case "START_LOADING":
            return {...state,isLoading:true}
        case "END_LOADING":
            return {...state,isLoading: false}
        case "AUTH":
            localStorage.setItem('UserAuth',JSON.stringify({...action?.data}))
            return {...state,authData: action?.data}
        case "LOGOUT":{
            localStorage.removeItem("UserAuth")
            localStorage.removeItem("profile")
            return {...state,authData:null}
        }
        case "FETCH":
            return {...state,allUser: action?.data}
        case "GET_ALL":
            return {...state,authData: action?.data}
        case "USER_ERROR":
            return {...state,error: action?.error}
        case "GET_USER_BY_ID":
            localStorage.setItem("UserAuth",JSON.stringify({...action?.data}))
            return {...state,data: action?.data}
        case "GET_CURRENT_USER":
            const user=JSON.parse(localStorage.getItem("UserAuth"))
            return {...state,user }
        default:
            return state
    }
}

export default authReducer