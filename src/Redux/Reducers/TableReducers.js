const stateDefault = {
  tableList: [0],
  tableChoosing: {},
  idTableChoosing: 0,
  rowsData: [],
};

export const TableReducers = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_TABLE_LIST": {
      state.tableList = action.content;
      if (state.tableList.length > 0) {
        state.tableChoosing = state.tableList[state.idTableChoosing];
      }
      return { ...state };
    }

    case "CHOOSING_TABLE": {
      state.idTableChoosing = action.idTable;
      state.tableChoosing = state.tableList[action.idTable];
      return { ...state };
    }
    case "GET_ROWS_DATA": {
      state.rowsData = action.content;
      return { ...state };
    }

    case "DRAG_TASK": {
      let { indexRowTo, indexRowFrom, toId, fromId } = action.content;
      if (indexRowFrom === indexRowTo) {
        let tempDataRows = state.rowsData[indexRowTo];
        let tempTask = tempDataRows.tasks[toId];
        tempDataRows.tasks[toId] = tempDataRows.tasks[fromId];
        tempDataRows.tasks[fromId] = tempTask;
        state.rowsData[indexRowTo] = tempDataRows;
      }
      else{
          let tempRowTo = state.rowsData[indexRowTo];
          let tempRowFrom = state.rowsData[indexRowFrom];
          tempRowFrom.tasks.splice(fromId, 0, tempRowTo.tasks[toId]);
          tempRowTo.tasks.splice(toId,1);
          state.rowsData[indexRowTo] = tempRowTo;
          state.rowsData[indexRowFrom] = tempRowFrom;
      }
      return { ...state };
    }

    case "CHANGE_CHOOSING_TABLE":{
      state.tableChoosing = action.content;
      state.tableList[state.idTableChoosing] = action.content;
      return {...state}
    }

    case "UPDATE_TASK_NAME":{
      let {idTask, idRow, textUpdate} = action.content;
      state.rowsData[idRow].tasks[idTask].task_name = textUpdate
      return {...state}
    }
    default:
      return { ...state };
  }
};
