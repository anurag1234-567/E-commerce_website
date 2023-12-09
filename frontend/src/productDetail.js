import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import axios from 'axios';
 
function ProductDetail(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState();

    useEffect(()=>{
        const fetchProduct = async()=>{
            try{
                const res = await axios.get(`http://localhost:4000/product/${id}`);
                setProduct(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchProduct();
    }, [id])

    const handleOrder = ()=>{
        navigate(`/orderConfirmation/${id}`);
    }

    const handleCart = async()=>{
        const { title, brand, price } = product;
        const imageURL = product.images[0];
        const item = { itemId: id, title, brand, quantity: 1, price, imageURL };
        const token = localStorage.getItem('jwtToken');

        try{
            const res = await axios.post('http://localhost:4000/cart/addItem', {item, token});
            alert(res.data);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <Navbar />
        {
            product &&
            <div className='product-wrp'>
                <div className="product-content-wrp">
                    <img src={product.images[0]} alt='' />
                    <div className="product-content">
                        <p className="title">{product.title}</p>
                        <p className="brand">{product.brand}</p>
                        <p className="rating">Rating: {product.rating} <span style={{ color: 'rgb(0, 90, 180'}}> • 34 customer reviews</span></p>
                        <p className="price">Price: <span>${product.price}</span></p>
                        <p className="description"><span>Description</span>  {product.description}</p>
                        <div className="btn-wrp">
                            <button onClick={handleCart} className='cart-btn'>Add to Cart</button>
                            <button onClick={handleOrder} className="buy-btn">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
}
export default ProductDetail;