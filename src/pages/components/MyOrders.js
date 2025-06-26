import React, { useEffect, useState } from "react";
import "../../styles/components/MyOrders.scss";
import { getMyOrders, getMyOrderById } from "../../api/orderApi";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getMyOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải danh sách đơn hàng.");
        setLoading(false);
      });
  }, []);

  const handleViewDetail = (orderId) => {
    setLoadingDetail(true);
    getMyOrderById(orderId)
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
  };

  return (
    <div className="my-orders-page">
      <h2>Đơn hàng của tôi</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
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
              <b>Ngày đặt:</b>{" "}
              {new Date(selectedOrder.orderDate).toLocaleString("vi-VN")}
            </div>
            <div>
              <b>Họ tên:</b> {selectedOrder.fullName}
            </div>
            <div>
              <b>Địa chỉ:</b> {selectedOrder.address}
            </div>
            <div>
              <b>Số điện thoại:</b> {selectedOrder.phone}
            </div>
            <div>
              <b>Ghi chú:</b> {selectedOrder.note}
            </div>
            <div>
              <b>Phương thức thanh toán:</b> {selectedOrder.paymentMethod}
            </div>
            <div>
              <b>Trạng thái:</b> {selectedOrder.status}
            </div>
            <div>
              <b>Tổng tiền:</b>{" "}
              {selectedOrder.totalAmount?.toLocaleString("vi-VN")}₫
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
                      {(item.productPrice * item.quantity)?.toLocaleString(
                        "vi-VN"
                      )}
                      ₫
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

export default MyOrders;