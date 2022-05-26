import React from 'react'
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

export default function DrawerTemplate(props) {

    const {isOpen,content} = useSelector(state => state.DrawerReducer);
    const dispatch = useDispatch();

  return (
    <div>
         <Drawer width={480}  placement="right" onClose={() => {
           dispatch({type: 'CLOSE_DRAWER'})
         }} visible={isOpen}>
             {content}
      </Drawer>
    </div>
  )
}
