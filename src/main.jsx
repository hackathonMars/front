import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Blogs from "./pages/Blogs";
import CreateReport from "./pages/CreateReport";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Blogs/>
      },
      {
        path: '/create/report',
        element: <CreateReport/>
      },
      {
        path: '/create/blog',
        element: <CreateBlog/>
      },
      {
        path: '/profile',
        element: <Profile/>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);