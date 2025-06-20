import React, { useState } from "react";
import { register } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import "../../styles/components/Register.scss"; // Import your styles if needed
function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userName = fullName;
      const user = { userName, fullName, email, password, role: "Customer" }; // Thêm role
      const res = await register(user);
      alert("Đăng ký thành công! Mời bạn đăng nhập.");
      navigate("/login");
    } catch (err) {
      alert("Đăng ký thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Đăng ký</h2>
      <input
        type="text"
        placeholder="Tên đầy đủ"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
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
      <button type="submit">Đăng ký</button>
    </form>
  );
}

export default Register;
