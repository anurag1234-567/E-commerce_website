import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from './navbar';
import axios from 'axios';

function OrderConfirmation(){
    const {id} = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [total, setTotal] = useState();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        streetAddress: "",
        city: "",
        state: "",
        zipcode: ""
    })
    
    const [item, setItem] = useState({
        itemId: "",
        title: "",
        brand: "",
        quantity: 1,
        price: "",
        imageURL: "",
    })
    
    useEffect(()=>{
        const fetchProduct = async()=>{
            try{
                const res = await axios.get(`http://localhost:4000/product/${id}`);
                const { _id, title, brand, price, images } = res.data;
                setItem({ itemId: _id, title: title, brand: brand, quantity: 1, price: price, imageURL: images[0] });
                setTotal(price);
            }catch(err){
                console.log(err); }
        }
        fetchProduct();
    }, [id])

    const handleAddressChange = (e)=>{    
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    }

    const handlePhoneNoChange = (e)=>{
        //replace non numeric characters
        const inputNumber = e.target.value.replace(/[^0-9]/g, '');
        if(inputNumber.length <= 10){    
            setPhoneNumber(inputNumber); }
    }

    const handleZipcodeChange = (e)=>{    
    const inputNumber = e.target.value.replace(/[^0-9]/g, '');
    if(inputNumber.length <= 6){
        setAddress({ ...address, zipcode: inputNumber }); }
    }

    const handleSubmit = async(e)=>{
    e.preventDefault();
    if(phoneNumber.length < 10) return;

    const token = localStorage.getItem('jwtToken');
    const formdata = { items: [item], total, firstName, lastName, phoneNumber, address, token };
    try{
        const res = await axios.post('http://localhost:4000/order/addOrder', formdata);
        navigate(`/orderSuccessPage/${res.data}`);
    }catch(err){
        console.log(err); }
    }
    
    return(
        <>
        <Navbar />
        <div className="order-confrm-wrp">

            <div className='order-wrapper'>
              <img src={item.imageURL} alt='' />

              <div className="order-details">
                <div>Price: ${item.price}</div>
                <div className="quantity-wrp">
                  <span style={{ marginRight: '10px'}}>Quantity:</span> 
                  <input type='Number' min='1' value={item.quantity} onChange={(e)=>{ setItem({ ...item, quantity: e.target.value }); setTotal(item.price * e.target.value); }} required />
                </div>
                <div>Total: ${total}</div>
              </div>
            </div>

            <form className='address-wrp' onSubmit={handleSubmit}>
                <h3>Delivery Address</h3>

                <div className='labels-wrp' >
                    <label>
                        First Name <input type='text' value={firstName} onChange={(e)=>{ setFirstName(e.target.value) }} required />
                    </label>
            
                    <label>
                        Last Name <input type='text' value={lastName} onChange={(e)=>{ setLastName(e.target.value) }} />
                    </label>
                </div>

                <label>
                    Phone No <input type='text' value={phoneNumber} onChange={handlePhoneNoChange} required />
                    {
                        (phoneNumber.length > 0 && phoneNumber.length < 10) 
                        ? <p style={{ color: 'red', marginTop: '10px' }}>Phone number must be of 10 digits</p> : ""
                    }
                </label>

                <label>
                    Street Address <input type='text' name='streetAddress' value={address.streetAddress} onChange={handleAddressChange} required/>
                </label>

                <div className='labels-wrp'>
                    <label>
                        City <input type='text' name='city' value={address.city} onChange={handleAddressChange} required/>
                    </label>

                    <label>
                        State <input type='text' name='state' value={address.state} onChange={handleAddressChange} required/>
                    </label>
                </div>

                <label> 
                    Zipcode <input type='text' name='zipcode' value={address.zipcode} onChange={handleZipcodeChange} required/>
                </label>
      
                <button>Continue to billing →</button>
            </form>
        </div>
        </>
    );
}
export default OrderConfirmation;