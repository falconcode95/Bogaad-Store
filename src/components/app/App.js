import'./App.css';
import Nav from '../Nav/nav';
import { changeActivePage } from '../store/secondPageSlice';
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from 'react';
import { changeSignedInState, updateUser, overideWishList } from '../store/accountSlice';
import { overideCart } from '../store/cart';
import { Link } from 'react-router-dom';

function App() {
  const { activePage } = useSelector((state)=> state.shop); 
  const {aboutUsActive} = useSelector(state => state.shop);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(changeActivePage('HOME'))
    const tokenlogin = async()=> {
        if(localStorage.getItem('jwt')){
            const token = localStorage.getItem('jwt');
            const sentData = await fetch('https://bogaad-store.herokuapp.com/shortcut/',
            {
                method: 'GET',
                headers: {
                    accessToken: `Bearer ${token}`
                }
            }
            );
            if(sentData.ok){
                const response = await sentData.json();
                let cart = [];
                let wishList = [];
                for(let x in response.jsonCart){
                    cart.push(response.jsonCart[x])
                }
                for(let x in response.jsonWishList){
                    wishList.push(response.jsonWishList[x])
                }
                console.log(wishList, 'from server');
                dispatch(changeSignedInState(true));
                dispatch(updateUser(response));
                dispatch(overideCart(cart))
                dispatch(overideWishList(wishList))
            }
        }
    }
    tokenlogin()
}, [])
  return (
    <div 
    className={activePage === 'HOME' && aboutUsActive ? 'App different-BG' : 'App'}
    >
      <Nav />
      <div className='landing-page-text'>
        { (activePage === 'HOME' && aboutUsActive) && <p className='about-us-paragraph'>" Bogaad is a World-renowned E-Commerce Site that offers both Quality and Stylish clothes.
                    Bogaad is the birth-child of a couple of hardworking guys that are committed to serving the people.
                    We are not going to be happy untill you are confident in the clothes you wear, After all 
                    "Clothes make the man!" " - Founder XXX
                </p>
        }
        {!aboutUsActive && <h3>Summer in Style</h3> }
        {!aboutUsActive && <h1>NEW COLLECTION</h1>}
        {!aboutUsActive && <h5>You are what you wear!</h5>}
        {!aboutUsActive && <Link to='/Shop'><button>Shop Now</button></Link>}
      </div>
    </div>
  );
}

export default App;
