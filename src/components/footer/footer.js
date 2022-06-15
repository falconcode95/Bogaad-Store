import'./footer.css';
import { useRef, useEffect, useState } from 'react';
import { toggleFooterIntersection } from "../store/secondPageSlice"; 
import { changeActiveSection, signedIn } from '../store/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Footer() {
    const aboutUs = useRef();
    const navigate = useNavigate()
    const {signedIn} = useSelector(state => state.account);
    const [subscribtion, setSubscription] = useState(false);
    const {activePage} = useSelector(state => state.shop);
    const [subscribtionEmail, setSubscriptionEmail] = useState();
    const {footerIntersecting} = useSelector((state)=> state.shop);
    const dispatch = useDispatch();
    const footer = useRef()
    const screen = window.screen.width;
    const observer = new IntersectionObserver((enteries)=> {
        if(enteries[0].isIntersecting){
            dispatch(toggleFooterIntersection(true));
        } else {
            dispatch(toggleFooterIntersection(false));
        }
    });
    const footerPadding = useRef();
    useEffect(()=> {
        observer.observe(footer.current);
    });
    const scroll = (e)=> {
        if(signedIn){        
            window.scrollTo(-200, 0);
            if(e.target.innerHTML === 'My Account'){
                dispatch(changeActiveSection('account'))
            } else if(e.target.innerHTML === 'My Wishlist'){
                dispatch(changeActiveSection('wishlist'));
            }
        }
        else if(e.target.innerHTML === 'My Cart') {
            window.scrollTo(-200, 0);
            navigate('/Cart')
        } else {
            alert('Please log in to see account details')
        }
    }
    const subsEmail = (e)=> {
        setSubscriptionEmail(e.target.value)
    }
    const changeSubscription = (e)=> {
        if(subscribtionEmail){
          if(e.target.innerHTML === 'OKAY'){
            setSubscription(false);
            setSubscriptionEmail('')
          } else {
            setSubscription(true);
          }
      }
    }
    useEffect(()=> {
        console.log(activePage)
        if(activePage !== 'SHOP' && screen < 769){
            console.log('working!')
            footerPadding.current.style.paddingInline = '1em';
        } else if(activePage === 'SHOP' && screen < 769){
            footerPadding.current.style.paddingInline = '3em 1em';
        }
    })
  return (
    <div className='Footer'>
        <div className='newsletter'>
            {subscribtion ? 
             <div>
                 <h3>Thanks for Subscribing, we will keep you updated of any new products!</h3>
                 <button onClick={changeSubscription}>OKAY</button>
             </div> :
             <div>
                <h1>Dont Miss any New Products!</h1>
                <input type="email" placeholder='Enter Your E-mail Address' onChange={subsEmail} value={subscribtionEmail}></input>
                <button onClick={changeSubscription}>Sign Up for Newsletter</button>
             </div>
            }
        </div>
        <div className='footer' ref={footerPadding}>
            <div>
                <h3 >Usefull Links</h3>
                <div className='footer-details'>
                    <h5 className='links'>FAQ</h5>
                    <h5 className='links'>Terms of Use</h5>
                    <h5 className='links'>Track Order</h5>
                    <h5 className='links'>Shipping</h5>
                    <h5 className='links'>Cancelation</h5>
                    <h5 className='links'>Returns</h5>
                </div>
            </div>
            <div>
                <Link to={signedIn ? "/account" : ""}><h3 onClick={scroll}>Account</h3></Link>
                <div className='footer-details'>
                    <Link to={signedIn ? "/account" : ""}><h5  ref={footer} onClick={scroll} className='links'>My Account</h5></Link>
                    <h5 onClick={scroll} className='links'>My Cart</h5>
                    <Link to={signedIn ? "/account" : ""}><h5 onClick={scroll} className='links'>My Wishlist</h5> </Link>
                </div>
            </div>
            <div className='about-us' ref={aboutUs}>
                <h3>About Us</h3>  
                <p>Bogaad is a World-renowned E-Commerce Site that offers both Quality and Stylish clothes.
                    Bogaad is the birth-child of a couple of hardworking guys that are committed to serving the people.
                    We are not going to be happy untill you are confident in the clothes you wear, After all 
                    "Clothes make the man!"
                </p>
            </div>
            <div>
                <h3>Contact Us</h3>  
                <h5>Address</h5>
                <p>2548 Bogaad Avenue, New Mars City MC 4783, MARS</p>
                <h5>Phone</h5>
                <p>+1234 2345 7885; +1234 2345 7886</p>
                <div className='bogaad-email'>
                    <h5>E-mail:</h5>
                    <p>bogaad@shop.com</p>
                </div>
            </div>
        </div>
        <footer>
            <p>© 2022 www.bogaad.com. All rights reserved.</p>
            <div className='payment'>
                <img src={require('../../Projects Images/stripe.png')} alt=""/>
                <img src={require('../../Projects Images/paypal.png')} alt=""/>
                <img src={require('../../Projects Images/visa.png')} alt=""/>
                <img src={require('../../Projects Images/MasterCard_Logo_svg.png')} alt=""/>
            </div>
        </footer>
    </div>
  );
}

export default Footer; 