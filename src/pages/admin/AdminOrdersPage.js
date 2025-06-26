import React, { useEffect, useState } from "react";
import {
  getAllOrdersAdmin,
  getOrderByIdAdmin,
  updateOrderStatus,
} from "../../api/orderApi";
import "../../styles/admin/AdminOrdersPage.scss";

const ORDER_STATUSES = [
  "Pending",    // Chờ xác nhận
  "Đóng hàng",  // Đang chuẩn bị hàng
  "Đang giao",  // Đang giao
  "Đã giao",    // Đã giao thành công
  "Đã hủy",     // Đã hủy đơn (tuỳ hệ thống)
];

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState("");

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    getAllOrdersAdmin()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải danh sách đơn hàng.");
        setLoading(false);
      });
  };

  const handleViewDetail = (orderId) => {
    setLoadingDetail(true);
    setStatusSuccess("");
    getOrderByIdAdmin(orderId)
      .then((order) => {
        setSelectedOrder(order);
        setLoadingDetail(false);
      })
      .catch(() => {
        setError("Không thể tải chi tiết đơn hàng.");
        setLoadingDetail(false);
      });
  };

  const handleCloseDetail = () => {
    setSelectedOrder(null);
    setStatusSuccess("");
  };

  // Xử lý thay đổi trạng thái đơn hàng
  const handleChangeStatus = async (e) => {
    const newStatus = e.target.value;
    if (!selectedOrder || selectedOrder.status === newStatus) return;

    setStatusLoading(true);
    setStatusSuccess("");
    try {
      await updateOrderStatus(selectedOrder.id, newStatus);
      // Cập nhật lại detail và danh sách
      const refreshedOrder = await getOrderByIdAdmin(selectedOrder.id);
      setSelectedOrder(refreshedOrder);
      fetchOrders();
      setStatusSuccess("Cập nhật trạng thái thành công!");
    } catch {
      setError("Cập nhật trạng thái thất bại.");
    }
    setStatusLoading(false);
  };

  return (
    <div className="admin-orders-page">
      <h2>Quản lý đơn hàng</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th>Ngày đặt</th>
              <th>Giá trị</th>
              <th>Trạng thái</th>
              <th>Phương thức</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.fullName}</td>
                <td>{o.phone}</td>
                <td>{o.address}</td>
                <td>{new Date(o.orderDate).toLocaleString("vi-VN")}</td>
                <td>{o.totalAmount?.toLocaleString("vi-VN")}₫</td>
                <td>{o.status}</td>
                <td>{o.paymentMethod}</td>
                <td>
                  <button onClick={() => handleViewDetail(o.id)}>
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal hiển thị chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="order-detail-modal">
          <div className="order-detail-content">
            <button className="close-btn" onClick={handleCloseDetail}>
              X
            </button>
            <h3>Đơn hàng #{selectedOrder.id}</h3>
            <div>
              <b>Khách hàng:</b> {selectedOrder.fullName}
            </div>
            <div>
              <b>SĐT:</b> {selectedOrder.phone}
            </div>
            <div>
              <b>Địa chỉ:</b> {selectedOrder.address}
            </div>
            <div>
              <b>Ghi chú:</b> {selectedOrder.note}
            </div>
            <div>
              <b>Ngày đặt:</b> {new Date(selectedOrder.orderDate).toLocaleString("vi-VN")}
            </div>
            <div>
              <b>Phương thức thanh toán:</b> {selectedOrder.paymentMethod}
            </div>
            <div style={{ margin: "10px 0" }}>
              <b>Trạng thái:</b>{" "}
              <select
                value={selectedOrder.status}
                onChange={handleChangeStatus}
                disabled={statusLoading}
                style={{ marginLeft: 8, minWidth: 100 }}
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {statusLoading && <span style={{ marginLeft: 8 }}>Đang cập nhật...</span>}
              {statusSuccess && (
                <span style={{ color: "green", marginLeft: 8 }}>{statusSuccess}</span>
              )}
            </div>
            <div>
              <b>Tổng tiền:</b> {selectedOrder.totalAmount?.toLocaleString("vi-VN")}₫
            </div>
            <h4>Sản phẩm</h4>
            <table className="order-items-table">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.productName}</td>
                    <td>{item.productPrice?.toLocaleString("vi-VN")}₫</td>
                    <td>{item.quantity}</td>
                    <td>
                      {(item.productPrice * item.quantity)?.toLocaleString("vi-VN")}₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {loadingDetail && <div className="loading-overlay">Đang tải...</div>}
        </div>
      )}
    </div>
  );
}

export default AdminOrdersPage;