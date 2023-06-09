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

      // {
      //   path: "contacts/:contactId",
      //   element: <Contact />,
      //   loader: contactLoader,
      //   action: contactAction,
      // },
      // {
      //   path: "contacts/:contactId/edit",
      //   element: <EditContact />,
      //   loader: contactLoader,
      //   action: editAction,
      // },
      // {
      //   path: "contacts/:contactId/destroy",
      //   action: destroyAction,
      //   errorElement: <div>Oops! There was an error.</div>
      // },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
