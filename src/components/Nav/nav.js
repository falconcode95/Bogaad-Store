import'./nav.css';
import { Link } from 'react-router-dom';
import { changeAboutUsActive } from '../store/secondPageSlice';
import { useSelector, useDispatch } from 'react-redux';
import {useRef, useEffect, useState} from 'react';

function Nav() {
  const dispatch = useDispatch();
  const {cartProducts} = useSelector(state => state.cart);
  const {signedIn} = useSelector(state => state.account);
  const {name} = useSelector(state => state.account.user);
  const {activePage} = useSelector( state => state.shop);
  const [screen, setScreen] = useState(); 
  const burgerDetails = useRef(); 
  const close = useRef(); 
  const nav = useRef();
  const bag = useRef();
  const burgerMenu = useRef();
  window.addEventListener('resize', ()=> {
    setScreen(window.screen.width);
  });
  useEffect(()=> {
    setScreen(window.screen.width);
  })
  const changeAboutUsState = (e)=> {
    if(e.target.innerHTML === 'HOME'){
      dispatch(changeAboutUsActive(false))
    } else if(e.target.innerHTML === 'ABOUT US') {
      activePage === 'HOME' ?
        dispatch(changeAboutUsActive(true)) :
        window.scrollTo(0,3000);
      }
   }
   const burger = (e)=> {
    const element = e.target.getAttribute('data-id');
    if(element === 'burger'){
      burgerDetails.current.style.display = 'block';
      burgerMenu.current.style.display = 'none';
      close.current.style.display = 'block'
    } else {
      burgerDetails.current.style.display = 'none';
      burgerMenu.current.style.display = 'block';
      close.current.style.display = 'none' 
    }
   }
   useEffect(()=>{
    if(screen < 769){ 
      if(activePage !== 'HOME'){
        nav.current.style.color = 'black';
        bag.current.style.filter = 'invert(98%) sepia(3%) saturate(72%) hue-rotate(268deg) brightness(117%) contrast(100%)';
        burgerMenu.current.style.filter = 'invert(98%) sepia(3%) saturate(72%) hue-rotate(268deg) brightness(117%) contrast(100%)';
      } else if(activePage === 'HOME'){
        nav.current.style.color = 'white';
      }
    } else {
      nav.current.style.color = 'black';
    }
  }, [screen])
  return (
    <nav className={activePage === 'HOME' ? '' : 'nav-background'} ref={nav}>
      <h3>Bogaad Store</h3>

      {/* mobile version */}

      <Link to="/Cart"> 
        <div className='bagmobile'>
            <img src={require('../../Projects Images/shopping-bag-mobile.png')} alt="" ref={bag} />
            {cartProducts.length > 0 && <h6>{cartProducts.length}</h6>}
        </div>
      </Link>
      <img src={require('../../Projects Images/menu.png')} alt="" className='burger' onClick={burger} data-id="burger" ref={burgerMenu}/>
      <img src={require('../../Projects Images/close.png')} alt="" className='burger close' onClick={burger} 
        data-id="close" ref={close}/>
      <div className='burger-details' ref={burgerDetails}>
        <Link to="/"><h4 onClick={changeAboutUsState}>HOME</h4></Link>
        <Link to=""><h4 onClick={changeAboutUsState}>ABOUT US</h4></Link>
        <Link to="/Shop"><h4>SHOP</h4></Link>
        {!signedIn &&  <Link to="/login"><h4>LOG IN</h4></Link>}
        {/* <Link to="/login"><h4>{!signedIn ? '' : 'LOG IN'}</h4></Link> */}
        <Link to={signedIn ? "/account" : ""}><h4>ACCOUNT</h4></Link>
      </div>

        {/* desktop/tablet version */}
        
      <div className='nav-links'>
        <Link to="/"><h4 onClick={changeAboutUsState}>HOME</h4></Link>
        <Link to=""><h4 onClick={changeAboutUsState}>ABOUT US</h4></Link>
        <Link to="/Shop"><h4>SHOP</h4></Link>
        <Link to="/login"><h4>{signedIn ? '' : 'LOG IN'}</h4></Link>
      </div>
      <div className='cart'>
        <p className='user-name'>{name && `Hi, ${name}`}</p>
        <Link to="/Cart">
          <div className='bag'>
            <img src={require('../../Projects Images/shopping-bag.png')} alt=""/>
            {cartProducts.length > 0 && <h6>{cartProducts.length}</h6>}
          </div>
        </Link>
        <Link to={signedIn ? "/account" : ""}><img src={require('../../Projects Images/user.png')} alt=""/></Link>
      </div>
  </nav>
  );
}

export default Nav;