import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
function Signin() {
  const navigate = useNavigate();

  const [username,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [responseMessage, setResponseMessage] = useState(''); // State to store the API response

  const logindirect=()=>{
    navigate("/login");
  }

   const handleSignup= async(e)=>{
    e.preventDefault();
    // console.log("Name:", username,"email:",email,"password:",password);
    try{
    const response = await fetch("http://localhost:4000/user/signup",{
      method: 'POST',
      headers:{'Content-Type': 'application/json',},
      body:JSON.stringify({username,email,password}),
      }
    )
    if (!response.ok) {
      // Check for specific error responses (e.g., 400 or 500 status codes)
      const data = await response.json();
    console.log(data);
    setResponseMessage(data.message);
      throw new Error(`Login failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    // console.log(data);
    setResponseMessage(data.message);
    setName('');
      setEmail('');
      setPassword('');
    }
    catch(error){
      console.error('Error:', error);
    }
    
  }
  return (
    <>
    <div>
     <h1 style={{ textAlign: 'center',paddingTop:'6%' }}>SIGNUP</h1>
     <p style={{textAlign:'center'}}>Create an account!</p>
     </div>
     <div className="details" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <form  onSubmit={handleSignup} style={{alignItems:'center'}} >
        <label for="name">Name:</label><br/>
        <input type="text" id="name" name="name"  value={username}  onChange={(e)=>setName(e.target.value)} required/><br/>
        <label for="password">Password:</label><br/>
        <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/><br/>
        <label for="email">Email:</label><br/>
        <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/><br/>
        <button type='submit' id='submit' name="submit" >SingIn</button>
        <p>{responseMessage}</p>
        <p>if already have account<button onClick={logindirect}>click here to login</button></p>
      </form>
     </div>

    </>
  )
}
//  function signupform(){
//   const name= document.getElementById('name');
//   const password= document.getElementById('password');
//   const email= document.getElementById('email');

//  }
export default Signin