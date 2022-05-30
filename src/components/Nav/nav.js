import'./nav.css';
import { Link } from 'react-router-dom';
import { toggleNBackground, toggleNavBG, changeActivePage } from '../store/secondPageSlice';
import { useSelector, useDispatch } from 'react-redux';

function Nav() {
  const dispatch = useDispatch();
  const {activePage} = useSelector(state => state.shop);
  const {cartProducts} = useSelector(state => state.cart);
  const {toggleNavBackground} = useSelector(state => state.shop);
  const {signedIn} = useSelector(state => state.account);
  const {name} = useSelector(state => state.account.user)
  const changeToggeNBG = (e)=> {
    if(toggleNavBG(e) === 'ABOUT US'){
      window.scrollTo(0, 3000);
      dispatch(changeActivePage('home'))
    } else {
      dispatch(toggleNBackground(toggleNavBG(e) === 'HOME' ? false : true));
      dispatch(changeActivePage(''));
    }
  }
  return (
    <nav className={toggleNavBackground ? 'nav-background' : ''} >
      <h3>Bogaad Store</h3>
      <div className='nav-links'>
        <Link to="/"><h4 onClick={changeToggeNBG}>HOME</h4></Link>
        <Link to=""><h4 onClick={changeToggeNBG}>ABOUT US</h4></Link>
        <Link to="/Shop"><h4 onClick={changeToggeNBG}>SHOP</h4></Link>
        <Link to="/login"><h4>{signedIn ? '' : 'LOG IN'}</h4></Link>
      </div>
      <div className='cart'>
        <p>{name && `Hi, ${name}`}</p>
        <Link to="/Cart">
          <div className='bag' onClick={changeToggeNBG}>
            <img src={require('../../Projects Images/shopping-bag.png')} alt="" />
            {cartProducts.length > 0 && <h6>{cartProducts.length}</h6>}
          </div>
        </Link>
        <Link to="/account"><img src={require('../../Projects Images/user.png')} alt="" /></Link>
      </div>
  </nav>
  );
}

export default Nav;