const stateDefault = {
    isLogin: false,
    idUserLogin: null,
    listUserFind: []
}

export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "IS_LOGIN":
          {
            state.isLogin = !state.isLogin;
            return {...state};
          }
        case "GET_ID_USER_LOGIN":{
          state.idUserLogin = action.content;
          return {...state};
        }
        
        case "GET_LIST_USER_FIND":{
          state.listUserFind = action.content;
          return {...state}
        }
      default:
          return {...state}
  }
}