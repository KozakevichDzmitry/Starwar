import imgError from "../../img/death-star.png";
import './style.scss'
import React from "react";

const Error =()=>{
    return(
        <div className="error__container">
            <div className="error__img">
                <img src={imgError} alt='error'/>
            </div>
            <div className="error__text">
                <h3>Boom</h3>
                <p>something has gone terrible wrong</p>
            </div>
        </div>
    )
}
export default Error