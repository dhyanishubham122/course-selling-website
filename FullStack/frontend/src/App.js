import './App.css';
import Login from './login';
import Home from './home';
import Signin from './signin'
import Hamburger from './hamburger';
import Navbar from './partials/navbar';
import Details from './details';
import Updatepassword from './updatepassword';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={< ><div>Hello</div></>} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/details" element={<Details/>}/>
          <Route path="/navbar" element={<Navbar/>}/>
          <Route path="/hamburger" element={<Hamburger/>}/>
          <Route path="/updatepassword" element={<Updatepassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
