import React from 'react'
import { Modal, Button } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
export default function ModalTemplate() {
    let {isOpen, content} = useSelector(state => state.ModalReducer);
    let dispatch = useDispatch();

    const closeModel = () => {
      dispatch({type:"CLOSE_MODAL"});
    }
  return (
    <div>
        <Modal title="Basic Modal" visible={isOpen} onOk={closeModel} onCancel={closeModel}>
        {content}
      </Modal>
    </div>
  )
}
