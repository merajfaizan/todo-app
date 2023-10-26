import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import AddTodo from "../pages/add-todo/AddTodo";
import EditTodo from "../pages/edit-todo/EditTodo";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-todo",
        element: (
          <PrivateRoute>
            <AddTodo />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-todo/:id",
        element: (
          <PrivateRoute>
            <EditTodo />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
