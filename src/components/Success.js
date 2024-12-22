import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="container text-center mt-5">
    <h1 className="text-success">Payment Successful!</h1>
    <p className="fs-4 mt-3">
        Thank you for your order. Your payment has been processed successfully.
    </p>
    <p className="fs-5">
        Your food will be delivered to your provided address shortly.
    </p>
    <div className="mt-4">
        <Link to="/" className="btn btn-primary">
            Go back to Homepage
        </Link>
    </div>
</div>
  )
}

export default Success
