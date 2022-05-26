import axios from "axios";
import { BASE_URL } from "./configAPI";
export const  TaskServices = {
    CreateTask: (_data) => {
      return axios({
          url: `${BASE_URL}/tasks`,
          method: "POST",
          data: _data
      })
    },

    MoveTask: (_data) => {
      return axios({
        url: `${BASE_URL}/tasks/movetask`,
        method: "POST",
        data: _data
      })
    },

    UpdateTask: (_data, _id) => {
      return axios({
        url: `${BASE_URL}/tasks/${_id}`,
        method: "PUT",
        data: _data
      })
    }
}