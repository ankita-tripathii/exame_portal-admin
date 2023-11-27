import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLogin from "./pages/adminlogin";
import AdminRegister from "./pages/adminregister";
import Home from "./pages/home";

function App() {
  return (
    <>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="/adminregister" element={<AdminRegister />} />
            </Routes>
       </>
  );
}

export default App;
