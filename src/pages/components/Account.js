import React, { useEffect, useState } from "react";
import { updateProfile, changePassword } from "../../api/authApi";

function Account() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ fullName: "", userName: "", address: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setProfile({
        fullName: parsed.fullName || "",
        userName: parsed.userName || "",
        address: parsed.address || ""
      });
    }
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await updateProfile(profile, token);
      setMessage("Cập nhật thành công!");
      // update localStorage
      const updatedUser = { ...user, ...profile };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      setMessage("Cập nhật thất bại!");
    }
  };

  const handlePwChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    setPwMessage("");
    try {
      const token = localStorage.getItem("token");
      await changePassword(passwordForm, token);
      setPwMessage("Đổi mật khẩu thành công!");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setPwMessage("Đổi mật khẩu thất bại! Mật khẩu hiện tại không đúng hoặc mật khẩu mới không hợp lệ.");
    }
  };

  if (!user) return <div style={{margin: "60px auto", textAlign: "center"}}>Bạn chưa đăng nhập.</div>;

  return (
    <div className="account-page" style={{maxWidth: 380, margin: "50px auto", background: "#fff", padding: 35, borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.09)"}}>
      <h2 style={{marginBottom: 25, textAlign: "center"}}>Quản lý tài khoản</h2>

      <form onSubmit={handleProfileSubmit}>
        <div>
          <label>Họ tên</label>
          <input name="fullName" value={profile.fullName} onChange={handleProfileChange} required />
        </div>
        <div>
          <label>Tên đăng nhập</label>
          <input name="userName" value={profile.userName} onChange={handleProfileChange} />
        </div>
        <div>
          <label>Địa chỉ</label>
          <input name="address" value={profile.address} onChange={handleProfileChange} />
        </div>
        <button type="submit" style={{marginTop: 13, width: "100%"}}>Lưu thông tin</button>
        {message && <div style={{color: "#2b90ef", marginTop: 8}}>{message}</div>}
      </form>

      <hr style={{margin: "32px 0 24px"}} />

      <form onSubmit={handlePwSubmit}>
        <label>Đổi mật khẩu</label>
        <input
          type="password"
          name="currentPassword"
          placeholder="Mật khẩu hiện tại"
          value={passwordForm.currentPassword}
          onChange={handlePwChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Mật khẩu mới"
          value={passwordForm.newPassword}
          onChange={handlePwChange}
          required
        />
        <button type="submit" style={{marginTop: 8, width: "100%"}}>Đổi mật khẩu</button>
        {pwMessage && <div style={{color: pwMessage.includes("thành công") ? "green" : "red", marginTop: 8}}>{pwMessage}</div>}
      </form>
    </div>
  );
}

export default Account;