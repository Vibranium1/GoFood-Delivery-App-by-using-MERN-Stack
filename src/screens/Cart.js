// import React, { useState } from 'react';
// import trash from "../trash.svg";
// import { useCart, useDispatchCart } from '../components/ContextReducer';
// import Modal from '../Modal'; // Import the Modal component
// import { loadStripe } from '@stripe/stripe-js';


// const stripePromise = loadStripe('pk_test_51Q1UIrRuIvDcRKJX2gRx6I8w3XHIb0GLD3Qnplepgb4cC5ZBHHVYTRxhD5ZirXwMjJiljBPHjZGElZ2MowvV6qVn00OnymBlnn');

// export default function Cart() {
//     let data = useCart();
//     const [address, setAddress] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
//     const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
//     let dispatch = useDispatchCart();

//     if (data.length === 0) {
//         return (
//             <div>
//                 <div className='m-5 w-100 text-center text-white fs-5 '>The Cart is Empty!</div>
//             </div>
//         );
//     }

//     const handleCheckout = () => {
//         // Show modal to collect address and phone number
//         setIsModalOpen(true);
//     };

//     const handleSubmitDetails = async () => {
//         // console.log('Order Data:', data);

//         // Ensure data only includes serializable content (e.g., map to filter out unwanted properties)
//         const serializableData = data.map(food => ({
//             name: food.name,
//             qty: food.qty,
//             size: food.size,
//             price: food.price
//         }));

//         let userEmail = localStorage.getItem("userEmail");
//         try{

       
//         const response = await fetch("http://localhost:5000/api/create-checkout-session", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                items: serializableData,
//                 email: userEmail,
//                 order_date: new Date().toDateString(),
//                 address: address,
//                 phonenumber: phoneNumber
//             })
//         });

//         const session = await response.json();
//         console.log("session",session)

//         // Redirect to Stripe checkout
//         const stripe = await stripePromise;
//         const result = await stripe.redirectToCheckout({ sessionId: session.id });

//         // setIsModalOpen(false);
//         // console.log("result",result)

//         console.log("Order Data being sent to order route:", {
//             items: serializableData,
//             email: userEmail,
//             address,
//             phonenumber: phoneNumber,
//             id: session.id
//         });
        
//         if(result.ok){
//             try{ 
               
//                 const response2 = await fetch("http://localhost:5000/api/Orderdata", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                        items: serializableData,
//                         email: userEmail,
//                         order_date: new Date().toDateString(),
//                         address: address,
//                         phonenumber: phoneNumber,
//                         id:session.id
//                     })
//                 });
//                 const data = await response2.json();
//                 if (response2.ok) {
//                     alert('Order created successfully!');
//                   } else {
//                     alert(data.message || 'Something went wrong!');
//                   }
        
//                 }
//                 catch{
//                   console.log("error saving the data")
//                 }
        
//         }
        

//         if (result.error) {
//             console.error(result.error.message);
//         }

//     } catch (error) {
//         console.error("Error creating checkout session:", error);
//     }



//         // console.log("Order Response:", response);
//         // if (response.status === 200) {
//         //     dispatch({ type: "DROP" });
//         //     setIsModalOpen(false); // Hide the modal after submission
//         // }

       


//     };

//     let totalPrice = data.reduce((total, food) => total + food.price, 0);

//     return (
//         <div>
//             <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
//                 <table className='table '>
//                     <thead className='text-success fs-4'>
//                         <tr>
//                             <th scope='col'>Item No</th>
//                             <th scope='col'>Name</th>
//                             <th scope='col'>Quantity</th>
//                             <th scope='col'>Option</th>
//                             <th scope='col'>Amount</th>
//                             <th scope='col'>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody className='text'>
//                         {data.map((food, index) => (
//                             <tr key={index}>
//                                 <th scope='row'>{index + 1}</th>
//                                 <td>{food.name}</td>
//                                 <td>{food.qty}</td>
//                                 <td>{food.size}</td>
//                                 <td>{food.price}</td>
//                                 <td>
//                                     <button type="button" className='btn p-0'>
//                                         <img src={trash} alt="delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div>
//                     <h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1>
//                 </div>

//                 <div className='text-white'>
//                     <h5>To buy food items, proceed to check out.</h5>
//                 </div>
//                 <div>
//                     <button className='btn bg-success mt-5' style={{ marginLeft: "950px" }} onClick={handleCheckout}>
//                         Check Out
//                     </button>
//                 </div>

//                 {/* Show Modal */}
//                 {isModalOpen && (
//                     <Modal onClose={() => setIsModalOpen(false)}>
//                         <div className="text-white">
//                             <h2>Please Enter Your Delivery Details</h2>
//                             <input
//                                 type='text'
//                                 className='form-control my-3'
//                                 placeholder='Enter address for delivery'
//                                 value={address}
//                                 onChange={(e) => setAddress(e.target.value)}
//                             />
//                             <input
//                                 type='text'
//                                 className='form-control my-3'
//                                 placeholder='Enter phone number for delivery'
//                                 value={phoneNumber}
//                                 onChange={(e) => setPhoneNumber(e.target.value)}
//                             />
//                             <button className='btn btn-success' onClick={handleSubmitDetails}>
//                                 Submit
//                             </button>
//                         </div>
//                     </Modal>
//                 )}
//             </div>
//         </div>
//     );
// }


// import React, { useState } from "react";
// import trash from "../trash.svg";
// import { useCart, useDispatchCart } from "../components/ContextReducer";
// import Modal from "../Modal"; // Import the Modal component
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51Q1UIrRuIvDcRKJX2gRx6I8w3XHIb0GLD3Qnplepgb4cC5ZBHHVYTRxhD5ZirXwMjJiljBPHjZGElZ2MowvV6qVn00OnymBlnn");

// export default function Cart() {
//     let data = useCart();
//     const [address, setAddress] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     let dispatch = useDispatchCart();

//     if (data.length === 0) {
//         return (
//             <div>
//                 <div className="m-5 w-100 text-center text-white fs-5">The Cart is Empty!</div>
//             </div>
//         );
//     }

//     const handleCheckout = () => {
//         // Show modal to collect address and phone number
//         setIsModalOpen(true);
//     };

//     const handleSubmitDetails = async () => {
//         // Prepare serializable data for Stripe session
//         const serializableData = data.map((food) => ({
//             name: food.name,
//             qty: food.qty,
//             size: food.size,
//             price: food.price,
//         }));

//         const userEmail = localStorage.getItem("userEmail");

//         try {
//             const response = await fetch("http://localhost:5000/api/create-checkout-session", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     items: serializableData,
//                     email: userEmail,
//                     order_date: new Date().toDateString(),
//                     address,
//                     phoneNumber,
//                 }),
//             });
//             let items= serializableData;
//             let email= userEmail;
//             const session = await stripe.checkout.sessions.create({
//                 payment_method_types: ["card"],
//                 line_items: items.map((item) => ({
//                     price_data: {
//                         currency: "inr",
//                         product_data: { name: item.name },
//                         unit_amount: item.price * 100,
//                     },
//                     quantity: item.qty,
//                 })),
//                 mode: "payment",
//                 success_url: "http://localhost:3000/success",
//                 cancel_url: "http://localhost:3000/cancel",
//                 metadata: {
//                     items: JSON.stringify(serializableData),
//                     address,
//                     phoneNumber,
//                 },
//                 customer_email: email,
//             });

//             // const session = await response.json();

//             // Redirect to Stripe checkout
//             const stripe = await stripePromise;
//             const result = await stripe.redirectToCheckout({ sessionId: session.id });

//             if (result.error) {
//                 console.error(result.error.message);
//             }
//         } catch (error) {
//             console.error("Error creating checkout session:", error);
//         }
//     };

//     let totalPrice = data.reduce((total, food) => total + food.price, 0);

//     return (
//         <div>
//             <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
//                 <table className="table">
//                     <thead className="text-success fs-4">
//                         <tr>
//                             <th scope="col">Item No</th>
//                             <th scope="col">Name</th>
//                             <th scope="col">Quantity</th>
//                             <th scope="col">Option</th>
//                             <th scope="col">Amount</th>
//                             <th scope="col">Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text">
//                         {data.map((food, index) => (
//                             <tr key={index}>
//                                 <th scope="row">{index + 1}</th>
//                                 <td>{food.name}</td>
//                                 <td>{food.qty}</td>
//                                 <td>{food.size}</td>
//                                 <td>{food.price}</td>
//                                 <td>
//                                     <button
//                                         type="button"
//                                         className="btn p-0"
//                                         onClick={() => {
//                                             dispatch({ type: "REMOVE", index: index });
//                                         }}
//                                     >
//                                         <img src={trash} alt="delete" />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div>
//                     <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
//                 </div>

//                 <div className="text-white">
//                     <h5>To buy food items, proceed to check out.</h5>
//                 </div>
//                 <div>
//                     <button
//                         className="btn bg-success mt-5"
//                         style={{ marginLeft: "950px" }}
//                         onClick={handleCheckout}
//                     >
//                         Check Out
//                     </button>
//                 </div>

//                 {/* Show Modal */}
//                 {isModalOpen && (
//                     <Modal onClose={() => setIsModalOpen(false)}>
//                         <div className="text-white">
//                             <h2>Please Enter Your Delivery Details</h2>
//                             <input
//                                 type="text"
//                                 className="form-control my-3"
//                                 placeholder="Enter address for delivery"
//                                 value={address}
//                                 onChange={(e) => setAddress(e.target.value)}
//                             />
//                             <input
//                                 type="text"
//                                 className="form-control my-3"
//                                 placeholder="Enter phone number for delivery"
//                                 value={phoneNumber}
//                                 onChange={(e) => setPhoneNumber(e.target.value)}
//                             />
//                             <button className="btn btn-success" onClick={handleSubmitDetails}>
//                                 Submit
//                             </button>
//                         </div>
//                     </Modal>
//                 )}
//             </div>
//         </div>
//     );
// }


import React, { useState } from "react";
import trash from "../trash.svg";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import Modal from "../Modal";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Q1UIrRuIvDcRKJX2gRx6I8w3XHIb0GLD3Qnplepgb4cC5ZBHHVYTRxhD5ZirXwMjJiljBPHjZGElZ2MowvV6qVn00OnymBlnn");

export default function Cart() {
    let data = useCart();
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center text-white fs-5">The Cart is Empty!</div>
            </div>
        );
    }

    const handleCheckout = () => {
        setIsModalOpen(true);
    };

    const handleSubmitDetails = async () => {
        const serializableData = data.map((food) => ({
            name: food.name,
            qty: food.qty,
            size: food.size,
            price: food.price,
        }));

        const userEmail = localStorage.getItem("userEmail");

        try {
            // Send checkout data to the backend
            const response = await fetch("http://localhost:5000/api/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: serializableData,
                    email: userEmail,
                    order_date: new Date().toDateString(),
                    address,
                    phoneNumber,
                }),
            });

            const session = await response.json();


            if (!session.id) {
                console.error("Invalid session ID returned from server");
                return;
            }
            console.log("session",session)
            // Redirect to Stripe Checkout
            const stripe = await stripePromise;
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                console.error("Error redirecting to Stripe Checkout:", result.error.message);
            } else {
                // Clear cart and close modal after successful redirection
                dispatch({ type: "DROP" });
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className="table">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col">Item No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text">
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn p-0"
                                        onClick={() => {
                                            dispatch({ type: "REMOVE", index: index });
                                        }}
                                    >
                                        <img src={trash} alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
                </div>

                <div className="text-white">
                    <h5>To buy food items, proceed to check out.</h5>
                </div>
                <div>
                    <button
                        className="btn bg-success mt-5"
                        style={{ marginLeft: "950px" }}
                        onClick={handleCheckout}
                    >
                        Check Out
                    </button>
                </div>

                {/* Show Modal */}
                {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)}>
                        <div className="text-white">
                            <h2>Please Enter Your Delivery Details</h2>
                            <input
                                type="text"
                                className="form-control my-3"
                                placeholder="Enter address for delivery"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control my-3"
                                placeholder="Enter phone number for delivery"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <button className="btn btn-success" onClick={handleSubmitDetails}>
                                Submit
                            </button>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
}

