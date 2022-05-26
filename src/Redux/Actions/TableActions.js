import { TableServices } from "../../Services/TableSevices"
import { GetUserListShare } from "./ShareTableAction";

let userData = localStorage.getItem("login_user");
userData = userData && JSON.parse(userData);

export const GetRowsData = (_tableId) => {
  return async (dispatch) =>{
    try {
      let {data} = await TableServices.GetRowsData(_tableId);
      dispatch({type:"GET_ROWS_DATA", content: data})
      // console.log(data)
    } catch (error) {
      console.log(error)
      
    }
  }
}

export const GetTableList = (_idUser) => {
  return async (dispatch) => {
    try {
        let {data} = await TableServices.GetTables(_idUser);
        console.log(data)
        dispatch({type:"GET_TABLE_LIST", content: data})
        // dispatch(GetRowsData(data[0].id))
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
  }
}

export const GetTableListInit = (_idUser) => {
  return async (dispatch) => {
    try {
      let {data} = await TableServices.GetTables(_idUser);
      // console.log(data)
      dispatch({type:"GET_TABLE_LIST", content: data})
      dispatch(GetRowsData(data[0].id))
      dispatch(GetUserListShare(data[0].id))
      // console.log(data);
  } catch (error) {
      console.log(error);
  }
  }
}

export const CreateTable = (_data, _userid) => {
  return async (dispatch) => {
    try {
        let {data} = await TableServices.CreateTable(_data);
        dispatch(GetTableList(_userid));
    } catch (error) {
        console.log(error)
    }
  }
}

export const UpdateTable =  (_data, _tableId, _userId = -1) => {
  return async (dispatch) => {
    try {
      let {data} = await TableServices.UpdateTable(_data, _tableId);
       dispatch({
        type: "CHANGE_CHOOSING_TABLE",
        content: data.tableFind
      })
      //  dispatch(GetTableList(_userId));
     
      
      // console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
}

export const DeteleTable = (_tableId, _userId) => {
  return async (dispatch) => {
    try {
      let {data} = await TableServices.DeleteTable(_tableId);
      dispatch(GetTableList(_userId));
    } catch (error) {
      alert("Bạn cần tạo bảng trước!")
    }
  }
}