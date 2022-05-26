import axios from "axios";
import { BASE_URL } from "./configAPI";
 
export const ShareTableServices = {
    GetUserListShare: (_tableId) => {
      return axios({
          url: `${BASE_URL}/sharetable/getusers/${_tableId}`,
          method: "GET"
      })
    },
    GetTableListShare: (_userId) => {
      // console.log(_userId)
      return axios({
        url: `${BASE_URL}/sharetable/gettables/${_userId}`,
        method: "GET"
      })
    },
    
    AddMemberToTable: (_data) => {
      return axios({
        url: `${BASE_URL}/sharetable/`,
        method: "post",
        data: _data
      })
    },

    DeleteMember: (_data) => {
      return axios({
        url: `${BASE_URL}//sharetable/deletemember`,
        method: "DELETE",
        data: _data
      })
    }
}