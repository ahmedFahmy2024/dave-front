// login.js file

import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import { Axios } from "../../app/api/Axios";
import { LOGIN_URL } from "../../app/api/EndPoints";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { username, password };
    try {
      const response = await Axios.post(LOGIN_URL, body, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success("Login successful");
      const accessToken = response?.data?.accessToken;
      setAuth({ accessToken });
      setPersist(true);
      console.log(response.data);
      // Reset form fields
      setUsername("");
      setPassword("");

      navigate("/dash");
    } catch (error) {
      console.log(error);
      if (!error.status) {
        setErrMsg("No Server Response");
        toast.error("No Server Response");
      } else if (error.status === 400) {
        setErrMsg("Missing Username or Password");
        toast.error("Missing Username or Password");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized");
        toast.error("Unauthorized");
      } else {
        setErrMsg(error.data?.message);
        toast.error(error.data?.message);
      }
      errRef.current.focus();
    }
  };

  const errClass = errMsg ? "errmsg" : "offscreen";

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button className="form__submit-button">Sign In</button>

          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={() => setPersist((prev) => !prev)}
              checked={persist}
            />
            Trust This Device
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
};

export default Login;
