import'./footer.css';
import { useRef, useEffect } from 'react';
import { toggleFooterIntersection } from "../store/secondPageSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Footer(props) {
    const aboutUs = useRef();
    const {footerIntersecting} = useSelector((state)=> state.shop);
    const dispatch = useDispatch();
    const observer = new IntersectionObserver((enteries)=> {
        if(enteries[0].isIntersecting){
            dispatch(toggleFooterIntersection(true));
        } else {
            dispatch(toggleFooterIntersection(false));
        }
    });
    const footer = useRef();
    useEffect(()=> {
        observer.observe(footer.current);
    });
  return (
    <div>
        <div className='newsletter'>
            <h1>Dont Miss any New Products!</h1>
            <input type="text" placeholder='Enter Your E-mail Address'></input>
            <button>Sign Up for Newsletter</button>
        </div>
        <div className='footer'>
            <div>
                <h3 >Usefull Links</h3>
                <h5 className='links'>FAQ</h5>
                <h5 className='links'>Terms of Use</h5>
                <h5 className='links'>Track Order</h5>
                <h5 className='links'>Shipping</h5>
                <h5 className='links'>Cancelation</h5>
                <h5 className='links'>Returns</h5>
            </div>
            <div>
                <Link to="/account"><h3>Account</h3></Link>
                <h5  ref={footer} className='links'>My Account</h5>
                <h5 className='links'>My Cart</h5>
                <h5 className='links'>My Wishlist</h5> 
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