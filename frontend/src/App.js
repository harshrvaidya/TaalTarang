import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddShops from './Pages/AddShops';
import Dashboard from './Pages/Dashboard';
import { LoadScript } from '@react-google-maps/api';

import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateShops from './Pages/UpdateShops';
import Profile from './Pages/Profile';
import Marketplace from './Pages/Marketplace/Marketplace';
import Cart from './Pages/Marketplace/Cart';
import Welcome from './Pages/Admin/Welcome';
import ShopDetail from './Pages/ShopDetail';
import Success from './Pages/Marketplace/Success';
// import Layout from './Components/DashboardLayout';
import BeatClassifier from './Pages/BeatClassifier';
import AdminLayout from './Layout/AdminLayout';
import OrderManagement from './Pages/Admin/OrderMangement';
import UserManagement from './Pages/Admin/UserMangement';
import ProductManagement from './Pages/Admin/ProductMangement/ProductMangement';
import AddProductAdmin from './Pages/Admin/ProductMangement/AddProductAdmin';
import EditUser from './Pages/Admin/EditUser';
const googleapi=process.env.REACT_APP_GOOGLE_API_KEY;

function App() {
  return (
    <LoadScript 
    libraries={["places"]}
    googleMapsApiKey={googleapi}
    loadingElement={<div>Loading...</div>}
  >
    
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/shop/:id" element={<ShopDetail />} /> 
        <Route path="/addshops" element={<AddShops/>} />
        <Route path="/addshops" element={<AddShops/>} />
        <Route path="/UpdateShops/:id" element={<UpdateShops/>} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/Beatclassify" element={<BeatClassifier />} />




        <Route path="/marketplace" element={<Marketplace />}/>
        <Route path="/success" element={<Success />} />
        <Route path="/cart" element={<Cart />} />
        
    {/* admin pages */}
    <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Welcome />} /> {/* Default admin page */}
          <Route path="orders" element={<OrderManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="Edituser/:id" element={< EditUser />} />
          <Route path="products/add" element={< AddProductAdmin />} />
        </Route>
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
    </LoadScript>
  );
}

export default App;