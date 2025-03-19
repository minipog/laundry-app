import './assets/main.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import Dashboard from './components/Dashboard/Dashboard'
import Machines from './components/Machines/Machines'
import MachineManageModal from './components/Machines/MachineManageModal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: '/', element: <Dashboard /> }]
  },
  {
    path: '/machines',
    element: <App />,
    children: [
      { path: '/machines', element: <Machines /> },
      { path: '/machines/manage/:id', element: <MachineManageModal /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
