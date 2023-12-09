import { useState, useEffect } from "react";
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
 
function UserOrders(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const token = localStorage.getItem('jwtToken');
        const res = await axios.post('http://localhost:4000/order/getOrders', { token });
        setData(res.data);
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statusColor = {
    pending: { color: 'rgba(0,0,0,0.35)', background: 'rgba(0,0,0,0.1)' },
    dispatched: { color: 'rgb(255, 185, 56, 0.65)', background: 'rgb(255, 185, 56, 0.2)' },
    delivered:{ color: 'rgba(40, 132, 37, 0.5)', background: 'rgba(41, 127, 47, 0.15)' },
    cancelled: { color: 'rgb(255, 10, 10, 0.6)', background: 'rgba(250, 10, 10, 0.12)' }
  }

  return(
    <>
     <Navbar />
     {
        loading ? ""
        : ( data && data.length > 0 ? 
        <div >
          {   
            data.map((order, index)=>{
              return <div className='order-wrp' key={index}>
                       <h3>Order Id - {order._id}</h3>
                       <p className="status">Order Status: 
                          <span style={ statusColor[order.status] }>
                            {order.status}
                          </span>
                       </p>
                        {
                          order.items.map((item, index)=>{
                            return  <div className='order-content-wrp' key={index}>
                                      <img src={item.imageURL} alt='' />
                                      <div className='c1'>
                                        <div className='item-description'>
                                          <p>{item.title}</p>
                                          <p className="brand">{item.brand}</p>
                                        </div>
                                        <p>Qty: {item.quantity}</p>
                                      </div>
                                      <div className='c2'>
                                        <p >Price: ${item.price}</p>
                                      </div>
                                    </div>
                          })
                        }
                       <p className="total" >Total: ${order.total}</p>
                     </div>
            })
          }
        </div>
        : 
        <div className="empty-order-wrp">
          <img src='/images/image2.png' alt='' />
          <h2>No Orders Found!</h2>
          <p>Looks like you have not placed any order. 
            <Link to='/' className='link'>Continue Shopping <span>→</span></Link></p>
        </div> )
     }
    </>
  );
}
export default UserOrders;