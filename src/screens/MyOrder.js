import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'), // Send user email
                }),
            });

            const result = await response.json();
            setOrderData(result.orderData);
            console.log("result",result) // Store the order data
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder(); // Fetch orders on component mount
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {orderData && Array.isArray(orderData.order_data) && orderData.order_data.length > 0 ? (
                        orderData.order_data.slice(0).reverse().map((order, index) => (
                            <div key={index} className="order-container">
                                <div className="m-auto mt-5">
                                    {order.order_date && <h6>Order Date: {order.order_date}</h6>}
                                    {order.sessionid && <h6>Session id: {order.sessionid}</h6>}
                                    {order.address && <h6>Address: {order.address}</h6>}
                                    {order.phonenumber && <h6>Phone Number: {order.phonenumber}</h6>}
                                    <hr />
                                </div>
                                <div className="order-items row">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="col-12 col-md-6 col-lg-3">
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <div className="card-body">
                                                    <h5 className="card-title text-center">{item.name}</h5>
                                                    <div
                                                        className="container w-100 p-0 text-center"
                                                        style={{ height: "38px" }}
                                                    >
                                                        <span className="m-1">Qty: {item.qty}</span>
                                                        <span className="m-1">Size: {item.size}</span>
                                                        <div className="d-inline ms-3 h-100 w-20 fs-5">
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="mt-3">
                            <h3>No Orders Yet</h3>
                            <h6>(Please select food items from the homepage)</h6>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

