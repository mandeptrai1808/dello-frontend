const stateDefault = {
    listUser: {},
    listTableShare: []
}

export const ShareTableReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "GET_USERS_SHARED":{
        state.listUser = action.content;
        return {...state}
      }
      
      case "GET_TABLES_SHARED":{
        state.listTableShare = action.content;
        return {...state}
      }
      
      default:
          return {...state}
  }
}