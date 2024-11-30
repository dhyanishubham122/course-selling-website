import React from 'react'
import  { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './hamburger.css';

import {jwtDecode} from "jwt-decode"; 
// import Details from './details';
function Hamburger() {

const [userid,setUserid]=useState('');
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserid(decodedToken.userId);
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
    }, [])



    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

const navigate = useNavigate();
const token=  localStorage.getItem("token");

const handleLogout = () => {
  localStorage.removeItem("token");
     navigate("/login");
  }
  const handleSignin = () => {
      navigate("/signin");
  }
  return (
    <>
    <div className="navbar">
            <div className="hamburger" onClick={toggleMenu}>
                <div className={`bar ${isOpen ? "open" : ""}`}></div>
                <div className={`bar ${isOpen ? "open" : ""}`}></div>
                <div className={`bar ${isOpen ? "open" : ""}`}></div>
            </div>
            <div className={`menu ${isOpen ? "open" : ""}`}>
                <ul>
                  {token?(<>
                    <li><Link to={`/details?userid=${userid}`}>My Account</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                  ):(
                    <li><button onClick={handleSignin}>SignIn</button></li>
                  )}
                </ul>
            </div>
        </div>
    </>
  )
}

export default Hamburger