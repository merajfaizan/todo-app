import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const data = useLoaderData();
  const [todos, setTodos] = useState(data);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setTodos(todos.filter((todo) => todo._id !== id));
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
      {todos?.map((todo) => (
        <div className="shadow-lg w-full rounded p-4" key={todo._id}>
          <p>Todo: {todo.todo}</p>
          <div className="flex justify-center items-center gap-4">
            <Link
              to={`/edit-todo/${todo._id}`}
              className="mt-5 w-full px-5 py-2 bg-white border border-green-600 text-green-600 font-bold rounded-md text-center"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(todo._id)}
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
