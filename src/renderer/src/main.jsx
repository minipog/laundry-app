import './assets/main.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import Dashboard from './components/Dashboard/Dashboard'
import Machines from './components/Machines/Machines'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: '/', element: <Dashboard /> }]
  },
  { path: '/machines', element: <App />, children: [{ path: '/machines', element: <Machines /> }] }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
