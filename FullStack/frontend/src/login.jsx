import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [message,setMessage]=useState('');
  const [token,setToken]=useState('');
  const navigate=useNavigate();
  const signupfirst=()=>{
    navigate("/signin");
  }
  const handelLogin=async(e)=>{
    // console.log("email:",email,"message:",password);
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:4000/user/login', {
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({email,password})
      })
      const data = await response.json();
      if (!response.ok) {
       
      // console.log(data);
      // setResponseMessage(data.message);
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }
      else{
        setToken(data.token);
setMessage(data.message);
console.log("token is",token);
localStorage.setItem('token', data.token);  // Store the token in localStorage
 navigate("/home")

      }
      setEmail('');
      setPassword('');
    }catch(error){
      console.error(error);
    }
    
  }
  return (
    <>
    <div>
     <h1 style={{ textAlign: 'center',paddingTop:'6%' }}>LOGIN</h1>
     <p style={{textAlign:'center'}}>Login with your account!</p>
     </div>
     <div className="details" style={{ textAlign: 'center',paddingTop:'1%' }}>
       <form onSubmit={handelLogin}>
       <label for="email" style={{color:'blue', marginTop:"1%"}}>Email:</label><br/>
       <input type="text" id="email" name="email"   value={email} onChange={(e)=>setEmail(e.target.value)} required/><br/>
       <label for="password" style={{color:'blue', marginTop:"1%"}}>Password:</label><br/>

       <input type="text" id="password" name="password"   value={password} onChange={(e)=>setPassword(e.target.value)} required/><br/>
      <button style={{color:'blue', marginTop:"3%"}} id="submit" type='submit'>Click to Login</button>
      <h4> {message}</h4>
        <p>if not a existing user <button onClick={signupfirst}>click here to SiginUp</button></p>
       </form>
     </div>
     </>
  )
}

export default Login