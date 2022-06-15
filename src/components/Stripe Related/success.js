import'./sharedcss.css';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {changeSignedInState, updateUser, overideWishList} from '../store/accountSlice';
import {overideCart} from '../store/cart';

function Success() {
    const {name} = useSelector(state => state.account.user);
    const dispatch = useDispatch();
    useEffect(()=> {
        const tokenlogin = async()=> {
            if(localStorage.getItem('jwt')){
                const token = localStorage.getItem('jwt');
                const sentData = await fetch('http://localhost:5000/shortcut/',
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
    <div className='Success'>
        <h3>Thank You for Shopping with us, {name}! </h3>
        <p>Your Order is being Processed</p>
        <Link to="/Shop"><button>Continue Shopping</button></Link>
    </div>
  );
}

export default Success;