import'./account.css';
import Nav from '../Nav/nav';
import Footer from '../footer/footer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {updateSomeUser, updateUser, changeSignedInState, removeFromWishList} from '../store/accountSlice';
import { changePreview } from '../store/cart';
import {Link} from 'react-router-dom';
import data from '../../Data and Functions/data';
import {randos} from '../../Data and Functions/functions';
import {updateSimilar} from '../store/cart';


function Account() {
  const dispatch = useDispatch();
  const { email, name, surname} = useSelector(state => state.account.user);
  const {wishList} = useSelector(state => state.account);
  const {cartProducts} = useSelector( state => state.cart);
  const [activeFuture, setActiveFuture] = useState();
  const [password, setPassword] = useState();
  const [futureEmail, setFutureEmail] = useState({state: false, value: ''});
  const [futurePassword, setFuturePassword] = useState( {state: false, value: ''});
  const [retypeFuturePassword, setRetypeFuturePassword] = useState()
  const [futureName, setFutureName] = useState( {state: false, value: ''});
  const [futureSurname, setFutureSurname] = useState( {state: false, value: ''});
  const [changeActive, setChangeActive] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [activeSection, setActiveSection] = useState('account');
  const {accessories, accessoryType, shirts, shirtTypes, trousers, trouserTypes, shoes, shoeType} = data;
  const changeActiveState = async(e)=> {
    if(e.target.getAttribute('data-type')){
          if(futurePassword.state && retypeFuturePassword !== futurePassword.value){
            setPasswordWarning(true);
          } else { 
            
          const data = {
            email: email,
            password: password,
            key: activeFuture.name,
            value: activeFuture.value
          }
          console.log(data)
          const sentData = await fetch('http://localhost:5000/users/',
          {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
          }
          )
          if(sentData.ok){
            const response = await sentData.json();
            const info = [activeFuture.name, response ]
            dispatch(updateSomeUser(info))
            setChangeActive(false);
            setPassword('');
            setRetypeFuturePassword('');
            setPasswordWarning(false);
            if(activeFuture.name === 'email'){
              setFutureEmail({state: false, value: ''})
            } else if(activeFuture.name === 'name'){
              setFutureName({state: false, value: ''})
            } else if(activeFuture.name === 'surname'){
              setFutureSurname({state: false, value: ''})
            } else if(activeFuture.name === 'password'){
              setFuturePassword({state: false, value: ''})
            } 
          }
        }
    } else {
      setChangeActive(true)
      if(e.target.getAttribute('data-id') === 'email') {
        setFutureEmail({state: true, value: ''});
      } else if(e.target.getAttribute('data-id') === 'name') {
        setFutureName({state: true, value: ''})
      } else  if(e.target.getAttribute('data-id') === 'surname') {
        setFutureSurname({state: true, value: ''})
      } else  if(e.target.getAttribute('data-id') === 'password') {
        setFuturePassword({state: true, value: ''})
      }
    }
  }
  const updateInput = (e)=> {
    const target = e.target.getAttribute('data-id');
    if(target === 'email'){
      setFutureEmail({state: true, value: e.target.value});
      setActiveFuture({name: 'email', value: e.target.value})
    } else if(target === 'name'){
      setFutureName({state: true, value: e.target.value});
      setActiveFuture({name: 'name', value: e.target.value})
    } else if(target === 'surname'){
      setFutureSurname({state: true, value: e.target.value}); 
      setActiveFuture({name: 'surname', value: e.target.value}) 
    } else if(target === 'current-password'){
      setPassword(e.target.value);  
    } else if(target === 'new-password'){
      setFuturePassword({state: true, value: e.target.value}); 
      setActiveFuture({name: 'password', value: e.target.value}) 
    } 
    else {
      setRetypeFuturePassword(e.target.value);
    }
  }
  const changeSection = (e)=> {
    const element = e.target.innerHTML;
    if(element === 'Account'){
      setActiveSection('account')
    } else if(element === 'Wish List'){
      setActiveSection('wishlist')
    } else {
      setActiveSection('delete-account')
    }
  }
  const clearUser = async(e)=> {
    if(e.target.getAttribute('data-id')){
      const deleteUser = {email: email, password: password};
      const sentData = await fetch('http://localhost:5000/users/',
        {
          method: 'DELETE',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(deleteUser)
        }
        
      );
      if(sentData.ok){
        const clear = {email: '', name: '', surname: ''}
        dispatch(changeSignedInState(false));
        dispatch(updateUser(clear));
      }
    } else {
      const clear = {email: '', name: '', surname: ''}
      dispatch(changeSignedInState(false));
      dispatch(updateUser(clear));
    }
  }
  const removeFromWish = (e)=> {
    const type = e.target.getAttribute('data-id');
    dispatch(removeFromWishList(type))
  }
  const updatePreview = (e)=> {
    const index = parseInt(e.target.getAttribute('data-index'));
    const product = wishList[index];
    const finishedProduct = [product.id, product.name, product.type, product.subType, product.price];
    dispatch(changePreview(finishedProduct));
    const id = product.id;
    const type = product.name;
    let name;
    let subType;
    let similarProd = [];
    const randomNumbers = randos(id);
    // console.log(id, type, randomNumbers)
    for(let i=0; i < 4; i++){
        let product = [];
        product.push(randomNumbers[i]+1);
        product.push(type);
        if(type === 'shirts'){
            name= shirts[randomNumbers[i]];
            subType = shirtTypes[randomNumbers[i]]
        } else if(type === 'trousers'){
            name= trousers[randomNumbers[i]];
            subType = trouserTypes[randomNumbers[i]]
        } else if(type === 'shoes'){
            name= shoes[randomNumbers[i]];
            subType = shoeType[randomNumbers[i]]
        } else {
            name= accessories[randomNumbers[i]];
            subType = accessoryType[randomNumbers[i]]
        }
        product.push(name);
        product.push(subType);
        if(randomNumbers[i] === 0){
            product.push(randomNumbers[i]+1);
        } else {
            product.push(randomNumbers[i]);
        }
        similarProd.push(product);
    }
    dispatch(updateSimilar(similarProd));
  }
  useEffect(()=> {
    // console.log('it is working!')
    const saveData = async()=> {
        if(cartProducts.length || wishList.length){
            let jsonCart = {};
            let jsonWishList = {};
            const data = {jsonCart: jsonCart,
            jsonWishList: jsonWishList,
            email: email};
            // console.log(data)
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
                // console.log(response)
            }
        }
    }
    saveData()
}, [cartProducts, wishList])
  return (
    <div className='Account' >
        <Nav />
        <div className='account-details'>
            <div className='left-side'>
                <p onClick={changeSection}>Account</p>
                <p onClick={changeSection}>Wish List</p>
                <Link to="/"><p onClick={clearUser}>Sign Out</p></Link>
                <p onClick={changeSection}>Delete account</p>
            </div>
            <div className='right-side'>
              {activeSection === 'account' && 
              <div>
                {!changeActive ? 
                  <div className='details'>
                    <div>
                      <label>E-mail:</label>
                      <label>Name:</label>
                      <label>Surname:</label>
                      <label>Password:</label>
                    </div>
                    <div>
                      <input type="text" value={email} />
                      <input type="text" value={name} />
                      <input type="text" value={surname} />
                      <input type="text" value="***********" />
                    </div>
                    <div>
                      <label data-id="email" onClick={changeActiveState}>Change</label>
                      <label data-id="name" onClick={changeActiveState}>Change</label>
                      <label data-id="surname" onClick={changeActiveState}>Change</label>
                      <label data-id="password" onClick={changeActiveState}>Change</label>
                    </div>
                  </div> :
                <div >
                      <div className='change-details'>
                        <div>
                          {futureEmail.state && <label>New Email:</label>}
                          {futureName.state && <label>New Name:</label>}
                          {futureSurname.state && <label>New Surname:</label>}
                          {futurePassword.state && <label>New Password:</label>}
                          {futurePassword.state && <label>Retype Password:</label>} 
                          <lable>Current Password:</lable>
                        </div>
                        <div>
                            {futureEmail.state && <input type='text' onChange={updateInput} value={futureEmail.value} data-id='email'/> }
                            {futureName.state && <input type='text' onChange={updateInput} value={futureName.value} data-id='name'/> }
                            {futureSurname.state && <input type='text' onChange={updateInput} value={futureSurname.value} data-id='surname'/> }
                            {futurePassword.state && <input type="password" data-id='new-password'onChange={updateInput} value={futurePassword.value}/> }
                            {futurePassword.state && <input type="password" data-id='retype-new-password'onChange={updateInput} value={retypeFuturePassword}/> }
                            <input type="password" data-id='current-password' onChange={updateInput} value={password}/>
                        </div>
                      </div>
                      {passwordWarning && <p>Passwords do not match! try again</p>}
                      <button className='change-button' onClick={changeActiveState} data-type="button">Change</button>
                </div>
                }
              </div>
              }
              {activeSection === 'wishlist' &&
              <div className='wishlist'>
                {wishList.map((item, index)=> {
                  return (
                    <div data-id={item.type} data-type={item.id}>
                      <Link to="/Preview"><img src={`http://localhost:5000/products/${item.name}/${item.id}`} alt="" data-index={index} onClick={updatePreview}/></Link>
                     <Link to="/Preview"><h4 data-index={index} onClick={updatePreview}>{item.type}</h4></Link> 
                     <Link to="/Preview"><p data-index={index} onClick={updatePreview}>{item.subType}</p></Link> 
                     <Link to="/Preview"><p data-index={index} onClick={updatePreview}>$ {item.price}.00</p></Link> 
                      <h3 data-id={item.type} onClick={removeFromWish} className='remove-item'>Remove Item</h3>
                    </div>
                  )
                })}
              </div>
              }
              {activeSection === 'delete-account' &&
              <div className='delete-account'>
                <p>Are you sure you want to delete your account with us?</p>
                <div>
                  <label>password:</label>
                  <input type="password" data-id='current-password' onChange={updateInput}/>
                </div>
                <Link to="/"><button onClick={clearUser} data-id="delete">Delete Account</button></Link>
              </div>
              }
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default Account;