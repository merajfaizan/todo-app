import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      fetch(`https://todo-app-server-ruddy.vercel.app/todos/${user?.uid}`)
        .then((res) => res.json())
        .then((data) => setTodos(data));
    }
  }, [user?.uid]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://todo-app-server-ruddy.vercel.app/todos/${user?.uid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setTodos(todos.filter((todo) => todo.id !== id));
      }
      if (!res.ok) {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {!user && (
        <h2 className="col-span-1 md:col-span-2 lg:col-span-3 h-[50vh] inline-flex justify-center items-center font-medium">
          No Task here 😱. Sign up to plan your daily tasks.
        </h2>
      )}
      {user &&
        todos?.map((todo) => (
          <div
            className="shadow-lg w-full rounded p-4 flex flex-col justify-between"
            key={todo.id}
          >
            <p>
              <span className="font-medium">Todo:</span> {todo.todo}
            </p>
            <div className="flex justify-center items-center gap-4">
              <Link
                to={`/edit-todo/${todo.id}`}
                className="mt-5 w-full px-5 py-2 bg-white border border-green-600 text-green-600 font-bold rounded-md text-center"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(todo.id)}
                className="mt-5 w-full px-5 py-2 bg-white border border-red-600 text-red-600 font-bold rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
