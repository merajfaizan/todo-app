import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import AddTodo from "../pages/add-todo/AddTodo";
import EditTodo from "../pages/edit-todo/EditTodo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          return await fetch("https://todo-app-server-ruddy.vercel.app/todos");
        },
      },
      {
        path: "/add-todo",
        element: <AddTodo />,
      },
      {
        path: "/edit-todo/:id",
        element: <EditTodo />,
        loader: async ({ params }) => {
          return await fetch(
            `https://todo-app-server-ruddy.vercel.app/todos/${params.id}`
          );
        },
      },
    ],
  },
]);

export default router;
