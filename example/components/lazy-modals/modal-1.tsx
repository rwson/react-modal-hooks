import React from 'react'
import { Modal } from 'antd'

export default (props) => {
  console.log(props)

  return (
    <Modal {...props}>
      Lazy Load Modal1
      {props.content}
    </Modal>
  )
}