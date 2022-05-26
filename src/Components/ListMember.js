import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserAddOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { DeleteMember } from "../Redux/Actions/ShareTableAction";

export default function ListMember() {
  let dispatch = useDispatch();
  let { listUser } = useSelector((state) => state.ShareTableReducer);
  let { tableChoosing } = useSelector((state) => state.TableReducers);
  return (
    <div>
      <h1 className="text-2xl font-bold">Danh sách thành viên</h1>
      <p>Table: {tableChoosing.name}</p>
      <div className="grid grid-cols-10 p-2 border-t">
            <img
              src={listUser.admin?.avatar}
              className="col-span-3 w-20 h-20"
              alt="avt"
            ></img>
            <div className="col-span-5 pt-2">
              <p className="font-bold m-0 text-lg">{listUser.admin?.name}</p>
              <p>{listUser.admin?.email}</p>
            </div>
            <div type="danger" className="col-span-2 pt-5 font-bold">Admin</div>
          </div>
      {listUser.users?.map((item, index) => {
        return (
          <div key={index} className="grid grid-cols-10 p-2 border-t">
            <img
              src={item.avatar}
              className="col-span-3 w-20 h-20"
              alt="avt"
            ></img>
            <div className="col-span-5 pt-2">
              <p className="font-bold m-0 text-lg">{item.name}</p>
              <p>{item.email}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
