import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";

/* eslint-disable no-unused-vars */
const Login = () => {
  const { googleLogin, handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //  Google auth provider
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    googleLogin(googleProvider)
      .then((result) => {
        const detaileduser = result.user;
        const user = {
          uid: detaileduser.uid,
          displayName: detaileduser.displayName,
          photoURL: detaileduser.photoURL,
          email: detaileduser.email,
          todos: [],
        };
        fetch("https://todo-app-server-ruddy.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              alert(data.message);
              navigate("/");
            } else {
              alert(data.message);
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => {
        const errorMessage = error.message.split(":");
        alert(errorMessage[1]);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    handleLogin(email, password)
      .then((result) => {
        alert("Successfully LoggedIn");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message.split(":");
        alert(errorMessage[1]);
      });
  };

  return (
    <section className="flex flex-col md:flex-row justify-center mt-5 px-5">
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="bg-black text-white font-medium py-2 rounded-md"
        >
          Google
        </button>
        <hr />
        <div className="flex flex-col">
          <label htmlFor="email" className="pl-1 pb-1">
            Email
          </label>
          <input
            className="bg-slate-100 outline-none p-2 rounded"
            type="text"
            name="email"
            id="email"
            placeholder="meraj@gmail.com"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="pl-1 pb-1">
            Password
          </label>
          <input
            className="bg-slate-100 outline-none p-2 rounded"
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white font-medium py-2 rounded-md"
        >
          Login
        </button>
        <Link to={"/register"}>
          Don&apos;t have an account?{" "}
          <span className="underline font-medium">click here to Register</span>
        </Link>
      </form>
      <div className="flex-1"></div>
    </section>
  );
};

export default Login;
