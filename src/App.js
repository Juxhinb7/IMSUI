import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation} from 'react-router-dom';
import useToken from './components/useToken';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Dashboard } from './components/Dashboard';
import "./styles/Main.css"
import { Sidebar } from './components/Sidebar';
import { Products } from './components/Products';
import { Vendors } from './components/Vendors';
import { Purchases } from './components/Purchases';
import { Customers } from './components/Customers';
import { Sales } from './components/Sales';
import { useState } from 'react';
function App() {

  const {token, removeToken, setToken} = useToken();
  const location = useLocation();
  return (
    <div>
    {!token && token !== "" && token !== undefined ? (
    <Routes>
      <Route exact path="/" element={<Login setToken={setToken}/>}></Route>
      <Route path="/products" element={<Login setToken={setToken}/>}></Route>
      <Route path="/vendors" element={<Login  setToken={setToken}/>}></Route>
      <Route path="/purchases" element={<Login setToken={setToken}/>}></Route>
      <Route path="/customers" element={<Login setToken={setToken} />}></Route>
      <Route path="/sales" element={<Login setToken={setToken}/>}></Route>
      <Route path = "/sign-up" element={<SignUp />}></Route>
    </Routes> 
    ): (
      <div id="container">
      
      <Sidebar location={location} removeToken={removeToken}/>
      
      <div id="mainContent">
      <Routes>
        <Route exact path="/" element={<Dashboard token={token} setToken={setToken} />}></Route>
        <Route path = "/products" element={<Products token={token} setToken={setToken}/>}></Route>
        <Route path = "/vendors" element={<Vendors token={token} setToken={setToken}/>}></Route>
        <Route path = "/purchases" element={<Purchases token={token} setToken={setToken}/>}></Route>
        <Route path = "/customers" element={<Customers token={token} setToken={setToken}/>}></Route>
        <Route path = "/sales" element={<Sales token={token} setToken={setToken}/>}></Route>
      </Routes>
      </div>

      </div>
    ) }
      
      
  
      
    </div>
  );
}

export default App;
