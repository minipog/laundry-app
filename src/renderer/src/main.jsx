import './assets/main.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import Loading from './components/Loading'
import Dashboard from './components/Dashboard/Dashboard'
import Machines, { machineLoader } from './components/Machines/Machines'
import MachineManageModal from './components/Machines/MachineManageModal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    hydrateFallbackElement: <Loading defaultSpinner />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: '/machines',
        element: <Machines />,
        loader: machineLoader,
        children: [{ path: '/machines/manage/:id', element: <MachineManageModal /> }]
      }
    ]
  },
  { path: '*', element: <div className="d-flex flex-column align-items-center">Not Found</div> }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
