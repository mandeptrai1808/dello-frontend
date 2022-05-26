import React, {useState} from "react";
import { Input, Space, Button } from "antd";
import { UserAddOutlined,CheckOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { findUser } from "../Redux/Actions/UsersActions";
import { AddMemberToTable } from "../Redux/Actions/ShareTableAction";
import { CreateNotification } from "../Redux/Actions/NotificationAction";
import { socket } from "../App";
const { Search } = Input;

export default function AddMember() {

  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  let dispatch = useDispatch();
  let [nameFind, setNameFind] = useState();
  let {listUserFind} = useSelector(state => state.UserReducer);
  let {listUser} = useSelector(state => state.ShareTableReducer);
  let { tableChoosing } = useSelector(
    (state) => state.TableReducers
  );

  const AddMemberBtn = (userId) => {
    let data = {userId, tableId: tableChoosing.id};
    let dataNotification = {
      usersend: userData.name,
      avatar: userData.avatar,
      content: `${userData.name} đã thêm bạn vào bảng ${tableChoosing.name}`,
      userId: userId
    }
    dispatch(AddMemberToTable(data,nameFind, tableChoosing.id));
    dispatch(CreateNotification(dataNotification));
    // console.log(data);
  }

  // console.log(adminUser)

  let content = listUserFind.map((item, index) => {

    if (item.id !== listUser.admin?.id)
    {
      let contentButton = <Button type="danger" className="col-span-2" onClick={() => {
        socket.emit("addMember", item.name)
        AddMemberBtn(item.id);
      }}><UserAddOutlined/></Button>;
      if (listUser.users?.findIndex(user => user.id === item.id) !== -1) 
        contentButton = <Button type="primary" className="col-span-2" disabled><CheckOutlined /></Button>
    return <div key={index} className="grid grid-cols-10 p-2 border-t">
      <img src={item.avatar} className="col-span-3 w-20 h-20" alt="avt"></img>
      <div className="col-span-5 pt-2">
      <p className="font-bold m-0 text-lg">{item.name}</p>
      <p>{item.email}</p>

      </div>
      {contentButton}
    </div>
    }
  })
  return (
    <div>
      <h1 className="text-2xl border-b">Thêm thành viên cho Table</h1>
      <p className="">
        <i>
          (Thành viên được thêm vào có thể chỉnh sửa, di chuyển, các task và các
          row. Tuy nhiên họ không thể xóa hay cài đặt lại table!)
        </i>
      </p>
      <Search
        placeholder="Nhập tên của user cần tìm"
        onSearch={(value) => {
          setNameFind(value);
          dispatch(findUser(value));
        }}
        style={{ width: 400 }}
        className="pb-5 "
      />
      {content}
    </div>
  );
}
