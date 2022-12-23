import React, {Component} from 'react';
import Logo from "../../img/logo.png"
import "./style.scss"
import {NavLink} from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <header>
                <nav className="header__menu navbar navbar-expand-sm  bg-light">
                    <div className="container gap-5">
                        <h1 className="logo">
                            <NavLink to='/' className='header__logo'>
                                <img src={Logo} alt="Logo" width="30" className="d-inline-block align-text-top"/>
                                <span>StarDB</span>
                            </NavLink>
                        </h1>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <NavLink className="nav-link" aria-current="page" to="/people">People</NavLink>
                                <NavLink className="nav-link" to="/planets">Planets</NavLink>
                                <NavLink className="nav-link" to="/starships">Starships</NavLink>
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                                <NavLink className="nav-link" to="/secret">Secret</NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}