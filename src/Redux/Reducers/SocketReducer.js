const stateDefault = {
    socket: {}
}

export const SocketReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "GET_SOCKET":{
        state.socket = action.socket;
        return {...state}
      }
        
  
      default:
          return  {...state}
  }
}
