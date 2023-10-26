/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const EditTodo = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [todo, setTodo] = useState("");

  // fetch data from db
  useEffect(() => {
    if (user?.uid) {
      fetch(`https://todo-app-server-ruddy.vercel.app/todo?id=${id}&uid=${user.uid}`)
        .then((res) => res.json())
        .then((data) => setTodo(data));
    }
  }, [id, user?.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const todo = form.todo.value;

    try {
      const res = await fetch(`https://todo-app-server-ruddy.vercel.app/todos/${id}/${user.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      }
      if (!res.ok) {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="border border-slate-700 pl-4 pb-2">
        <legend>Todo</legend>
        <input
          className="w-full outline-none"
          required
          defaultValue={todo?.todo}
          type="text"
          name="todo"
        />
      </fieldset>
      <button
        type="submit"
        className="mt-5 px-5 py-2 bg-black text-white font-bold rounded-md"
      >
        Update
      </button>
    </form>
  );
};

export default EditTodo;
