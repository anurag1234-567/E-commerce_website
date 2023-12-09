import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './adminNavbar';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

function AdminDashboard(){
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                let url = `http://localhost:4000/product?page=${page}`;
                if(category) url += `&category=${category}`;
                if(sortBy) url += `&sortBy=${sortBy}`

                const res = await axios.get(url);
                setData(res.data.products);
                setTotalPages(res.data.totalPages);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [page, category, sortBy])

    const handlePrev = ()=>{
        if(page !== 1) setPage(page - 1);
    }

    const handleNext = () =>{
        if(page !== totalPages) setPage(page + 1);
    }

    return(
        <>
         <AdminNavbar />

         <div className='search-menu'>
            <div>
                Category: 
                <select onChange={(e)=>{ setCategory(e.target.value); }} required>
                    <option value=''>All</option>
                    <option value='smartphones'>Smartphones</option>
                    <option value='laptops'>Laptops</option>
                    <option value='sunglasses'>Sunglasses</option>
                    <option value='mens-shirts'>Mens Shirts</option>
                    <option value='mens-watches'>Watches</option>
                    <option value='womens-bags'>Bags</option>
                    <option value='motorcycle'>Motorcycle</option>
                    <option value='furniture'>Furniture</option>
            </select>
            </div>

            <div>
            SortBy: 
                <select onChange={(e)=>{ setSortBy(e.target.value); }} required>
                    <option value=''></option>
                    <option value='lowPrice'>low to High Price</option>
                    <option value='highPrice'>High to low Price</option>
                    <option value='highRated'>High Rated</option>
                </select>
            </div>
         </div>

         <div className='items'>
            { data &&
              data.map((item, index) => {
                return <div className='item' key={index}>
                <div className='img-wrp'>
                    <img src={item.images[0]} alt='product-img'/>
                </div>
                <div className='detail-wrp'>
                    <p>
                     <span>{item.title}</span>
                     <span className='price'>$ {item.price}</span>
                    </p>
                    <p className='admin-btn-wrp'><EditIcon onClick={()=>{ navigate(`/admin/editProduct/${item._id}`) }}/></p>
                </div>
               </div>
              })

            }
         </div>

         <div className='pagination-wrp'>
            <button onClick={handlePrev}>Prev</button>
            <p>{page} out of {totalPages}</p>
            <button onClick={handleNext}>Next</button>
         </div>
        </>
    )
}
export default AdminDashboard;