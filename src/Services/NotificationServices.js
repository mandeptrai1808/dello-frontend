import axios from "axios";
import { BASE_URL } from "./configAPI";

export const NotificationSevices = {
    GetNotificationList: (_userId) => {
      return axios({
          url: `${BASE_URL}/notification/${_userId}`,
          method: "GET"
      })
    },

    DeleteAllNotification: (_userId) => {
      return axios({
        url: `${BASE_URL}//notification/delete/${_userId}`,
        method: "DELETE"
      })
    },
    CreateNotification: (_data) => {
      return axios({
        url: `${BASE_URL}/notification/create`,
        method: "POST",
        data: _data
      })
    }
}