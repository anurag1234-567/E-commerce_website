import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbar from './adminNavbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
 
function EditProduct(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        title: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        stock: '',
    });

    useEffect(()=>{
        const fetchData = async()=>{
            try{
              const res = await axios.get(`http://localhost:4000/product/${id}`);
              setData(res.data); 
            }catch(err){
              console.log(err);
            }
        }
        fetchData();
    }, [id]);

    const handleSubmit = async()=>{
        try{
          const token = localStorage.getItem('jwtToken');
          const res = await axios.post('http://localhost:4000/admin/editProduct', {...data, token});
          alert(res.data);
        }catch(err){
          console.log(err);
        }
    }

    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    return(
      <>
      <AdminNavbar />
      <div className='editProduct-wrp'>
        <h3>Edit Product</h3>

       <label>Title: </label>
       <input type='text' name='title' value={data.title} 
       onChange={handleInputChange} required/>

       <label>Brand: </label>
       <input type='text' name='brand' value={data.brand} 
       onChange={handleInputChange} required/>
       
       <label>Category: </label>
       <input type='text' name='category' value={data.category} 
       onChange={handleInputChange} required/> 
       
       <label>Description: </label>
       <textarea rows='4' name='description' value={data.description} 
       onChange={handleInputChange} required/>
       
       <label>Price: </label>
       <input type='Number' name='price' value={data.price} 
       onChange={handleInputChange} required/>
       
       <label>Stock: </label>
       <input type='Number' name='stock' value={data.stock} 
       onChange={handleInputChange} required/>

       <div className="btn-wrp">
          <button onClick={()=>{ navigate('/admin') }} className="cancel-btn">Cancel</button>
          <button onClick={handleSubmit} className="add-btn">Save</button>
       </div>
      </div>
      </>
    );
}
export default EditProduct;