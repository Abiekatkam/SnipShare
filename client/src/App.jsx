import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LoginPage, RegisterPage, RootPage } from './pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage/>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App