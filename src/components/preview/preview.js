import'./preview.css';
import Nav from '../Nav/nav';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import { updateSimilar, updateCart, changePreview, overideCart} from '../store/cart';
import { changeSignedInState, updateUser, overideWishList, addToWishList } from '../store/accountSlice';
import { changeActivePage } from '../store/secondPageSlice';
import {useEffect, useState} from 'react';

function Preview() {
    // const {cartProducts} = useSelector(state => state.cart);
    const {wishList} = useSelector(state => state.account);
    const {email} = useSelector(state => state.account.user);
    const {productImages} = useSelector( state => state.shop);
    const dispatch = useDispatch();
    const [size, setSize] = useState();
    const [activeCategory, setActiveCategory] = useState();
    const [sizeToBeUsed, setSizeToBeUsed] = useState([])
    const shirtSize = ['M', 'L', 'XL', 'S']
    const shoeSize = [7,8,9,10]; 
    const trouserSize = [32,34,36,40];
    const generalSize = ['Small', 'Medium', 'Large'];
    const changeSize = (e)=> {
        if(size){
            const activeElement = document.getElementsByClassName(size);
            activeElement[0].style.border = '2px solid';
            activeElement[0].style.color = 'black';
        }
        e.target.style.border = '2px solid red';
        e.target.style.color = 'red';
        setSize(e.target.getAttribute('data-name'))
    }
    const {previewProduct, similarProducts, cartProducts} = useSelector(state => state.cart);
    // console.log(cartProducts, wishList);
    const sizeTable = [ {SIZE: ['M', 'L', 'XL', 'S'], BUST: [88, 88, 96, 86], WAIST: [80, 76, 80, 78], HIPS: [86, 84, 86, 84], LENGTH: [60, 61, 62, 58]}];
    const sizeTableKeys = Object.keys(sizeTable[0]);
    const oneToFour = ['1','2','3', '4'];
    useEffect(()=> {
        dispatch(changeActivePage('PREVIEW'))
      }, [])
    const addToCart = ()=> {
        if(!size){
            alert('choose a size first')
        } else {
            dispatch(updateCart(size));
            const activeElement = document.getElementsByClassName(size);
            activeElement[0].style.border = '2px solid';
            activeElement[0].style.color = 'black';
            setSize('');
        }
    }
    useEffect(()=> {
        const tokenlogin = async()=> {
            if(localStorage.getItem('jwt')){
                const token = localStorage.getItem('jwt');
                const sentData = await fetch('https://bogaad-store.herokuapp.com/shortcut/',
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
        window.scrollTo(-200, 0);
    }, [])
    useEffect(()=>{
        setActiveCategory(previewProduct.name);
        const element = document.getElementsByClassName('actual-sizes');
        if(activeCategory === 'shirts'){
            setSizeToBeUsed(shirtSize);
            element[0].classList.remove('small-large-format');
        } else  if(activeCategory === 'trousers'){
            setSizeToBeUsed(trouserSize);
            element[0].classList.remove('small-large-format');
        } else  if(activeCategory === 'shoes'){
            setSizeToBeUsed(shoeSize);
            element[0].classList.remove('small-large-format');
        } else {
            setSizeToBeUsed(generalSize);
            element[0].classList.add('small-large-format');
        }
        
    }, [activeCategory])
    const updatePreview = (e)=> {
        const id = e.target.parentElement.children[0].getAttribute('data-id');
        const type = e.target.parentElement.children[0].getAttribute('data-type');
        const name = e.target.parentElement.children[1].getAttribute('data-data');
        const subType = e.target.parentElement.children[2].getAttribute('data-data');
        const price = e.target.parentElement.children[3].getAttribute('data-data');
        const product = [id, type, name, subType, price];
        dispatch(changePreview(product));
        window.scrollTo(-200, 0)
    }
    const addToWishlist = ()=> {
        dispatch(addToWishList(localPreviewProduct))
    }
    useEffect(()=> {
        console.log('update wish active')
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
                const sentData = await fetch('https://bogaad-store.herokuapp.com/userdata/',
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
    const localPreviewProduct = JSON.parse(localStorage.getItem('previewProduct'));
    const localSimilarProducts = JSON.parse(localStorage.getItem('similarProducts'));
    useEffect(()=>{
        if(localPreviewProduct){
            let product1 = [localPreviewProduct.id, localPreviewProduct.name,  localPreviewProduct.type,
                localPreviewProduct.subType, localPreviewProduct.price];
            dispatch(changePreview(product1));
            dispatch(updateSimilar(localSimilarProducts));
        }
    }, [])
    console.log(localPreviewProduct);
  return (
    <div className='preview-page'> 
        <Nav />
        <div className='preview-div'>
            <div className='actual-preview'>
                <div className='product'>
                 {/* <img src={`http://localhost:5000/products/${localPreviewProduct.name}/${localPreviewProduct.id}`} alt="" className='product-preview'/> */}
                 <img src={productImages[localPreviewProduct.name][localPreviewProduct.id-1]} alt="" className='product-preview'/>
                </div>
                <div className='product-details'>
                    <h1>{localPreviewProduct.type} </h1>
                    <p>{localPreviewProduct.subType} </p>
                    <h3 className='price'> $ {localPreviewProduct.price}.00</h3>
                    <h3>Choose Your Size</h3>
                    <div className='actual-sizes'>
                        {sizeToBeUsed.map((size)=> {
                            return <h4 onClick={changeSize} data-name={size} className={size}>{size}</h4>
                        })}
                    </div>
                    <div className='cart-div'>
                        <button onClick={addToCart}>Add to Cart</button>
                        <button onClick={addToWishlist}>Add to Wishlist</button>
                    </div>
                    <div className='table-title'>
                            {sizeTableKeys.map((key)=>{
                                return (
                                    <h3>{key}</h3>
                                )
                            })}
                    </div>
                    <div className='size-table'>
                        {sizeTableKeys.map((key, index)=>{
                            return (
                                    <div className='table-data'>
                                {sizeTable[0][sizeTableKeys[index]].map((size, index)=>{
                                    return (
                                        <p>
                                            {size}
                                        </p>
                                    )
        
                                })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <h4 className='similar-title'>Similar Products You might like</h4>
            <div className='similar-products'>
                {oneToFour.map((item, index)=> {
                    return (
                        <Link to='/Preview'>
                            <div onClick={updatePreview}>
                                {/* <img src={`http://localhost:5000/products/${localSimilarProducts[0][1]}/${localSimilarProducts[index][0]}`} alt="" data-type={localSimilarProducts[0][1]}
                                data-id={localSimilarProducts[index][0]} className="similar-product-img"/>   */}
                                <img src={productImages[localSimilarProducts[0][1]][localSimilarProducts[index][0]-1]} alt="" data-type={localSimilarProducts[0][1]}
                                data-id={localSimilarProducts[index][0]} className="similar-product-img"/> 
                                <h4 data-data={localSimilarProducts[index][2]}>{localSimilarProducts[index][2]} </h4>
                                <p data-data={localSimilarProducts[index][3]}>{localSimilarProducts[index][3]}</p>
                                <p data-data={localSimilarProducts[index][4]}>$ {localSimilarProducts[index][4]}.00</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default Preview;