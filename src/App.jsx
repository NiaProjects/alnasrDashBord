
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import CertificatesForm from './components/CAlert/CAlert'
import Specialization from './pages/Specialization/Specialization'
import Doctors from './pages/Doctors/Doctors'

function App() {
  const routes = createHashRouter(   [
    { path: "/login", element: <Login/> },
    { path: "/", element: <Layout />, children : [

      { path: "/", element: <Home/> },
      { path: "/Specialization", element: <Specialization/> },
      { path: "/docs", element: <Doctors/> },
    ] 
    }
  ]  )

  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={ queryClient }>

      <RouterProvider  router={routes}  />

      </QueryClientProvider>

    </>
  )
}

export default App
