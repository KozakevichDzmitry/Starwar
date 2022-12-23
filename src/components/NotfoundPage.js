import {Link} from "react-router-dom";
import React from "react";

const NotFoundPage = ()=>{
    return(
        <>
            <div className="container">
                <h2 className="container">The page not found</h2>
                <Link to='/'>Go to Home</Link>
            </div>
        </>

    )
}
export default NotFoundPage