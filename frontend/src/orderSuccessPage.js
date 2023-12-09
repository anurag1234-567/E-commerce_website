import {  useNavigate } from "react-router-dom";

function OrderSuccessPage(){
    // const {id} = useParams();
    const navigate = useNavigate();

    return (
        <div className="order-success-page">

         <div className="tick-wrp">✔</div>
         <h3>Order Sucessfully Placed!</h3>
         <p>Thank you for Shopping with us.</p>
         <button onClick={()=>{ navigate('/') }}>Back Home</button>

        </div>
    );
}
export default OrderSuccessPage;