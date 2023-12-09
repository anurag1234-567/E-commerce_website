import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import ForgetPassword from './forgetPassword';
import PageNotFound from './pageNotFound';

import Protected from './protected';
import ProductList from './productList';
import ProductDetail from './productDetail';
import CartPage from './cartPage';
import ChangePassword from './changePassword';
import OrderConfirmation from './orderConfirmation';
import OrderSuccessPage from './orderSuccessPage';
import UserOrders from './userOrder';

import ProtectedAdmin from './admin/protectedAdmin';
import AdminDashboard from './admin/adminDashboard';
import Orders from './admin/orders';
import EditProduct from './admin/editProduct';
import AddProduct from './admin/addProduct';
import './App.css';

function App(){
    return(
        <BrowserRouter>
         <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgetPassword' element={<ForgetPassword />} />

            <Route path='/' element={<Protected />}>
               <Route path='/' element={<ProductList />} />
               <Route path='productDetail/:id' element={<ProductDetail />} />
               <Route path='/cartPage' element={<CartPage />} />
               <Route path='orderConfirmation/:id' element={<OrderConfirmation />} />
               <Route path='/orderSuccessPage/:id' element={<OrderSuccessPage />} />
               <Route path='/ChangePassword' element={<ChangePassword />} />
               <Route path='userOrders' element={< UserOrders/>} />
            </Route>

            <Route path='/admin' element={<ProtectedAdmin />}>
                <Route  path='' element={<AdminDashboard />} />
                <Route path='addProduct' element={<AddProduct />} />
                <Route path='editProduct/:id' element={<EditProduct />} />
                <Route path='orders' element={<Orders />} />
            </Route>

            <Route path='*' element={<PageNotFound />} />
         </Routes>
        </BrowserRouter> 
    );
}
export default App;