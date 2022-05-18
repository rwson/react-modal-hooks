import React from 'react'
import { Spin } from 'antd'

export default () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: "fixed",
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.4)'
  }}>
    <Spin size='large' />
  </div>
)