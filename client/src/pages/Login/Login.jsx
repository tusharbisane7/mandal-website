import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/axios";

function Login() {
const navigate = useNavigate();

const [username, setUsername] =
useState("");

const [password, setPassword] =
useState("");

useEffect(() => {
  const token =
    localStorage.getItem("token");

  if (
    token &&
    token !== "undefined" &&
    token !== "null"
  ) {
    navigate("/");
  }
}, [navigate]);

const handleLogin = async (e) => {
e.preventDefault();

try {
 const res = await API.post(
  "/auth/login",
  {
    username,
    password,
  }
);
localStorage.setItem(
  "role",
  res.data.user.role
);
  localStorage.setItem(
    "token",
    res.data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );

  alert("Login Successful");

  navigate("/");
} catch (err) {
  alert("Invalid Credentials");
}


};

return ( <div className="auth-container"> <div className="auth-card">


    <img
      src="/logo.png"
      alt="Mandal Logo"
      width="120"
    />

    <h1>
Baal Mitra Ganesh Utsav Mandal    </h1>

    <h2>Login</h2>

    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        required
      />

      <button type="submit">
        Login
      </button>
    </form>
  </div>
</div>


);
}

export default Login;
