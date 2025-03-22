import './assets/main.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import Loading from './components/Loading'
import Dashboard from './components/Dashboard/Dashboard'
import Locations, { locationLoader } from './components/Locations/Locations'
import Machines, { machineLoader } from './components/Machines/Machines'
import MachineManageModal, {
  machineManageModalLoader
} from './components/Machines/MachineManageModal'
import Inventory from './components/Inventory/Inventory'
import Notes from './components/Notes/Notes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    hydrateFallbackElement: <Loading defaultSpinner />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: '/locations',
        loader: locationLoader,
        element: <Locations />
      },
      {
        path: '/machines',
        loader: machineLoader,
        element: <Machines />,
        children: [
          {
            path: '/machines/manage/:id',
            loader: machineManageModalLoader,
            element: <MachineManageModal />
          }
        ]
      },
      {
        path: '/inventory',
        element: <Inventory />
      },
      {
        path: '/notes',
        element: <Notes />
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
