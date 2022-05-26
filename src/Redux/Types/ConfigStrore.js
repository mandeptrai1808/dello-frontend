import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { testReducer } from "../Reducers/testReducer";
import { DrawerReducer } from "../Reducers/DrawerReducer";
import { UserReducer } from "../Reducers/UserReducer";
import { ModalReducer } from "../Reducers/ModalReducer";
import { TableReducers } from "../Reducers/TableReducers";
import { ShareTableReducer } from "../Reducers/ShareTableReducer";
import { NotificationReducer } from "../Reducers/NotificationReducer";
import { SocketReducer } from "../Reducers/SocketReducer";
const rootReducer = combineReducers({
   testReducer,
   DrawerReducer,
   UserReducer,
   ModalReducer,
   TableReducers,
   ShareTableReducer,
   NotificationReducer,
   SocketReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));