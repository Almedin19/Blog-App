import React from "react";
import "../login.css";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  const navigate = useNavigate();

  const singInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/createBlog");
    });
  };

  return (
    <div className="loginPage">
      <div className="singButton">
        <button
          type="button"
          className="btn btn-primary btn-lg text-center "
          onClick={singInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
