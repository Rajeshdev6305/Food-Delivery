import './PlaceOrder.css'
import { useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../components/context/storecontext';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = () => {
const { getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
const [paymentMethod, setPaymentMethod] = useState("cod");
const [orderSuccess, setOrderSuccess] = useState(false);


const [data,setData] = useState({ 
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  phone: ""
});

const onChangeHandler = (event) => {
  const name = event.target.name;
  const value =event.target.value;
  setData(data=>({...data,[name]:value}))
}
 const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
const placeOrder = async (event) => {
  event.preventDefault();

  let orderItems = [];
  food_list.map((item) => {
    if (cartItems[item._id]> 0) {
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id];
      orderItems.push(itemInfo);
    
    }
  })
let orderData = {
  address:data,
  items: orderItems,
  amount: getTotalCartAmount() + 2, // Adding delivery fee of $2
  paymentMethod,

}  
let response = await axios.post(url+"/api/order/place", orderData,{headers:{token}})
if (response.data.success) {
      if (paymentMethod === "stripe") {
        window.location.replace(response.data.session_url);
      } else {
        setOrderSuccess(true); // show top message
        setTimeout(() => navigate("/myorders"), 1000); // navigate after 1 seconds
      }
    } else {
      alert("Error placing order");
    }
  };

const navigate = useNavigate();

useEffect(()=>{
  if(!token){
navigate('/cart')
  }
else if(getTotalCartAmount===0)

  {
    navigate('/cart')
  }

},[token])

  return (
      <>
    {orderSuccess && (
  <div className="order-success-message">
    ✅ Order placed successfully!
  </div>
)}
   <form onSubmit={placeOrder} className='place-order'>
    <div className="place-order-left">
   <p className="title">Delivery Information</p>
   <div className="multi-fields">
   <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
   <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />

   </div>
   <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
   <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
   <div className="multi-fields">
    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
   </div>
   <div className="multi-fields">
    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
   </div>
   <input required name='phone' onChange={onChangeHandler} value={data.phone } type="text" placeholder='Phone Number' />
    </div>
    <div className="place-order-right">
      <div className="cart-total">
            <h2>Cart Total</h2>
         
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
         <h3>Payment Method</h3>
          <div className="payment-method">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={handlePaymentMethodChange}
              />
              COD (Cash on delivery)
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={handlePaymentMethodChange}
              />
              Stripe (Credit / Debit)
            </label>
          </div>

          <button type="submit">Place Order</button>
        </div>
    </div>
   </form>
            </>

  )
}

export default PlaceOrder;
