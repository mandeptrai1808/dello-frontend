const stateDefault = {
    notifications: []
}

export const NotificationReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "GET_LIST_NOTIFICATION":{
        state.notifications = action.content;
        return {...state}
      }
        
      case "DETELE_ALL_NOTIFICATION":{
          state.notifications = [];
          return {...state}
      }
  
      default:
          return {...state}
  }
}

