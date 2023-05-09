import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import { useNavigate } from "react-router-dom";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const navigate = useNavigate();

  const singUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/");
    });
  };

  return (
    <>
      <nav className="nav sticky-top">
        <Link to="/home">Home</Link>
        {!isAuth ? (
          <Link to="/">Login</Link>
        ) : (
          <>
            <Link to="/createBlog">Create Post</Link>
            <button
              type="button"
              className="btn btn-dark fs-5"
              onClick={singUserOut}
            >
              Log Out
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/home" element={<Home isAuth={isAuth} />} />
        <Route path="/createBlog" element={<CreateBlog isAuth={isAuth} />} />
        <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </>
  );
}

export default App;
