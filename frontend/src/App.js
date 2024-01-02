import './App.css';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
//<Outlet> is used to render the child elements of the parent route.

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Event from "./pages/event";
import Organisation from "./pages/organisation";
import Candidate from "./pages/candidate";
import Assessment from "./pages/assessment";


const PrivateRoutes = () => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />; //<Outlet> component can be used in a parent <Route> element to render out child elements.
};


function App() {

  return (
       <>
           
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/event' element={<Event />} />
          <Route path='/organisation' element={<Organisation />} />
          <Route path='/assessment' element={<Assessment />} />
          <Route path='/candidate' element={<Candidate />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    
       </>
  );
}

export default App;

//These routes will be rendered only if the user is authenticated.