import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authorize } from './pages/authorize/Authorize.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="/authorize" Component={Authorize} />
      <Route path="/" Component={App} />
    </Routes>
  </Router>,
)
