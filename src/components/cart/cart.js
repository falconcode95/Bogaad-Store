import'./cart.css';
import Nav from '../Nav/nav';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { deleteCart, incrimentAmount, decrimentAmount } from '../store/cart';
import {useEffect} from 'react';

function Cart() {
    const { cartProducts } = useSelector(state => state.cart);
    console.log(cartProducts);
    const dispatch = useDispatch();
    const removeItem = (e)=> {
        const id = parseInt(e.target.getAttribute('data-id'));
        console.log(id)
        dispatch(deleteCart(id));
    }
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
  return (
    <div className='cart-page'>
        <Nav />
        <div className='shopping-cart'>
                {cartProducts.map((item, index)=> {
                    return (
                        <div className='cart-products-div'>
                            <div className='cart-product'>
                                <img src={`http://localhost:5000/products/${cartProducts[index].name}/${cartProducts[index].id}`} alt=""/>  
                                <div className='product-details'>
                                    <p><strong>Product:</strong> {cartProducts[index].type}</p>
                                    <p><strong>Type:</strong> {cartProducts[index].subType} </p>
                                    <p><strong>Size:</strong> {cartProducts[index].size}</p>
                                    {/* <p><strong>Price:</strong>  $ {index+1}.00 </p> */}
                                </div>
                            </div>
                            <div className='buy-details'>
                                <div className='cart-add-delete'>
                                    <h3 className='clickable' data-id={index} onClick={decrement}>-</h3>
                                    <h3 className='cart-number'>{cartProducts[index].amount} </h3>
                                    <h3 className='clickable' data-id={index} onClick={increment}>+</h3>
                                    {/* <img src={require('../../Projects Images/close.png')} alt="" className='close'/> */}
                                </div>
                                <h2>$ {cartProducts[index].price * cartProducts[index].amount}.00</h2>
                            </div>
                            <h4 className='cancel clickable' data-id={index} onClick={removeItem}>Remove Item</h4>
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
                    <p>$ {subtotal}</p>
                    <p>$ 5</p>
                    <p>$ {subtotal <= 5 ? 0 : 5}</p>
                    <p className='total-title'>$ {subtotal <= 5 ? subtotal+5 : subtotal}</p>
                </div>
            </div>
            <button>Checkout</button>
            <Link to='/Shop'><button>Continue Shopping</button></Link> 
        </div>
        <Footer />
    </div>
  );
}

export default Cart;