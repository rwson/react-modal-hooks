import React from 'react'
import { Modal } from 'antd'

export default (props) => {
  return (
    <Modal {...props}>
      Lazy Load Modal2
      {props.content}
    </Modal>
  )
}