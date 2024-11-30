import React, { useEffect, useState } from 'react'
import {  useLocation } from 'react-router-dom';
import { Container, Card, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";



function Details() {
  const navigate = useNavigate();
  function updatepassword(){
 navigate('/updatepassword')
  }
  const [userid,setUserid]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [purchasedcourses,setPurchasedcourses]=useState('');  
  const location=useLocation();
// const userId="6741acb4d7d3c355f23ed340"
  useEffect(()=>{
    const searchparams= new URLSearchParams(location.search);
    const userId=searchparams.get('userid');
    const fetchdata=async()=>{
try{
    
   const response= await fetch(`http://localhost:4000/user/details?userid=${userId}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }}
    )
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data=await response.json()
    console.log(data);
    setUserid(data._id);
    setName(data.username);
    setEmail(data.email);
    setPassword(data.password);
    setPurchasedcourses( data.purchasedcourses.length);
  }
  catch(error){
    console.error(error);
  }
  

  }
 fetchdata();
    // setPurchasedcourses(response.purchasedcourses.length);
  },[]);
  
  return (
    <>
     <Container className="mt-5">
      <Card>
        <Card.Header>
          <h3>Your Account Information</h3>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Username:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Password:</strong> {password} <button onClick={updatepassword}>Update password</button></p>
            </Col>
            <Col md={6}>
              <p><strong>Registration ID:</strong> {userid}</p>
              <p><strong>Purchased Courses:</strong></p>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Purchase Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {user.purchasedCourses.map((course, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course.name}</td>
                      <td>{course.purchaseDate}</td>
                    </tr>
                  ))} */}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
    </>
  )
}

export default Details;