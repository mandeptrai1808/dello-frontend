const stateDefault = {
    isOpen: false,
    content: ''
}

export const DrawerReducer = (state = stateDefault, action) => {
  switch (action.type) {
     
    case "OPEN_DRAWER":{
        state.isOpen = true;
        state.content = action.content;
        return {...state}
    }
    case "CLOSE_DRAWER":{
        state.isOpen = false;
        return {...state}
    }
  
      default:
          return {...state}
  }
}