import axios from "axios";
import { BASE_URL } from "./configAPI";
export const TableServices = {
    GetTables: (_idUser) => {
      return axios({
          url: `${BASE_URL}/tables/${_idUser}`,
          method: "GET"
      })
    },
    CreateTable: (_data) => {
        return axios({
            url: `${BASE_URL}/tables`,
            method: "POST",
            data: _data 
        })
    },
    GetRowsData: (_tableId) => {
      return axios({
          url: `${BASE_URL}/tables/getrows/${_tableId}`,
          method:"GET"
      })
    },

    UpdateTable: (_data, _tableId) =>{
        return axios({
            url: `${BASE_URL}/tables/${_tableId}`,
            method: "PUT",
            data: _data
        })
    },
    DeleteTable: (_tableId) => {
      return axios({
          url: `${BASE_URL}/tables/${_tableId}`,
          method: "DELETE"
      })
    }
}