import axios from "axios";
import { BASE_URL } from "./configAPI";

export const RowServices = {
    CreateRow: (_data) => {
      return axios({
          url: `${BASE_URL}/rows`,
          method: "POST",
          data: _data
      })
    },

    UpdateRow: (_data, _id) => {
      return axios({
        url: `${BASE_URL}/rows/${_id}`,
        method: "PUT",
        data: _data
      })
    },

    DeleteRow: (_id) => {
      return axios({
        url: `${BASE_URL}/rows/${_id}`,
        method: "DELETE",
      })
    }
}