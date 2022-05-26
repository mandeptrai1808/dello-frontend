import axios from 'axios';
import { BASE_URL } from './configAPI';

export const UserSevices = {
    Login: (_dataLogin) => {
      return axios({
          url: `${BASE_URL}/users/login`,
          method: "POST",
          data: _dataLogin
      })
    },

    Register: (_dataRegister) => {
      return axios({
        url: `${BASE_URL}/users/register`,
        method: "POST",
        data: _dataRegister
      })
    },
    uploadAvaterUser: (_file) => {
      let formData = new FormData();
      
      formData.append("Avatar", _file.file);  
  
      return axios({
        url: `${BASE_URL}/users/upload-avatar`,
        method: "POST",
        data: formData,
        headers: {
          token: localStorage.getItem("access_token"),
          // 'content-type': 'multipart/form-data'
        },
      });
    },
    getUserById: (id) => {
      return axios({
        url: `${BASE_URL}/users/${id}`,
        method: "GET",
      });
    },

    findUser: (_name) => {
      return axios({
        url: `${BASE_URL}/users/finduser/${_name}`,
        method: "GET",
      })
    }
  
}