import './App.css';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
