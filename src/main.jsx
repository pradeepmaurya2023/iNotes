import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddNotes from './components/AddNotes.jsx';
import EditNote from './components/EditNote.jsx';
import ListNotes from './components/ListNotes.jsx';

// router handling routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path : "/",
        element : <ListNotes/>
      },
      {
        path : '/addNotes',
        element : <AddNotes />
      },
      {
        path : '/editNote/:id',
        element : <EditNote />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
