import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './navbar';
import axios from 'axios';
 
function CartPage() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState({
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
    })

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const res = await axios.post('http://localhost:4000/cart/details', { token })
                setData(res.data);
            } catch (err) {
                console.log(err);
            }finally{
                setLoading(false);
            }
        }
        fetchdata();
    }, [])

    const findTotalPrice = () => {
        let total = 0;
        for (let item of data.items) {
            total += item.price * item.quantity;
        }
        return total;
    }

    const handleQuantityChange = (e, index) => {
        data.items[index].quantity = e.target.value;
        const updatedData = { ...data };
        setData(updatedData);
    }

    const handleRemove = async (itemId) => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.post('http://localhost:4000/cart/removeItem', { token, itemId });
            const updatedItems = data.items.filter((item) => item.itemId !== itemId);
            const updatedObject = { ...data, items: updatedItems };
            setData(updatedObject);
        } catch (err) {
            console.log(err);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    }

    const handlePhoneNoChange = (e)=>{
        const inputNumber = e.target.value.replace(/[^0-9]/g, '');
        if(inputNumber.length <= 10){
            setPhoneNumber(inputNumber);
        }
    }

    const handleZipcodeChange = (e)=>{
        const inputNumber = e.target.value.replace(/[^0-9]/g, '');
        if(inputNumber.length <= 6){
            setAddress({ ...address, zipcode: inputNumber });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const total = findTotalPrice();
        try {
            const res = await axios.post('http://localhost:4000/order/addOrder', { items: data.items, total, firstName, lastName, phoneNumber, address, token });
            navigate(`/orderSuccessPage/${res.data}`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='cartPage'>
            <Navbar />
            {   loading ? ""
                :( 
                (data && data.items.length > 0) ?
                    <>
                        <div className='cart-container'>
                            <div className='cart-wrp'>
                            {
                                data.items.map((obj, index) => {
                                  return <div className='cart-content-wrp' key={index}>
                                           <div className='r1'>
                                               <img src={obj.imageURL} alt='' />
                                               <div>
                                                   <p>Title: {obj.title}</p>
                                                   <p className='brand'>{obj.brand}</p>
                                                   <p>Price: {obj.price}</p>
                                               </div>
                                           </div>
                                           <div className='r2'>
                                                Quantity: <input type='Number' value={obj.quantity} min='1' onChange={(e) => { handleQuantityChange(e, index) }} />
                                                <button onClick={() => { handleRemove(obj.itemId) }}>Remove</button>
                                           </div>
                                        </div>
                                })
                            }
                            </div>

                            <div className='cart-summary'>
                                <div>
                                    <h3>Order Summary</h3>
                                    <p>items: {data.items.length}</p>
                                    <p>Total: {findTotalPrice()}</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <h3>Delivery Address: </h3>

                            <div className='labels-wrp'>
                                <label>
                                   First Name
                                   <input type='text' value={firstName} onChange={(e)=>{ setFirstname(e.target.value) }} required />
                                </label>

                                <label>
                                    Last Name
                                    <input type='text' value={lastName} onChange={(e)=>{ setLastName(e.target.value) }} required />
                                </label>
                            </div>


                            <div className='labels-wrp'>
                            <label>
                                Street Address
                                <input type='text' className='street-address' name='streetAddress' value={address.streetAddress} onChange={handleInputChange} required />
                            </label>

                            <label>
                                State
                                <input type='text' name='state' value={address.state} onChange={handleInputChange} required />
                            </label>

                            </div>

                            <div className='labels-wrp'>
                            <label>
                                City
                                <input type='text' name='city' value={address.city} onChange={handleInputChange} required />
                            </label>

                            <label>
                                zipcode
                                <input type='text' name='zipcode' value={address.zipcode} onChange={handleZipcodeChange} required/>
                            </label>

                            <label>
                                Phone No
                                <input type='text' value={phoneNumber} onChange={handlePhoneNoChange} required />
                                {
                                    (phoneNumber.length > 0 && phoneNumber.length < 10) 
                                    ? <p style={{ color: 'red' }}>Phone number must be of 10 digits</p> : ""
                                }
                            </label>

                            </div>

                            <button>Continue to billing →</button>
                        </form>
                    </>
                    : 
                    <div className="empty-cart-wrp">
                        <img src='/images/image1.jpg' alt='' />
                        <h2>Your Shopping Cart is Empty!</h2>
                        <p>Looks like you have not add any item. <Link to='/' className='link'>Explore more <span>→</span></Link></p>
                    </div>
                )
            }
        </div>
    )
};
export default CartPage; 