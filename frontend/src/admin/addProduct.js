import { useState } from "react";
import AdminNavbar from './adminNavbar';
import categories from "../category";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
 
function AddProduct() {
    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [imgURL, setImgURL] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const data = { title, brand, category, description, price, stock, images: imgURL };
            const token = localStorage.getItem('jwtToken');
            const res = await axios.post('http://localhost:4000/admin/addProduct', { ...data, token });
            alert(res.data);
        } catch (err) {
            console.log(err); }
    }

    return (
        <>
            <AdminNavbar />
            <div className='add-product-wrp'>
                <h3>Add Product</h3>

                <label>Product Name: </label>
                <input type='text' value={title}
                    onChange={(e) => { setTitle(e.target.value) }} required />

                <label>Brand: </label>
                <input type='text' value={brand}
                    onChange={(e) => { setBrand(e.target.value) }} required />

                <label>Category: </label>
                <select onChange={(e)=>{ setCategory(e.target.value) }} required>
                    <option value=''>--select category--</option>
                    {
                        categories.map((category, index)=>{
                            return <option key={index} value={category.value}>{category.label}</option>
                        })
                    }
                </select>

                <label>Description: </label>
                <textarea rows='4' value={description}
                    onChange={(e) => { setDescription(e.target.value) }} required />

                <label>Price: </label>
                <input type='Number' value={price} 
                    onChange={(e) => { setPrice(e.target.value) }} required />

                <label>Stock: </label>
                <input type='Number' value={stock} 
                    onChange={(e) => { setStock(e.target.value) }} required />

                <label>image URL: </label>
                <input type='text' value={imgURL}
                    onChange={(e) => { setImgURL(e.target.value) }} required />

                <div className="btn-wrp">
                   <button onClick={()=>{ navigate('/admin') }} className="cancel-btn">Cancel</button>
                   <button onClick={handleSubmit} className="add-btn">Add Product</button>
                </div>
            </div>
        </>
    );
}
export default AddProduct;