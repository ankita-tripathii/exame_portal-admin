import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Event from "./pages/event";

function App() {
  return (
       <>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="event" element={<Event/>} />
            </Routes>
       </>
  );
}

export default App;
