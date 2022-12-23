import React from "react";
import './style.scss'

const Spinner =()=>{
    return(
        <div className="spinner text-center">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}
export default Spinner