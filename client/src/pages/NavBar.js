import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
    const [click, setClick] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    function handleLogout() {
        Cookies.remove('token');
        setLoggedIn(false);
    }

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo-container">
                        <img src={require('./apple-touch-icon.png')} alt="VogueVista Logo" className='logo-icon' />
                    </div>
                    <NavLink exact to="/" className="nav-logo">
                        VogueVista
                        <i className="fas fa-code"></i>
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        {loggedIn ? (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={() => setClick(false)}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/products"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={() => setClick(false)}
                                    >
                                        Products
                                    </NavLink>
                                </li>
                              
                                <li className="nav-item dropdown">
                                    <span className="nav-links dropdown-toggle" onClick={() => setClick(!click)}>
                                        Account
                                    </span>
                                    <div className={click ? "dropdown-menu active" : "dropdown-menu"}>
                                        <NavLink
                                            exact
                                            to="/profile"
                                            activeClassName="active"
                                            className="dropdown-item"
                                            onClick={() => setClick(false)}
                                        >
                                            Profile
                                        </NavLink>
                                        <NavLink
                                            exact
                                            to="/cart"
                                            activeClassName="active"
                                            className="dropdown-item"
                                            onClick={() => setClick(false)}
                                        >
                                            Cart
                                        </NavLink>
                                        <NavLink
                                            exact
                                            to="/success"
                                            activeClassName="active"
                                            className="dropdown-item"
                                            onClick={() => setClick(false)}
                                        >
                                            My Orders
                                        </NavLink>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/contactus"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={() => setClick(false)}
                                    >
                                        Contact Us
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/login"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={() => setClick(false)}
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/auth"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={() => setClick(false)}
                                    >
                                        Signup
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="nav-icon" onClick={() => setClick(!click)}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;

