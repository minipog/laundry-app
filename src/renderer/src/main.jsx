import './assets/main.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import Loading from './components/Loading'
import Dashboard, { dashboardLoader } from './components/Dashboard/Dashboard'
import Locations, { locationsLoader } from './components/Locations/Locations'
import Machines, { machineLoader } from './components/Machines/Machines'
import MachineManageModal, {
  machineManageModalLoader
} from './components/Machines/MachineManageModal'
import Inventory from './components/Inventory/Inventory'
import Notes, { notesLoader } from './components/Notes/Notes'
import NotFound from './components/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    hydrateFallbackElement: <Loading defaultSpinner />,
    children: [
      { index: true, loader: dashboardLoader, element: <Dashboard /> },
      {
        path: '/locations',
        loader: locationsLoader,
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
        loader: notesLoader,
        element: <Notes />
      }
    ]
  },
  { path: '*', element: <NotFound /> }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
