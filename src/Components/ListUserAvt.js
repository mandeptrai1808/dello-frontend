import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { UserAddOutlined } from "@ant-design/icons";
import AddMember from "./AddMember";

export default function ListUserAvt(props) {
  let dispatch = useDispatch();
  let { listUser } = useSelector((state) => state.ShareTableReducer);

  let content = listUser.users?.map((item, index) => {
    if (index < 2)
      return (
        <div key={index}>
          <img
            src={item.avatar}
            width={40}
            height={40}
            className="duration-300 rounded-full ml-1 shadow-lg hover:-translate-y-2"
            alt="avt"
          ></img>
        </div>
      );
  });

  let restUserContent = "";
  if (listUser.users?.length > 2)
    restUserContent = (
      <div
        style={{ width: 40, height: 40 }}
        className="duration-300 rounded-full bg-orange-300 flex justify-center  text-md  ml-1"
      >
        {`+${listUser.users?.length-2}`}
      </div>
    );   

  return (
    <div className="flex align-middle">
      <img
        src={listUser.admin?.avatar}
        width={40}
        height={40}
        className="duration-300 shadow-2xl rounded-full ml-1 hover:-translate-y-2"
        alt="avt"
      ></img>

      {content}
      {restUserContent}
      {/* <div
        style={{ width: 40, height: 40 }}
        className="duration-300 cursor-pointer rounded-full bg-slate-400 flex justify-center pt-2  hover:scale-110 hover:bg-slate-800 ml-1"
        onClick={()=>{
          dispatch({
            type: "OPEN_DRAWER",
            content: <AddMember/>
          })
        }}
      >
      
        <UserAddOutlined />
      </div> */}
    </div>
  );
}
