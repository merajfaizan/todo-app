import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";

/* eslint-disable no-unused-vars */
const Register = () => {
  const { handleCreateUser, googleLogin, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();

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
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const password = form.password.value;
    const capitalLetterPattern = /.*[A-Z].*/;
    const specialCharPattern = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;

    if (!capitalLetterPattern.test(password)) {
      return alert("Add at-least a capital letter");
    } else if (!specialCharPattern.test(password)) {
      return alert("Add at-least a special character");
    }
    handleCreateUser(email, password)
      .then((result) => {
        const detaileduser = result.user;
        const user = {
          uid: detaileduser.uid,
          displayName: name,
          photoURL: image,
          email: detaileduser.email,
          password: password,
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
              handleUpdateUserProfile(name, image);
              alert(data.message);
            } else {
              alert(data.message);
            }
            navigate("/");
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => {
        const errorMessage = error.message.split(":");
        alert(errorMessage[1]);
      });
  };

  const handleUpdateUserProfile = (name, photoUrl) => {
    const profile = {
      displayName: name,
      photoURL: photoUrl,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => console.error(error));
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
          <label htmlFor="name" className="pl-1 pb-1">
            Name
          </label>
          <input
            className="bg-slate-100 outline-none p-2 rounded"
            type="text"
            name="name"
            id="name"
            placeholder="Meraj Faizan"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="pl-1 pb-1">
            Image link
          </label>
          <input
            className="bg-slate-100 outline-none p-2 rounded"
            type="text"
            name="image"
            id="image"
            placeholder="https://demoimage.com"
            required
          />
        </div>
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
          Register
        </button>
        <Link to={"/login"}>
          Already have an account?{" "}
          <span className="underline font-medium">click here to Login</span>
        </Link>
      </form>
      <div className="flex-1"></div>
    </section>
  );
};

export default Register;
