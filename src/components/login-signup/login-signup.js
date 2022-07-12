import'./login-signup.css';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { changeSignedInState, updateUser, overideWishList } from '../store/accountSlice';
import { overideCart } from '../store/cart';
import {Link, useNavigate} from 'react-router-dom';

function Login() {
    const [signup, setSignup] = useState(false);
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState(false);
    const [signInError, setSignInError] = useState(false)
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [password, setPassword] = useState();
    const [retypePassword, setRetypePassword] = useState();
    const loginForm = [email, password];
    const signupForm = [email, name, surname, password, retypePassword];
    const loginFormState = loginForm.every(item=> item);
    const signupFormState = signupForm.every(item=> item);
    const {signedIn} = useSelector(state => state.account);
    const dispatch = useDispatch();
    let passwordWarning;
    if(password && !password.match(/[A-Z]/)){
        passwordWarning = 'Password must contain an Uppercase character'
    } else if (password && !password.match(/[0-9]/)){
        passwordWarning = 'Password must contain a Number'
    } else if (password && !password.match(/[!@#$%^&*()_+\-={};':"|,.<>/?]/)){
        passwordWarning = 'Password must contain a Special character'
    } else if(password && !password.match(/[a-z]/)){
        passwordWarning = 'Password must contain a lowercase character'
    }
    const userInfo = async (e)=> {
        if(e.target.innerHTML === 'Log In'){
            if(loginFormState && password && email.includes('@') && email.match(/(?<=@).*/)[0].includes('.') && !email.match(/\s/)){
                const sentData = await fetch('https://bogaad-store.herokuapp.com/users/',
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'email': email,
                        'password' : password
                    },
                }
                );
                if(sentData.ok){
                    const response = await sentData.json();
                    localStorage.setItem('jwt', response.accessToken)
                    let cart = [];
                    let wishList = [];
                    for(let x in response.jsonCart){
                        cart.push(response.jsonCart[x]) 
                    }
                    for(let x in response.jsonWishList){
                        wishList.push(response.jsonWishList[x])
                    }
                    dispatch(changeSignedInState(true));
                    dispatch(updateUser(response));
                    dispatch(overideCart(cart))
                    dispatch(overideWishList(wishList))
                    navigate("/")
                } else {
                    setSignInError(true)
                }
            } 
        } else {
            if(signupFormState && password === retypePassword && email.includes('@')
             && email.match(/(?<=@).*/)[0].includes('.') && !email.match(/\s/) && 
             password.match(/[0-9]/) && password.match(/[!@#$%^&*()_+\-={};':"|,.<>/?]/) 
             && password.match(/[A-Z]/) && password.match(/[a-z]/)){
                const form = { 
                    email: email,
                    name: name,
                    surname: surname,
                    password: password
                }
                const sentData = await fetch('https://bogaad-store.herokuapp.com/users/',
                {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(form)
                }
                );
                if(sentData.ok){
                    setNewUser(true);
                    setPassword()
                }
            }
        }
    }
    const handleInput = (e)=> {
        const target = e.target.getAttribute('placeholder');
        const value = e.target.value;
        switch(target) {
            case 'example@bogaad.com':
                setEmail(value)
                break;
            case '*******':
                setPassword(value)
                break;
            case 'Abdullaziz':
                setName(value)
                break;
            case 'Mohamed':
                setSurname(value)
                break;
            default:
                setRetypePassword(value)
        }
    }
    const changeSign = (e)=> {
        if(e.target.innerHTML === 'Log In'){
            setSignup(false)
        } else {
            setSignup(true)
        }
    } 
  return   (
    <div className='login'>
        {!signup ? 
            <div className='login-part'>
                <img src={require('../../Projects Images/user.png')} alt="" />
                <h5>E-mail</h5>
                <input type="email" placeholder='example@bogaad.com' onChange={handleInput} value={email}/>
                <p>{(email && (!email.includes('@') || !email.match(/(?<=@).*/)[0].includes('.') || email.match(/\s/))) && 'Enter a valid E-mail'}</p>
                <h5>Password</h5>
                <input type="password" placeholder='*******' onChange={handleInput} value={password}/>
                <p>{(!email || !password) && 'Please fill all the blank spaces'}</p>
                <p>{signInError && 'Email or Password is incorrect'}</p>
                <button className='login-button' onClick={userInfo} >Log In</button>
                <p>Dont have an account? <span onClick={changeSign} className="redirect">Sign Up</span></p>
            </div> : 
            <div className='login-part signup-part'>
                {newUser ? 
                <div>
                    {/* <img src={require('../../Projects Images/user.png')} alt="" className='signup-avatar'/> */}
                    <h5>E-mail</h5>
                    <h5>{email}</h5>
                    <h5>Password</h5>
                     <input type="password" placeholder='*******' onChange={handleInput} value={password}/>
                     <p>{signInError && 'Email or Password is incorrect'}</p>
                     <Link to={signedIn ? "/" : "/Login"}><button className='login-button' onClick={userInfo} >Log In</button></Link>
                </div> : 
                <div>
                    <img src={require('../../Projects Images/user.png')} alt="" className='signup-avatar'/>
                    <h5>E-mail</h5>
                    <input type="email" placeholder='example@bogaad.com' onChange={handleInput} value={email}/>
                    <p>{(email && (!email.includes('@') || !email.match(/(?<=@).*/)[0].includes('.') || email.match(/\s/))) && 'Enter a valid E-mail'}</p>
                    <h5>Name</h5>
                    <input type="text" placeholder='Abdullaziz' onChange={handleInput} value={name}/>
                    <p>{(name && name.length < 3) && 'Your Name is too short!'}</p>
                    <p>{(name && name.length > 15) && 'Your Name is too long!'}</p>
                    <h5>Surname</h5>
                    <input type="text" placeholder='Mohamed' onChange={handleInput} value={surname}/>
                    <p>{(surname && surname.length < 3) && 'Your Surname is too short!'}</p>
                    <p>{(surname && surname.length > 15) && 'Your Surname is too long!'}</p>
                    <h5>Password</h5>
                    <input type="password" placeholder='*******' onChange={handleInput} value={password} />
                    <p>{passwordWarning}</p>
                    <h5>Re-type Password</h5>
                    <input type="password" placeholder='Retype password' onChange={handleInput} value={retypePassword} />
                    <p>{(!email || !password || !name || !surname || !retypePassword) && 'Please fill all the blank spaces!'}</p>
                    <p>{(email && name && surname && password && retypePassword) && (retypePassword !== password) && 'Passwords are not the same!'}</p>
                    <button className='login-button' onClick={userInfo}>Sign Up</button>
                    <p>Already have an account? <span onClick={changeSign} className="redirect">Log In</span></p>
                </div>
                }
            </div>
        }
  </div>
  );
}

export default Login;