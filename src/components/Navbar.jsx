import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center py-4">
      <h1 className="text-5xl font-bold">Todo</h1>
      <ul className="flex justify-center items-center gap-4 text-lg">
        <Link to={"/"}>
          <li>Todo-List</li>
        </Link>
        <Link to={"/add-todo"}>
          <li>Add-Todo</li>
        </Link>
        {!user ? (
          <>
            <Link
              className="bg-black text-white font-medium px-5 py-2 rounded-md"
              to={"/login"}
            >
              <li>Login</li>
            </Link>
            <Link
              className="bg-black text-white font-medium px-5 py-2 rounded-md"
              to={"/register"}
            >
              <li>Register</li>
            </Link>
          </>
        ) : (
          <div className="flex  justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-2">
              <img
                className="w-12 h-12 rounded-full"
                src={user?.photoURL}
                alt="user-image"
              />
              <span className="text-sm">
                Hello, <br /> {user?.displayName}
              </span>
            </div>
            <button
              className="bg-black text-white font-medium px-5 py-2 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
