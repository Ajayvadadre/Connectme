const modal=(state={message:null},action)=>{
    switch (action.type) {
        case "MESSAGE":
            return {...state,message:action?.data}
        default:
            return state
    }
}

export default modal