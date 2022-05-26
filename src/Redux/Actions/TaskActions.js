import { TaskServices } from "../../Services/TaskServices"
import { GetRowsData } from "./TableActions";
import { socket } from "../../App";

export const CreateTask = (_data, _idTable) => {
    return async (dispatch) => {
      try {
          let {data} = await TaskServices.CreateTask(_data);
        //   console.log(data)
          dispatch(GetRowsData(_idTable));
      } catch (error) {
          console.log(error)
      }
    }
}

export const MoveTask = (_data) => {
  return async (dispatch) => {
    try {
        let {data} = await TaskServices.MoveTask(_data)
        // socket.emit("moveTask");
        // console.log(data);
    } catch (error) {
        console.log(error)
    }
  }
}

export const UpdateTask = (_data, _id) => {
  return async (dispatch) => {
    try {
      let {data} = await TaskServices.UpdateTask(_data, _id);
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
}