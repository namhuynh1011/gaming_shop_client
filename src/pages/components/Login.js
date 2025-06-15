import React, { useState } from "react";
import { login } from "../../api/authApi";
import "../../styles/Login.scss";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/"; 
    } catch (err) {
      alert("Đăng nhập thất bại!");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Đăng nhập</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Đăng nhập</button>
    </form>
  );
}

export default Login;
