import React from 'react'
import { Link } from 'react-router-dom';

const Failure = () => {
  return (
    <div className="container text-center mt-5">
    <h1 className="text-danger">Payment Failed</h1>
    <p className="fs-4 mt-3">
        Unfortunately, your payment could not be processed.
    </p>
    <p className="fs-5">
        Please check your payment details or try again later.
    </p>
    <div className="mt-4">
        <Link to="/" className="btn btn-primary">
            Go back to Homepage
        </Link>
    </div>
</div>

  )
}

export default Failure