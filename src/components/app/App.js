import'./App.css';
import Nav from '../Nav/nav';
import { toggleNBackground, toggleNavBG } from '../store/secondPageSlice';
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';

function App() {
  const { activePage } = useSelector((state)=> state.shop);
  const dispatch = useDispatch();
  const changeToggeNBG = (e)=> {
    dispatch(toggleNBackground(toggleNavBG(e) === 'HOME' ? false : true));
  }
  let item = localStorage.getItem('cartProducts')
  console.log(JSON.parse(item));
  return (
    <div className={activePage ? 'App different-BG' : 'App'}>
      <Nav />
      <div className='landing-page-text'>
        { activePage && <p className='about-us-paragraph'>" Bogaad is a World-renowned E-Commerce Site that offers both Quality and Stylish clothes.
                    Bogaad is the birth-child of a couple of hardworking guys that are committed to serving the people.
                    We are not going to be happy untill you are confident in the clothes you wear, After all 
                    "Clothes make the man!" " - Founder XXX
                </p>
        }
        {!activePage && <h3>Summer in Style</h3> }
        {!activePage && <h1>NEW COLLECTION</h1>}
        {!activePage && <h5>You are what you wear!</h5>}
        {!activePage && <Link to='/Shop'><button onClick={changeToggeNBG}>Shop Now</button></Link>}
      </div>
    </div>
  );
}

export default App;
