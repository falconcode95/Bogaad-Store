import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App'
import Shop from './components/shop/shop';
import store from './components/store/store';
import Preview from './components/preview/preview';
import Cart from './components/cart/cart';
import Login from './components/login-signup/login-signup';
import Account from './components/account/account';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from './components/Stripe Related/loading';
import Success from './components/Stripe Related/success';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element = {<App />}/>
            <Route path="/Shop" element = { <Shop />}/>
            <Route path="/Preview" element = { <Preview />}/>
            <Route path="/Cart" element = { <Cart />}/>
            <Route path="/Login" element = {<Login />} />
            <Route path="/account" element = {<Account />} />
            <Route path="/loading" element = {<Loading />} />
            <Route path="/success" element = {<Success />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      
);
