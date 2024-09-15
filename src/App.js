import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, TextField } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from 'axios';

// Import pages (Login, Signup, Products, AddProduct, etc.)
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check login status (you may want to store the token in localStorage)
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setLoggedIn(true);
      setIsAdmin(user.role === 'admin');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    setIsAdmin(false);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://dev-project-ecommerce.upgrad.dev/api/products`, {
        params: { search: searchTerm },
      });
      console.log('Search Results:', response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <Router>
      <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <ShoppingCartIcon />
          </IconButton>
          <Button color="inherit" component={Link} to="/">Home</Button>

          {loggedIn ? (
            <>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                style={{ backgroundColor: '#fff', marginLeft: '20px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
              {isAdmin && <Button color="inherit" component={Link} to="/add-product">Add Products</Button>}
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={loggedIn ? <ProductsPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products" element={loggedIn ? <ProductsPage /> : <Navigate to="/login" />} />
        <Route path="/products/:id" element={loggedIn ? <ProductDetailsPage /> : <Navigate to="/login" />} />
        {isAdmin && <Route path="/add-product" element={<AddProductPage />} />}
      </Routes>
    </Router>
  );
};

export default App;
