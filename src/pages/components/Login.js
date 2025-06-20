import React, { useState } from "react";
import { login } from "../../api/authApi";
import "../../styles/components/Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset lỗi cũ
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch (err) {
      // Lấy message từ backend nếu có
      let message = "Đăng nhập thất bại!";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setError(message);
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
      {error && <div className="login-error">{error}</div>}
      <button type="submit">Đăng nhập</button>
    </form>
  );
}

export default Login;