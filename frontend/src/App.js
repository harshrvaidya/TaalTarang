import './App.css';
import AddShops from './Pages/AddShops';
import Dashboard from './Pages/Dashboard';


import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/addshops" element={<AddShops/>} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
