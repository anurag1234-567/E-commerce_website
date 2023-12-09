import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './adminNavbar';
import EditIcon from '@mui/icons-material/Edit';
 
function Orders(){
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [data, setData] = useState([]);
    const [editRowId, setEditRowId] = useState();
    const token = localStorage.getItem('jwtToken');

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await axios.post('http://localhost:4000/admin/getOrders', {page, token});
                setData(res.data.orders);
                setTotalPages(res.data.totalPages);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [page, token]);

    const statusColor = {
        pending: { color: 'rgba(0,0,0,0.35)', background: 'rgba(0,0,0,0.1)' },
        dispatched: { color: 'rgb(255, 185, 56, 0.65)', background: 'rgb(255, 185, 56, 0.2)' },
        delivered:{ color: 'rgba(40, 132, 37, 0.5)', background: 'rgba(41, 127, 47, 0.15)' },
        cancelled: { color: 'rgb(255, 10, 10, 0.6)', background: 'rgba(250, 10, 10, 0.12)' }
      }

    const handleStatusChange = async(e, id)=>{
        try{
            const { value } = e.target;
            await axios.post('http://localhost:4000/admin/changeStatus', {id, status: value, token});
            const updatedData = data.map((order)=>{ return order._id === id ? {...order, status: value } : order });
            setData(updatedData);
            setEditRowId(null);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <AdminNavbar />
         {
            data.length > 0  ?
            <>
            <table >
                <thead>
                   <tr>
                    <th>Order Id</th>
                    <th>Items</th>
                    <th>Total Amount</th>
                    <th>Shipping Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                   </tr>
                </thead>
                <tbody>
                  {  
                    data.map((order, index)=>{
                        return <tr key={index}>
                                 <td>{order._id}</td>
                                 <td>
                                    <div className='order-item-wrp'>
                                    {
                                       order.items.map((item, indx)=>{
                                           return <div className='order-item' key={indx}>
                                                     <img src={item.imageURL} alt='' />
                                                     <p>{item.title} - #{item.quantity} - {item.price}</p>
                                                   </div>
                                       })
                                    }
                                    </div>
                                 </td>
                                 <td>{order.total}</td>
                                 <td>
                                     <p>{order.firstName} {order.lastName}</p>
                                     <p>{order.phoneNumber}</p>
                                     <p>{order.address.streetAddress}</p>
                                     <p>{order.address.city}</p>
                                     <p>{order.address.state}</p>
                                     <p>{order.address.zipcode}</p>
                                 </td>
                                 <td> 
                                    {
                                       editRowId === index ?
                                       <select value={order.status} onChange={(e)=>{ handleStatusChange(e, order._id) }} >
                                        <option>pending</option>
                                        <option>dispatched</option>
                                        <option>delivered</option>
                                        <option>cancelled</option>
                                       </select>
                                       : <span className='status'  style={ statusColor[order.status] }>{order.status}</span> //edit here
                                    }
                                 </td>
                                 <td >
                                    <EditIcon className='hidden-btn' onClick={()=>{ setEditRowId(index); }}/>
                                 </td>
                               </tr>
                    })
                }
                </tbody>
            </table>
            <div className='pagination-wrp'>
               <button onClick={()=>{ if(page !== 1) setPage(page - 1) }}>Prev</button>
               <p>{page} out of {totalPages}</p>
               <button onClick={()=>{ if(page !== totalPages) setPage(page + 1) }}>Next</button>
            </div>
            </>
            : <p>No order are available</p>
         }
        </>
    );
}
export default Orders;