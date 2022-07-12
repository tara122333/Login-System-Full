import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ()=>{
    return (
        <>
            <div>
                <ul className="flex gap-4 py-2 px-4 bg-red-500 text-white">
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'bg-green-500 font-bold' : 'bg-red-500 font-thin'}>Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className={({ isActive }) => isActive ? 'bg-green-500 font-bold' : 'bg-red-500 font-thin' }>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/registration" className={({ isActive }) => isActive ? 'bg-green-500 font-bold' : 'bg-red-500 font-thin' }>Registration</NavLink>
                    </li>
                    <li>
                        <NavLink to="/test" className={({ isActive }) => isActive ? 'bg-green-500 font-bold' : 'bg-red-500 font-thin' }>Hellow Tara</NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout" className={({ isActive }) => isActive ? 'bg-green-500 font-bold' : 'bg-red-500 font-thin' }>Logout</NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;