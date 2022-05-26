import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  DeteleTable,
  GetRowsData,
  UpdateTable,
} from "../Redux/Actions/TableActions";
import { Popover, Button, Input, Typography, Popconfirm, Tooltip } from "antd";
import {
  HighlightOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined
} from "@ant-design/icons";
import { CreateRow, DeleteRow, UpdateRow } from "../Redux/Actions/RowActions";
import { CreateTask, MoveTask, UpdateTask } from "../Redux/Actions/TaskActions";
import ListUserAvt from "../Components/ListUserAvt";
import { GetTableListShareInit, GetUserListShare } from "../Redux/Actions/ShareTableAction";
import ListMember from "../Components/ListMember";

const { Paragraph } = Typography;

export default function ShareTable() {
  let dispatch = useDispatch();
  let { tableList, idTableChoosing, tableChoosing, rowsData } = useSelector(
    (state) => state.TableReducers
  );


  //reset localstorrege khi login
  let { idUserLogin } = useSelector((state) => state.UserReducer);

  const navigate = useNavigate();
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);



  let [dataNewRow, setDataRow] = useState({
    name: "",
  });

  let [nameNewtask, setNameNewtask] = useState("");

  let [urlBackground, setUrlBackground] = useState("");

  //socket



  
  const onDragEnd = (result) => {
    if (result.destination) {
      let indexRowTo = parseInt(result.source.droppableId);
      let indexRowFrom = parseInt(result.destination.droppableId);
      let toId = result.source.index;
      let fromId = result.destination.index;
      let idTask = parseInt(result.draggableId);

      //Update tren server
      dispatch(
        MoveTask({ indexRowFrom: rowsData[indexRowFrom].row_id, idTask })
      );

      //Update tren reducer
      dispatch({
        type: "DRAG_TASK",
        content: { indexRowTo, indexRowFrom, toId, fromId },
      });
    }
  };


  useEffect(() => {
    if (userData === null) {
      navigate("/login");
    } else{
        dispatch(GetTableListShareInit(userData.id))
    }
  }, []);

  
  
  const contentCreateRow = (
    <div className="flex justify-center px-4">
      <Input
        placeholder="Type this row name"
        value={dataNewRow.name}
        onChange={(e) => {
          setDataRow({
            ...dataNewRow,
            name: e.target.value,
          });
        }}
      ></Input>
      <Button
        type="danger"
        onClick={() => {
          dispatch(
            CreateRow({ name: dataNewRow.name, tableId: tableChoosing.id })
          );
        }}
      >
        Tạo
      </Button>
    </div>
  );

  const contentTable = tableList.map((item, index) => {
    if (index === idTableChoosing)
      return (
        <li key={index}>
          <p
            key={index}
            className="duration-200 text-lg px-2 py-1  rounded-md text-red-700  bg-black bg-opacity-50 "
          >
            {item.name}
          </p>
        </li>
      );
    else
      return (
        <li
          key={index}
          onClick={() => {
            dispatch({ type: "CHOOSING_TABLE", idTable: index });
            dispatch(GetUserListShare(item.id));
            dispatch(GetRowsData(item.id));
          }}
        >
          <p
            key={index}
            className="duration-200 text-lg px-2 py-1 hover:text-red-700 cursor-pointer"
          >
            {item.name}
          </p>
        </li>
      );
  });

  let contenRows = rowsData.map((item, index) => {
    const contentCreatetask = (
      <div className="flex justify-center px-4">
        <Input
          placeholder="Type this row name"
          value={nameNewtask}
          onChange={(e) => {
            setNameNewtask(e.target.value);
          }}
        ></Input>
        <Button
          type="danger"
          onClick={() => {
            let data = { name: nameNewtask, rowId: item.row_id, userId: userData.id };
            dispatch(CreateTask(data, tableChoosing.id));
          }}
        >
          Tạo
        </Button>
      </div>
    );
    if (item.row_name)
      return (
        <div style={{ width: 250 }} key={index}>
          <div
            key={index}
            className="bg-slate-300 px-5 py-2 m-1 rounded-md shadow-lg"
          >
            <div className="flex justify-between">
              <Paragraph
                editable={{
                  icon: <HighlightOutlined />,
                  tooltip: "click to edit row name",
                  onChange: (value) => {
                    // console.log(value)
                    dispatch(
                      UpdateRow({ name: value }, item.row_id, tableChoosing.id)
                    );
                  },
                }}
                className="font-bold border-b-2 mb-4 w-44"
              >
                {item.row_name}
              </Paragraph>
              <Popconfirm
                title="Are you sure to delete this row?"
                onConfirm={() => {
                  dispatch(DeleteRow(item.row_id, tableChoosing.id));
                }}
                // onCancel={}
                okText="Yes"
                cancelText="No"
              >
                <span className="duration-200 hover:text-red-700 hover:scale-110 cursor-pointer">
                  <DeleteOutlined />
                </span>
              </Popconfirm>
            </div>

            <Droppable droppableId={index.toString()}>
              {(provided) => (
                <ul
                  className={item.row_namwe}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {item.tasks.map((itemTask, indexTask) => {
                    if (itemTask.task_name)
                      return (
                        <Draggable
                          key={itemTask.task_id}
                          draggableId={itemTask.task_id.toString()}
                          index={indexTask}
                        >
                          {(provided) => (
                             <div
                             className="duration-200 shadow-md mb-2 bg-white hover:bg-slate-200 px-2 py-1 rounded-md"
                             ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}
                             id={itemTask.task_id}
                           >
                             <div className="border-b pb-1 flex justify-between">
                               <img
                                 src={itemTask.avatar}
                                 alt="cc"
                                 className="w-4 h-4 rounded-full"
                               />
                               <p className="m-0" style={{fontSize:10}}>{itemTask.username}</p>
                             </div>
                             <Paragraph
                               editable={{
                                 icon: (
                                   <EditOutlined
                                     style={{ color: "#CFCFCF" }}
                                   />
                                 ),
                                 tooltip: "click to edit task name",
                                 onChange: (value) => {
                                   dispatch({
                                     type: "UPDATE_TASK_NAME",
                                     content: {
                                       idTask: indexTask,
                                       idRow: index,
                                       textUpdate: value,
                                     },
                                   });

                                   dispatch(
                                     UpdateTask(
                                       { name: value },
                                       itemTask.task_id
                                     )
                                   );
                                 },
                               }}
                             >
                               {itemTask.task_name}
                             </Paragraph>
                           </div>
                          )}
                        </Draggable>
                      );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>

            <Popover
              content={contentCreatetask}
              placement="right"
              trigger="click"
            >
              <p className="duration-200 cursor-pointer hover:bg-slate-400 px-2 py-1 rounded-md">
                + Add new task
              </p>
            </Popover>
          </div>
        </div>
      );
  });
  return (
    <div
      style={{
        backgroundImage: `url(${tableChoosing.backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="flex overflow-hidden"
    >
     
      <aside className="w-64 sticky" aria-label="Sidebar">
        <div className="overflow-y-auto h-screen py-4 px-3  rounded bg-black bg-opacity-50">
          <ul className="space-y-2 text-white">
            <li>
              <h1 className="flex items-center p-2 mb-10 text-2xl border-b-2 font-normal  rounded-lg text-white hover:bg-black dark:hover:bg-gray-700">
                <svg
                  className="w-6 h-6 text-white transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Share tables</span>
              </h1>
            </li>
            {contentTable}
          </ul>
        </div>
      </aside>
      <div className=" w-full overflow-hidden">
        <div className="p-5 text-white text-2xl border-b w-full bg-white bg-opacity-80 shadow-2xl flex">
          <div
           
            className="w-96 text-black"
            style={{ marginBottom: 0 }}
          >
            {tableChoosing.name}
          </div>
          <ListUserAvt tableId={tableChoosing.id} />

          <Tooltip title="Danh sách member">
          <div 
            style={{ width: 40, height: 40 }}
            className="duration-300 cursor-pointer rounded-full bg-green-500 flex justify-center pt-2  hover:scale-110 hover:bg-green-900 ml-10"
            onClick={() => {
              dispatch({
                type: "OPEN_DRAWER",
                content: <ListMember />,
              });
            }}
          >
            <UserOutlined />
          </div>
          </Tooltip>
        </div>

        <div className="h-2/3 p-5 overflow-x-auto flex">
          {/* row  */}
          <DragDropContext onDragEnd={onDragEnd}>{contenRows}</DragDropContext>
          <div style={{ width: 200 }}>
            <Popover
              content={contentCreateRow}
              placement="right"
              trigger="click"
              className="border-white text-slate-400  cursor-pointer hover:bg-white hover:text-black border px-5 py-2 m-1 rounded-md shadow-lg flex justify-center align-middle"
            >
              <p className=" m-0"> + Create new row</p>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
