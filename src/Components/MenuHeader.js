import React, { useEffect } from "react";
import { AntDesignOutlined, PoweroffOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Popover, Badge, Dropdown, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DeleteAllNotification, GetNotificationList } from "../Redux/Actions/NotificationAction";
import { socket } from "../App";
export default function MenuHeader() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { idUserLogin } = useSelector((state) => state.UserReducer);
  let { notifications } = useSelector((state) => state.NotificationReducer);
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);
  useEffect(() => {
    dispatch(GetNotificationList(userData.id));
  }, []);

  useEffect(() => {
    // dispatch(GetNotificationList(userData.id));
    socket.on("notification", () => {
      setTimeout(() => {
        console.log(
          "update"
        )
        dispatch(GetNotificationList(userData.id));
      }, 1000);
    })
  }, [socket]);
  const contentPopover = (
    <div>
      <ul>
        <li
          className="border-b py-2 hover:text-red-600 cursor-pointer duration-75"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Thông tin tài khoản
        </li>
        <li className="border-b py-2 hover:text-red-600 cursor-pointer duration-75">
          Đổi mật khẩu
        </li>
        <li
          className="border-b py-2 hover:text-red-600 flex items-center cursor-pointer duration-75 text-red-600 font-bold"
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("login_user");
            navigate("/");
            window.location.reload();
          }}
        >
          <PoweroffOutlined className="mr-2" /> Đăng xuất
        </li>
      </ul>
    </div>
  );

  let contentNotification;

  if (notifications.length > 0) {
    contentNotification = (
      <div>
        {notifications.map((item, index) => {
          return (
            <div className="p-2 duration-200 border-b hover:bg-slate-100">
              <img
                src={item.avatar}
                alt="avt"
                className="w-10 h-10 rounded-full float-left mr-5"
              ></img>
              <div className="w-50">{item.content}</div>
            </div>
          );
        })}
        <Button
          className="mt-2 w-full"
          type="danger"
          onClick={() => {
            dispatch({ type: "DETELE_ALL_NOTIFICATION" });
            dispatch(DeleteAllNotification(userData.id))
          }}
        >
          Delete all
        </Button>
      </div>
    );
  }
  else contentNotification = <span>Bạn không có thông báo nào!</span>

  let contentUser = {
    avatar: "http://www.gravatar.com/avatar/e4dbcfe260507eba97f0bea7701c1afe",
    name: "name",
  };

  if (userData) {
    contentUser = {
      avatar: userData.avatar,
      name: userData.name,
    };
  }

  return (
    <div>
      {/* This example requires Tailwind CSS v2.0+ */}
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <p className="text-white text-3xl flex align-middle mb-0 mr-3">
                  {" "}
                  <AntDesignOutlined />
                </p>
                <p className="text-white mb-0 text-3xl"> DELLO</p>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <NavLink
                    to={"/home"}
                    className=" text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    Bảng của bạn
                  </NavLink>
                  <NavLink
                    to="/sharetable"
                    className=" text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    Bảng được chia sẻ
                  </NavLink>
                  <NavLink
                    to="/about"
                    className=" text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    About
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Popover
                content={contentNotification}
                trigger="click"
                placement="leftBottom"
              >
                <Badge count={notifications.length}>
                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    {/* Heroicon name: outline/bell */}
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                </Badge>
              </Popover>
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <Popover
                  placement="bottomRight"
                  content={contentPopover}
                  trigger="click"
                >
                  <div className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <img
                      className="h-8 w-8 rounded-full cursor-pointer"
                      src={contentUser.avatar}
                      alt="avt"
                      title={contentUser.name}
                    />
                  </div>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
