import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0">
            <a className="navbar-brand" href="www.google.com">Cyberlearn</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" className="nav-link" to="/home">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" className="nav-link" to="/profile">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" className="nav-link" to="/demohocmodal">Demo HOC</NavLink>
                    </li>


                    <li className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                            Dropdown</button>
                        <div className="dropdown-menu">
                            <NavLink activeClassName="activeNavItem" className="nav-link text-dark" to="/todolistrcc">To Do List RCC</NavLink>
                            <NavLink activeClassName="activeNavItem" className="nav-link text-dark" to="/todolistrfc">To Do List RFC</NavLink>
                            <NavLink activeClassName="activeNavItem" className="nav-link text-dark" to="/todolistredux">To Do List Redux</NavLink>
                            <NavLink activeClassName="activeNavItem" className="nav-link text-dark" to="/todolistsaga">To Do List Redux Saga</NavLink>


                        </div>

                    </li>
                </ul>
            </div>
        </nav>


    )
}
