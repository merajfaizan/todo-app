import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="px-4">
      <Navbar />
      <div className="my-5">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
