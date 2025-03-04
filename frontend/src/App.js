import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddShops from './Pages/AddShops';
import Dashboard from './Pages/Dashboard';


import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateShops from './Pages/UpdateShops';
import Profile from './Pages/Profile';
import Marketplace from './Pages/Marketplace/Marketplace';
import Cart from './Pages/Marketplace/Cart';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/addshops" element={<AddShops/>} />
        <Route path="/addshops" element={<AddShops/>} />
        <Route path="/UpdateShops/:id" element={<UpdateShops/>} />
        <Route path="/profile/:id" element={<Profile />} />


        <Route path="/marketplace" element={<Marketplace />}/>
        <Route path="/cart" element={<Cart />} />
    
      
     
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
