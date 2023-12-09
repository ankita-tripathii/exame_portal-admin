import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Event from "./pages/event";
import Organisation from "./pages/organisation";
import Candidate from "./pages/candidate";
import Assessment from "./pages/assessment";

function App() {
  return (
       <>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/event" element={<Event/>} />
              <Route path="/organisation" element={<Organisation/>} />
              <Route path="/assessment" element={<Assessment/>} />
              <Route path="/candidate" element={<Candidate/>} />
            </Routes>
       </>
  );
}

export default App;
