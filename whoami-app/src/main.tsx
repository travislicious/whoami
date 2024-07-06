import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import TraitsPage from './pages/traits.tsx'
import './i18n';


const router = createBrowserRouter([
  {
  path: '/',
  element: <App />
  },
  {
    path: '/person/:name',
    element: <TraitsPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
<RouterProvider router={router} />
  </React.StrictMode>,
)
