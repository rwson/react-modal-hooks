import React from 'react'
import ReactDOM from 'react-dom'

import { Route, Routes, Link, BrowserRouter } from 'react-router-dom'

import Normal from './components/normal'
import Nested from './components/nested'
import Dynmaic from './components/dynmaic'

import { ModalProvider } from './src'

import 'antd/dist/antd.css'

const AppRoute = () => {
  return (
    <div>
      <div style={{
        marginBottom: '20px'
      }}>
        <Link to="/normal">normal useage and pass props</Link>
        <Link to="/nested">nested useage</Link>
        <Link to="/dynmaic">dynmaic useage</Link>
      </div>
      <Routes>
        <Route path="/normal" element={<Normal />} />
        <Route path="/nested" element={<Nested />} />
        <Route path="/dynmaic" element={<Dynmaic />} />
      </Routes>
    </div>
  )
}

const App2 = () => {
  return (
    <ModalProvider defaultProps={{
      width: '500px',
      centered: true,
      closeable: true
    }}>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </ModalProvider>
  );
};

ReactDOM.render(<App2 />, document.getElementById('root'));
