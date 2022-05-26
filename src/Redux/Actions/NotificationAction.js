import { NotificationSevices } from "../../Services/NotificationServices"


export const GetNotificationList = (_userId) => {
    return async (dispatch) => {
      try {
          let {data} = await NotificationSevices.GetNotificationList(_userId);
          dispatch({
              type: "GET_LIST_NOTIFICATION",
              content: data
          })
      } catch (error) {
          console.log(error)
      }
    }
}

export const DeleteAllNotification = (_userId) => {
    return async (dispatch) => {
      try {
          let {data} = await NotificationSevices.DeleteAllNotification(_userId);

      } catch (error) {
          console.log(error)
      }
    }
}

export const CreateNotification = (_data) => {
  return async (dispatch) => {
    try {
        let {data} = await NotificationSevices.CreateNotification(_data);
        console.log(data);
    } catch (error) {
        console.log(error)
    }
  }
}