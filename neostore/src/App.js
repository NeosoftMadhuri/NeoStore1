import './App.css';
import React,{Suspense, lazy} from 'react';
import {BrowserRouter as Router,Link,Route,Routes} from 'react-router-dom'
import Navs from './Components/Navs/Navs';
import Footer from './Components/Footer/Footer';
import ServerError from './Components/ServerError';
const Login =lazy(()=>import('./Components/Login/Login')) ;
const Register =lazy(()=>import('./Components/Register/Register')) ;
const RecoverPass =lazy(()=>import( './Components/Register/RecoverPass'));
const ChnagePass =lazy(()=>import('./Components/Profile/ChnagePass')) ;
const Profile =lazy(()=>import('./Components/Profile/Profile')) ;
const Address =lazy(()=>import('./Components/Address/Address')) ;
const Address_page =lazy(()=>import('./Components/Address/Address_page')) ;
const Product =lazy(()=>import ('./Components/Product/Product'));
const ProductDetails =lazy(()=>import('./Components/Productetails/ProductDetails')) ;
const Dashboard =lazy(()=>import('./Components/Dashboard/Dashboard')) ;
const Cart =lazy(()=>import('./Components/Cart/Cart'));
const Checkout =lazy(()=>import('./Components/Checkout/Checkout')) ;
const Order =lazy(()=>import('./Components/Order/Order'));
const Successful =lazy(()=>import('./Components/Checkout/Successful'));
const Thanks =lazy(()=>import('./Components/Thanks'))


function App() {
  return (
    <>
   
    <Router>
    <Suspense fallback={<div ><img src='Images/Loading.jpg' width="100%" height="800px"/></div>}>
      <Navs/>
         <Routes>
           
         <Route path="/" exact element={<Dashboard/>}/>
          <Route path="/login" exact element={<Login/>}/>
           <Route path="/footer" element={<Footer/>}/>
            <Route path="/register" exact element={<Register/>}/>
            <Route path="/recoverpass" exact element={<RecoverPass/>}/>
            <Route path="/dashboard" exact element={<Dashboard/>}/>
            <Route path="/profile" exact element={<Profile/>}/>
            <Route path="/address" exact element={<Address/>}/>
            <Route path="/chnagepass" exact element={<ChnagePass/>}/>
            <Route path="/product" exact element={<Product/>}/>
           <Route path="/productdetails" exact element={<ProductDetails/>}/>
           <Route path="/cart" exact element={<Cart/>}/>
           <Route path="/add" exact element={<Address_page/>}/>
           <Route path="/checkout" exact element={<Checkout/>}/>
           <Route path="/order" exact element={<Order/>}/>
           <Route path="/successful" exact element={<Successful/>}/>
           <Route path="/thanks" exact element={<Thanks/>}/>
           <Route path="/ServerError" exact element={<ServerError/>}/>
         </Routes>
         </Suspense>
    </Router>
    </>
     
  );
}

export default App;
