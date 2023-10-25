import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-4">
      <h1 className="text-5xl font-bold">Todo</h1>
      <ul className="flex justify-center items-center gap-4 text-lg">
        <Link to={"/"}>
          <li>Todo-list</li>
        </Link>
        <Link to={"/add-todo"}>
          <li>Add-Todo</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
