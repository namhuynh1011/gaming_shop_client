import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  banUser,
  unbanUser,
  deleteUser,
  setRolesForUser,
} from "../../api/userApi";

const roleList = ["Admin", "Customer"];

function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [roleEdit, setRoleEdit] = useState({}); // { [userId]: ["Admin", "Customer"] }

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllUsers();
      setUsers(res.data);
      // Nếu backend trả roles cho từng user, map lại để hiển thị
      const editObj = {};
      res.data.forEach(u => {
        // Nếu có roles thì lấy, không thì để []
        editObj[u.id] = u.roles || [];
      });
      setRoleEdit(editObj);
    } catch (err) {
      setError("Không thể tải danh sách tài khoản.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBan = async (id) => {
    try {
      await banUser(id);
      setMessage("Khoá tài khoản thành công.");
      fetchUsers();
    } catch (err) {
      setMessage("Khoá tài khoản thất bại.");
    }
  };

  const handleUnban = async (id) => {
    try {
      await unbanUser(id);
      setMessage("Mở khoá tài khoản thành công.");
      fetchUsers();
    } catch (err) {
      setMessage("Mở khoá tài khoản thất bại.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa tài khoản này?")) return;
    try {
      await deleteUser(id);
      setMessage("Xoá tài khoản thành công.");
      fetchUsers();
    } catch (err) {
      setMessage("Xoá tài khoản thất bại.");
    }
  };

  // Khi check/uncheck role
  const handleRoleChange = (userId, role, checked) => {
    setRoleEdit(prev => {
      const currentRoles = prev[userId] || [];
      if (checked) {
        return { ...prev, [userId]: [...currentRoles, role] };
      } else {
        return { ...prev, [userId]: currentRoles.filter(r => r !== role) };
      }
    });
  };

  // Khi bấm lưu role
  const handleSaveRole = async (userId) => {
    try {
      await setRolesForUser(userId, roleEdit[userId]);
      setMessage("Cập nhật role thành công.");
      fetchUsers();
    } catch (err) {
      setMessage("Cập nhật role thất bại.");
    }
  };

  return (
    <div className="account-manager">
      <h2>Quản lý tài khoản</h2>
      {message && <div style={{ color: "#1976d2", textAlign: "center" }}>{message}</div>}
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <table className="account-table" border="1" cellPadding="8" cellSpacing="0" style={{width:"100%",marginTop:20}}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Họ tên</th>
              <th>SĐT</th>
              <th>Trạng thái</th>
              <th>Xác thực email</th>
              <th>Role</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.fullName}</td>
                <td>{u.phoneNumber}</td>
                <td style={{ color: u.isBanned ? "red" : "green" }}>
                  {u.isBanned ? "Bị khoá" : "Hoạt động"}
                </td>
                <td>{u.emailConfirmed ? "Đã xác thực" : "Chưa xác thực"}</td>
                <td>
                  {roleList.map((role) => (
                    <label key={role} style={{ marginRight: 10 }}>
                      <input
                        type="checkbox"
                        checked={roleEdit[u.id]?.includes(role) || false}
                        onChange={e => handleRoleChange(u.id, role, e.target.checked)}
                      />
                      {role}
                    </label>
                  ))}
                  <button
                    style={{ marginLeft: 8 }}
                    onClick={() => handleSaveRole(u.id)}
                  >
                    Lưu role
                  </button>
                </td>
                <td>
                  {u.isBanned ? (
                    <button onClick={() => handleUnban(u.id)}>Mở khoá</button>
                  ) : (
                    <button onClick={() => handleBan(u.id)}>Khoá</button>
                  )}
                  <button
                    style={{ marginLeft: 10, color: "red" }}
                    onClick={() => handleDelete(u.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserManager;