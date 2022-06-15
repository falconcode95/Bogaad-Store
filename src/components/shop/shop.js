import'./shop.css';
import Nav from '../Nav/nav';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { change, filter, changeActivePage } from "../store/secondPageSlice";
import { changePreview, updateSimilar, overideCart} from '../store/cart';
import Footer from '../footer/footer';
import {Link } from 'react-router-dom';
import data from '../../Data and Functions/data';
import {randos} from '../../Data and Functions/functions';
import { changeSignedInState, updateUser, overideWishList } from '../store/accountSlice';

function Shop() {
    const { category } = useSelector((state)=> state.shop);
    const { filterBy} = useSelector((state)=> state.shop);
    const {activePage} = useSelector(state => state.shop);
    const {footerIntersecting} = useSelector((state)=> state.shop);
    const categoryRef = useRef();
    const sideMenu = useRef();
    const array = ['C', 'a', 't', 'e', 'g', 'o', 'r', 'i', 'e', 's'];
    useEffect(()=> {
        dispatch(changeActivePage('SHOP'))
      }, [])
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
    useEffect(()=>{
        if(!categoryRef){
            return ;
        }
        if(categoryRef){
            if(footerIntersecting){
                categoryRef.current.style.opacity = '0'
            } else {
                categoryRef.current.style.opacity = '1'
            }
        }
    }, [footerIntersecting])
    useEffect(()=> {
        window.scrollTo(-200, 0)
    }, [])
    const dispatch = useDispatch();
    const oneToEight = ['1','2','3', '4', '5', '6', '7', '8'];
    const {accessories, accessoryType, shirts, shirtTypes, trousers, trouserTypes, shoes, shoeType} = data;
    const changeCategory = (e)=> {
        const shopCategory = e.target.getAttribute('data-id');
        categoryRef.current.style.display = 'none';
        sideMenu.current.style.display = 'block'
        dispatch(change(shopCategory));
        dispatch(filter(''));
    }
    const changeFilter = (e) => { 
        const filterNumber = parseInt(e.target.getAttribute('data-id'));
        dispatch(filter(filterNumber));
        dispatch(change(''));
    }
    const changePreviewProduct = (e) => {
        const id = e.target.getAttribute('data-id');
        const type = e.target.getAttribute('data-type');
        let name;
        let subType;
        if(type === 'shirts'){
            name= shirts[id-1];
            subType = shirtTypes[id-1]
        } else if(type === 'trousers'){
            name= trousers[id-1];
            subType = trouserTypes[id-1]
        } else if(type === 'shoes'){
            name= shoes[id-1];
            subType = shoeType[id-1]
        } else {
            name = accessories[id-1];
            subType = accessoryType[id-1]
        }
        const price = parseInt(id);
        const product = [id, type, name, subType, price];
        dispatch(changePreview(product));
        let similarProd = [];
        const randomNumbers = randos(id);
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
    const showCategories = (e)=> {
        let element = e.target.getAttribute('data-id');
        if(element === 'side-menu'){
            categoryRef.current.style.display = 'block';
            sideMenu.current.style.display = 'none';
            window.scrollTo(-200, 0)
        }
    }
  return (
    <div className="Shop"> 
        <Nav />
        <div className='categories' ref={categoryRef}>
            <p className='title'>Categories</p>
            <div className='category' onClick={changeCategory} data-id="shirts" >
                <img src={require('../../Projects Images/shirt.png')} alt="" data-id="shirts"/>
                <p data-id="shirts">Shirts</p>
            </div>
            <div className='category' data-id="trousers" onClick={changeCategory}>
                <img src={require('../../Projects Images/trousers.png')} alt="" data-id="trousers"/>
                <p data-id="trousers">Trousers</p>
            </div>
            <div className='category' data-id="shoes" onClick={changeCategory}>
                <img src={require('../../Projects Images/shoes.png')} alt="" data-id="shoes"/>
                <p data-id="shoes">Shoes</p>
            </div>
            <div className='category all' data-id="accessories" onClick={changeCategory}>
                <img src={require('../../Projects Images/sunglasses.png')} alt="" data-id="accessories"/>
                <p data-id="accessories">Accessories</p>
            </div>
            <div className='category all' data-id="All" onClick={changeCategory}>
                <img src={require('../../Projects Images/clothes.jpg')} alt="" data-id="All"/>
                <p data-id="All">All</p>
            </div>
            <p className='title'>Filter by Price</p>
            <p onClick={changeFilter} data-id='2' className='filter'>$ 1 - $ 2</p>
            <p onClick={changeFilter} data-id='4' className='filter'>$ 3 - $ 4</p>
            <p onClick={changeFilter} data-id='6' className='filter'>$ 5 - $ 6</p>
            <p onClick={changeFilter} data-id='8' className='filter'>$ 7 - $ 8</p>
        </div>
        <div className='side-menu'  ref={sideMenu} data-id="side-menu" onClick={showCategories} >
            {array.map(item => {
                return <p data-id="side-menu">{item}</p>})}
        </div>
        <div className='shop-products'>
                { oneToEight.map((number, index)=> {
                    return ( 
                            ((category === 'All' || category === 'shirts') || (filterBy >= index+1 && filterBy-1 <=index+1)) && <Link to='/Preview'>
                                <div className='product-folder' data-id={index+1} data-type='shirts' onClick={changePreviewProduct}>
                                    <img src={`http://localhost:5000/products/shirts/${index+1}`} alt="" className='product' data-id={index+1} data-type='shirts'/>
                                    <h4 data-id={index+1} data-type='shirts'>{shirts[index]}</h4>
                                    <p data-id={index+1} data-type='shirts'>{shirtTypes[index]}</p>
                                    <p data-id={index+1} data-type='shirts'>$ {index+1}.00</p>
                                </div> 
                            </Link> 
                        )
                })}
                { oneToEight.map((number, index)=> {
                    return ( 
                            ((category === 'All' || category === 'trousers') || (filterBy >= index+1 && filterBy-1 <=index+1)) && <Link to='/Preview'>
                                <div className='product-folder' data-id={index+1} data-type='trousers' onClick={changePreviewProduct}>
                                    <img src={`http://localhost:5000/products/trousers/${index+1}`} data-id={index+1} data-type='trousers' alt="" className='product'/>
                                    <h4 data-id={index+1} data-type='trousers'>{trousers[index]}</h4>
                                    <p data-id={index+1} data-type='trousers'>{trouserTypes[index]}</p>
                                    <p data-id={index+1} data-type='trousers'>$ {index+1}.00</p>
                                </div> 
                            </Link> 
                        )
                })}
                { oneToEight.map((number, index)=> {
                    return ( 
                            ((category === 'All' || category === 'shoes') || (filterBy >= index+1 && filterBy-1 <=index+1)) && <Link to='/Preview'>
                                <div className='product-folder' data-id={index+1} data-type='shoes' onClick={changePreviewProduct}>
                                    <img src={`http://localhost:5000/products/shoes/${index+1}`} data-id={index+1} data-type='shoes' alt="" className='product'/>
                                    <h4 data-id={index+1} data-type='shoes'>{shoes[index]}</h4>
                                    <p data-id={index+1} data-type='shoes'>{shoeType[index]}</p>
                                    <p data-id={index+1} data-type='shoes'>$ {index+1}.00</p>
                                </div>
                            </Link> 
                        )
                })}
                { oneToEight.map((number, index)=> {
                    return ( 
                            ((category === 'All' || category === 'accessories') || (filterBy >= index+1 && filterBy-1 <=index+1)) && <Link to='/Preview'>
                                <div className='product-folder' data-id={index+1} data-type='accessories' onClick={changePreviewProduct}>
                                    <img src={`http://localhost:5000/products/accessories/${index+1}`} data-id={index+1} data-type='accessories' alt="" className='product'/>
                                    <h4 data-id={index+1} data-type='accessories'>{accessories[index]}</h4>
                                    <p data-id={index+1} data-type='accessories'>{accessoryType[index]}</p>
                                    <p data-id={index+1} data-type='accessories'>$ {index+1}.00</p>
                                </div>
                            </Link> 
                        )
                })}
        </div>
        <Footer />
    </div>
  );
}

export default Shop;