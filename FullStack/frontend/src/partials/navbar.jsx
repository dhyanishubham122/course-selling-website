import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { jwtDecode } from 'jwt-decode';
import Hamburger from '../hamburger';

function Navigation() {
    const [username,setUsername]=useState('');
    useEffect(()=>{
       const token=localStorage.getItem("token");
       if(token){
        try{
            const tokendecode=jwtDecode(token);
            console.log(token.username);
            setUsername(tokendecode.username);
        }
        catch(error){
            console.error("Invalid token", error);
        }
       }
    },[])
    
  return (
   <>
   <Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand href="#home" style={{marginRight:"8%"}}>Course Selling App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={{}}>
                <Nav.Link className="ms-2" href="#home">Home</Nav.Link>
                <Nav.Link className="ms-2" href="#courses">Course</Nav.Link>
                <Nav.Link className="ms-2" href="#home">Blog</Nav.Link>
                <Nav.Link className="ms-2" href="#courses">Mycourse</Nav.Link>
            </Nav>
            <Form className="d-flex" style={{marginLeft:"5%"}}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              
            />
            <Button variant="outline-success">Search</Button>
          </Form>

           <h3 className='username ms-3'>{username} </h3>
           <i className="bi bi-bell ms-5" style={{ fontSize: '24px', marginLeft: '10px', cursor: 'pointer' }}></i>

          <p className="ms-5 mt-2"> <Hamburger/></p>
        </Navbar.Collapse>
    </Container>
   </Navbar>
   </>
  )
}

export default Navigation