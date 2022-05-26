import { Row } from "antd";
import { RowServices } from "../../Services/RowServices"
import { GetRowsData } from "./TableActions";

export const CreateRow = (_data) => {
  return async (dispatch) => {
    try {
        let {data} = await RowServices.CreateRow(_data);
        dispatch(GetRowsData(_data.tableId));
        console.log(data)
    } catch (error) {
        console.log(error)
    }
  }
}

export const UpdateRow = (_data, _id, _idTale) => {
  return async (dispatch) => {
    try {
      let {data} = await RowServices.UpdateRow(_data, _id);
      await dispatch(GetRowsData(_idTale));
    } catch (error) {
      console.log(error)
    }
  }
}


export const DeleteRow = (_id, _idTale) => {
  return async (dispatch) => {
    try {
      let {data} = await RowServices.DeleteRow(_id);
      await dispatch(GetRowsData(_idTale))
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
}