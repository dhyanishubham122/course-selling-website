import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';

function Updatepassword() {
    const [email,setEmail]=useState('');
const [newpassword,setNewPassword]=useState('');
const [oldpassword,setOldPassword]=useState('');
const [msg,setMsg]=useState('');
    const handlepassword=async(e)=>{
        e.preventDefault();
        try{
        const response = await fetch("http://localhost:4000/user/updatepassword",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email:email,
                oldpassword:oldpassword,
                newpassword:newpassword
            })
        })
        if(!response.ok){
            throw new Error(response.statusText);
        }
        const data = await response.json();
            setMsg(data.message);
          console.log("response:",response);
        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <Container 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full height for vertical centering
      }}
    >
    <Form style={{width: '300px'}} onSubmit={handlepassword}>
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" id="email" placeholder="Enter your email"  onChange={(e)=>setEmail(e.target.value)}/>
        
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Old Password</Form.Label>
        <Form.Control type="password" placeholder=" enter your old Password" id="oldpassword" onChange={(e)=>setOldPassword(e.target.value)}/>
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder=" enter your new Password" id="newpassword" onChange={(e)=>setNewPassword(e.target.value)} />
      </Form.Group>
     
      <Button variant="primary" type="submit" >
        change password
      </Button>
    </Form>
     <p>{msg}</p>
    </Container>
  )
}

export default Updatepassword