const stateDefault = {
    isOpen: false,
    content: 'ey'
}

export const ModalReducer = (state = stateDefault, action) => {
  switch (action.type) {
      case "OPEN_MODAL":
          {
            state.isOpen = true;
            state.content = action.content;
            return {...state}
          }
        case "CLOSE_MODAL":{
            state.isOpen = false;
            return {...state};
        }
  
      default:
          return{...state}
  }
}