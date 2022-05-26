import { Button } from "antd";
import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { uploadAvatar } from "../Redux/Actions/UsersActions";

export default function EditUser() {
    let userData = localStorage.getItem("login_user");
    userData = userData && JSON.parse(userData);
    let dispatch = useDispatch();
    let [imgSrc, setImgSrc] = useState(userData.avatar);
    let [imgFile, setImgFile] = useState(null);
    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        setImgFile({
          file
        });
        console.log(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setImgSrc(e.target.result);
        };
      };
      const handleSubmitButton = () => {
        if (imgFile){
          dispatch(uploadAvatar(imgFile));
        };
      }
  return (
    <div className="grid grid-cols-10 gap-4">
    <div className="col-span-7">
      <img src={imgSrc} alt="hinhthoi" className="w-full h-full" />
    </div>
    <div className="col-span-3">
        <p>Chọn tệp hình ảnh:</p>
      <input
        className="w-full"
        accept="image/png, image/jpeg"
        type="file"
        onChange={(e) => {
          handleChangeFile(e);
        }}
      ></input>
      <Button onClick={handleSubmitButton} type="danger" className="w-full mt-4">Lưu</Button>
    </div>
  </div>
  )
}
