import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";

function App() {
  return (
    <>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
       </>
  );
}

export default App;
