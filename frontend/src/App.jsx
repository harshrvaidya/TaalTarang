import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import AddShops from './Pages/AddShops';
import Signup from './Pages/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="addshops" element={<AddShops />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
