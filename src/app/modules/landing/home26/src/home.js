
import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import './styles.scss'
import Home from './pages/Home'
import Jobseekers from './pages/Jobseekers'
import Contact from './pages/Contact'
import Navbar from "./components/Navbar";

const AppLayout = () => {
    <>
        <Navbar />
        <Outlet />
    </>
}

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: []
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/jobseekers",
      element: <Jobseekers />,
    },
    {
      path: "/contact",
      element: <Contact />,
    }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);