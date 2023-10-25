import { useLoaderData, useParams } from "react-router-dom";

const EditTodo = () => {
  const { id } = useParams();
  const data = useLoaderData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const todo = form.todo.value;

    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
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
          defaultValue={data?.todo}
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
