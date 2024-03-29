import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './styles/index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/root";

import ErrorPage from './errors/error-page';
import Index from './routes/index';
import Login from './routes/login';
import Profile from './routes/profile';

import Upload from './routes/upload';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from 'react-hot-toast';
import EditProfile from './routes/edit-profile';
import Register from './routes/register';
import Activate from './routes/activate';
import Search from './routes/search';
import PublicProfile from './routes/public-profile';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "upload",
        element: <Upload />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "user/:id",
        element: <PublicProfile />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "activate",
        element: <Activate />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>,
)
