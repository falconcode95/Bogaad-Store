import'./cart.css';
import Nav from '../Nav/nav';
import Footer from '../footer/footer';
import { Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { deleteCart, incrimentAmount, decrimentAmount, overideCart } from '../store/cart';
import { changeSignedInState, updateUser, overideWishList } from '../store/accountSlice';
import { changeActivePage } from '../store/secondPageSlice';
import {useEffect} from 'react';

function Cart() {
    const { cartProducts } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const {wishList} = useSelector( state => state.account);
    const {email} = useSelector( state => state.account.user);
    const {signedIn} = useSelector(state => state.account);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(changeActivePage('CART'))
      }, [])
    const removeItem = (e)=> {
        const id = parseInt(e.target.getAttribute('data-id'));
        console.log(id)
        dispatch(deleteCart(id));
    }
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
    useEffect(()=> {
        window.scrollTo(-200, 0)
    }, [])
    // console.log(cartProducts);
    const increment = (e)=> {
        const id = parseInt(e.target.getAttribute('data-id'));
        dispatch(incrimentAmount(id));
    }
    const decrement = (e)=> {
        const id = parseInt(e.target.getAttribute('data-id'));
        dispatch(decrimentAmount(id));
    }
    const productPrice = cartProducts.map((item, index)=> item.price * item.amount);
    const subtotal = productPrice.reduce((prev, current)=> prev + current, 0);
    useEffect(()=> {
        const saveData = async()=> {
            if(cartProducts.length || wishList.length){
                let jsonCart = {};
                let jsonWishList = {};
                const data = {jsonCart: jsonCart,
                jsonWishList: jsonWishList,
                email: email};
                console.log(data)
                if(cartProducts.length){
                    let index = [];
                    for(let i=0; i < cartProducts.length; i++){
                        index.push(i);
                    }
                    for(let i=0; i < cartProducts.length; i++){
                        jsonCart[index[i]] = cartProducts[i];
                    }
                    // console.log(JSON.stringify(jsonCart)+ 'cartlist');
                }
                if(wishList.length){
                    let index = [];
                    for(let i=0; i < wishList.length; i++){
                        index.push(i);
                    }
                    for(let i=0; i < wishList.length; i++){
                        jsonWishList[index[i]] = wishList[i];
                    }
                    // console.log(JSON.stringify(jsonWishList)+ 'wishlist');
                }
                const sentData = await fetch('http://localhost:5000/userdata/',
                {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(data)
                }
                );
                if(sentData.ok){
                    const response = await sentData.json();
                    console.log(response)
                }
            }
        }
        saveData()
    }, [cartProducts, wishList])
    const Checkout = async ()=> {
      if(signedIn && cartProducts.length !== 0){  
        navigate('/loading');      
        let items = []
        for(let x in cartProducts){
            let item = {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: cartProducts[x].type,
                        description: cartProducts[x].subType,
                        images: [`http://localhost:5000/products/${cartProducts[x].name}/${cartProducts[x].id}`]
                    },
                    unit_amount: cartProducts[x].price * 100
                },
                quantity: cartProducts[x].amount
            }
            items.push(item)
        }
        // console.log(items)
        const sentData = await fetch('http://localhost:5000/payment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(items)
        }
        )
        if(sentData.ok){
            const response = await sentData.json();
            window.location = response.url
        }
      } else {
          alert('Please log in to Checkout')
      }
    }
  return ( 
    <div className='cart-page'>
        <Nav />
        <div className='shopping-cart'>
            {cartProducts.length === 0 && <h3 className='filler'>There are No items in the Cart!</h3> }
                {cartProducts.map((item, index)=> {
                    return (
                        <div className='Cart-item'>
                            <img src={`http://localhost:5000/products/${cartProducts[index].name}/${cartProducts[index].id}`} alt="" className='product-mobile'/>   {/*This image is for mobiles!!*/}
                            <div className='cart-products-div'> 
                                <div className='cart-product'>
                                    <img src={`http://localhost:5000/products/${cartProducts[index].name}/${cartProducts[index].id}`} alt=""/>  
                                    <div className='product-details'>
                                        <p><strong>Product:</strong> {cartProducts[index].type}</p>
                                        <p><strong>Type:</strong> {cartProducts[index].subType} </p>
                                        <p><strong>Size:</strong> {cartProducts[index].size}</p>
                                    </div>
                                </div>
                                <div className='buy-details'>
                                    <div className='cart-add-delete'>
                                        <h3 className='clickable' data-id={index} onClick={decrement}>-</h3>
                                        <h3 className='cart-number'>{cartProducts[index].amount} </h3>
                                        <h3 className='clickable' data-id={index} onClick={increment}>+</h3>
                                    </div>
                                    <h2>$ {cartProducts[index].price * cartProducts[index].amount}.00</h2>
                                </div>
                                <h4 className='cancel clickable' data-id={index} onClick={removeItem}>Remove Item</h4>
                            </div>
                        </div>
                    )
                })}
        </div>
        <div className='order'>
            <p className='order-title'>ORDER SUMMARY</p>
            <div className='subtotal'>
                <div>
                    <p>Subtotal</p>
                    <p>Estimated Shipping</p>
                    <p>Active Discount</p>
                    <p className='total-title'>Total</p>
                </div>
                <div >
                    <p>$ {subtotal}.00</p>
                    <p>$ -</p>
                    <p>$ -</p>
                    <p className='total-title'>$ {subtotal}.00</p>
                </div>
            </div>
            <button onClick={Checkout}>Checkout</button>
            <Link to='/Shop'><button>Continue Shopping</button></Link> 
        </div>
        <Footer />
    </div>
  );
}

export default Cart;