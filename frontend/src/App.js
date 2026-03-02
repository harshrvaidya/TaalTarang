import React from 'react';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from './Store';
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
import BeatClassifier from './Pages/BeatClassifier';
import AdminLayout from './Layout/AdminLayout';
import OrderManagement from './Pages/Admin/OrderMangement';
import UserManagement from './Pages/Admin/UserMangement';
import ProductManagement from './Pages/Admin/ProductMangement/ProductMangement';
import AddProductAdmin from './Pages/Admin/ProductMangement/AddProductAdmin';
import EditUser from './Pages/Admin/EditUser';
import EditProduct from './Pages/Admin/ProductMangement/EditProduct';
import MainShopmangement from './Pages/Admin/ShopMangement/MainShopmangement';
import Editshop from './Pages/Admin/ShopMangement/Editshop';
import PaymentHistory from './Pages/Marketplace/PaymentHistory';
import OrderHistory from './Pages/Marketplace/PaymentHistory';
import AddToFav from './Pages/AddtoFav';
import AdminAddShop from './Pages/Admin/ShopMangement/AdminAddShop';
import Cancel from './Pages/Marketplace/Cancel';
const googleapi = process.env.REACT_APP_GOOGLE_API_KEY;

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadScript
          libraries={['places']}
          googleMapsApiKey={googleapi}
          loadingElement={<div>Loading...</div>}
        >
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shop/:id" element={<ShopDetail />} />
              <Route path="/addshops" element={<AddShops />} />
              <Route path="/UpdateShops/:id" element={<UpdateShops />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/Beatclassify" element={<BeatClassifier />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment-history" element={<PaymentHistory />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/favorites" element={<AddToFav />} />
              {/* admin pages */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Welcome />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="products/add" element={<AddProductAdmin />} />
                <Route path="products/edit/:id" element={<EditProduct />} />
                <Route path="Edituser/:id" element={<EditUser />} />
                <Route path="ShopManagement" element={<MainShopmangement />} />
                <Route path="shops/edit/:id" element={<Editshop />} />
                <Route path="shops/add" element={<AdminAddShop/>} /> {/* Add Shop Route */}
              </Route>
            </Routes>
          </Router>
        </LoadScript>
      </PersistGate>
    </Provider>
  );
}

export default App;