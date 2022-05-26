import { UserSevices } from "../../Services/UserSevices"
import { notification } from 'antd';
import { CreateTable } from "./TableActions";

let userData = localStorage.getItem("login_user");
userData = userData && JSON.parse(userData);

const successNotification = (_tittle, _content) => {
    notification["success"]({
      message: _tittle,
      description: _content,
    });
  };

const errorNotification = (_tittle, _content) => {
    notification["error"]({
      message: _tittle,
      description: _content,
    });
  };

export const LoginUser = (_dataLogin) => {
  return async (dispatch) => {
    try {
        let {data} = await UserSevices.Login(_dataLogin);
        successNotification("Đăng nhập thành công", "Bạn đã đăng nhập thằng công!!")
        dispatch({
          type: "GET_ID_USER_LOGIN",
          content: data.userFind
        })
        localStorage.setItem('login_user', JSON.stringify(data.userFind));
        localStorage.setItem('access_token', data.token);
    } catch (error) {
        errorNotification("Đăng nhập thất bại", "Kiểm tra lại mật khẩu hoặc tên đăng nhập!")
    }
  }
}

export const RegisterUser = (_dataRegister) => {
  return async (dispatch) => {
    try {
        let{data} = await UserSevices.Register(_dataRegister);
        successNotification("Đăng kí thành công", "Bạn đã đăng kí thằng công!!")
        dispatch({type: "CLOSE_DRAWER"})
        dispatch(CreateTable({name: "First Table", userId: data.id}, data.id));
        console.log(data)
    } catch (error) {
        errorNotification("Đăng kí thất bại", "Kiểm tra lại mật khẩu hoặc tên đăng nhập!")
    }    
  }
}

export const uploadAvatar = (_file) => {
  return async (dispatch) => {
    try {
      let {data} = await UserSevices.uploadAvaterUser(_file);
      // console.log(data)
      let userFind = await UserSevices.getUserById(userData.id);
      console.log(userFind);
      dispatch({
        type: "GET_ID_USER_LOGIN",
        content: userFind
      })
      localStorage.setItem('login_user', JSON.stringify(userFind.data));
      // window.location.reload();
      successNotification("Update avatar thành công", "Tài khoản đã được cập nhật!");
    } catch (error) {
      console.log(error);
    }
  }
}

export const findUser = (_name) => {
  return async (dispatch) => {
    try {
      let {data} = await UserSevices.findUser(_name);
      dispatch({
        type: "GET_LIST_USER_FIND",
        content: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}