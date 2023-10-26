import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const AddTodo = () => {
  const { user } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const todo = form.todo.value;
    const id = Math.round(Math.random() * 10000);
    const todoData = { id, todo };
    try {
      const res = await fetch("https://todo-app-server-ruddy.vercel.app/todo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: user.uid, todoData }),
      });
      const data = await res.json();

      if (res.ok) {
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
          type="text"
          name="todo"
        />
      </fieldset>
      <button
        type="submit"
        className="mt-5 px-5 py-2 bg-black text-white font-bold rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default AddTodo;
