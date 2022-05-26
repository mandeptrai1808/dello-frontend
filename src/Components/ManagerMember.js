import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserAddOutlined,CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button,Popconfirm } from 'antd';
import { DeleteMember } from '../Redux/Actions/ShareTableAction';
import { CreateNotification } from '../Redux/Actions/NotificationAction';
import { socket } from '../App';

export default function ManagerMember() {
    let dispatch = useDispatch();
    let userData = localStorage.getItem("login_user");
    userData = userData && JSON.parse(userData);
    let {listUser} = useSelector(state => state.ShareTableReducer);
    let { tableChoosing } = useSelector(
      (state) => state.TableReducers
    );
  return (
    <div>
        <h1 className='text-2xl font-bold'>Quản lý thành viên</h1>
        <p>Table: {tableChoosing.name}</p>
        {listUser.users?.map((item, index) => {
         return <div key={index} className="grid grid-cols-10 p-2 border-t">
          <img src={item.avatar} className="col-span-3 w-20 h-20" alt="avt"></img>
          <div className="col-span-5 pt-2">
          <p className="font-bold m-0 text-lg">{item.name}</p>
          <p>{item.email}</p>
    
          </div>
          <Popconfirm
    title="Xóa thành viên này khỏi table?"
    onConfirm={() => {
        socket.emit("addMember", item.name)
      dispatch(DeleteMember({userId: item.id, tableId: tableChoosing.id}));
      let dataNotification = {
        usersend: userData.name,
        avatar: userData.avatar,
        content: `${userData.name} đã xóa bạn khỏi bảng ${tableChoosing.name}`,
        userId: item.id
      }
      dispatch(CreateNotification(dataNotification));
    }}
    okText="Yes"
    cancelText="No"
  >
          <Button type="danger" className="col-span-2"><DeleteOutlined /></Button>
  </Popconfirm>
        </div>
        })}
    </div>
  )
}
