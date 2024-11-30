import React, { useState,useEffect } from 'react';
// import jwtDecode from "jwt-decode";
// import {jwtDecode} from "jwt-decode"; // Notice NO curly braces needed
import Hamburger from './hamburger';
import Navbar from './partials/navbar'
function Home() {
    // const [username,setUsername]=useState('');
    // useEffect(() => {
    //     const token = localStorage.getItem("token");

    //     if (token) {
    //         try {
    //             const decodedToken = jwtDecode(token);
    //             setUsername(decodedToken.username);
    //         } catch (error) {
    //             console.error("Invalid token", error);
    //         }
    //     }
    // }, [])
  return (
    <>
    <Navbar/>
 
    </>
   


  )
}

export default Home