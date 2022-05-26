import { ShareTableServices } from "../../Services/SharetableServices"
import { GetRowsData } from "./TableActions"
import { findUser } from "./UsersActions"


export const GetUserListShare = (_tableId) => {
  return async (dispatch) => {
    try {
        let {data} = await ShareTableServices.GetUserListShare(_tableId)
        dispatch({
            type: "GET_USERS_SHARED",
            content: data
        })
        // console.log(data);
    } catch (error) {
        console.log(error)
    }
  }
}

export const AddMemberToTable = (_data, _name, _tableId) => {
  return async (dispatch) => {
    try {
      let {data} = await ShareTableServices.AddMemberToTable(_data);
      dispatch(findUser(_name));
      dispatch(GetUserListShare(_tableId))
    } catch (error) {
      console.log(error);
    }
  }
}

export const DeleteMember = (_data) => {
  return async (dispatch) => {
    try {
      let {data} = await ShareTableServices.DeleteMember(_data);
      dispatch(GetUserListShare(_data.tableId));
    } catch (error) {
      console.log(error)
    }
  }
}

export const GetTableListShare = (_userId) => {
  return async (dispatch) => {
    try {
      let {data} = await ShareTableServices.GetTableListShare(_userId);
      dispatch({
        type: "GET_TABLES_SHARED",
        content: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}


export const GetTableListShareInit = (_userId) => {
  return async (dispatch) => {
    try {
      let {data} = await ShareTableServices.GetTableListShare(_userId);
      console.log(data)
      dispatch({type:"GET_TABLE_LIST", content: data})

      dispatch(GetRowsData(data[0].id))
      dispatch(GetUserListShare(data[0].id))

    } catch (error) {
      console.log(error)
    }
  }
}