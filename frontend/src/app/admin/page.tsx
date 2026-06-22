"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  };

  const handleStatusChange = async (orderId: any, newStatus: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchOrders(); // Refresh list
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Orders</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-4">#{order.id}</td>
                <td className="p-4">
                  {order.customer_name}<br/>
                  <span className="text-xs text-gray-500">{order.phone}</span>
                </td>
                <td className="p-4">{order.product_name}</td>
                <td className="p-4">{order.quantity}</td>
                <td className="p-4">
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`p-1 border rounded text-sm ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}