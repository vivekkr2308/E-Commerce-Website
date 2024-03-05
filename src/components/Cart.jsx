import React, { useEffect, useState } from 'react'
import { useAuthValue } from '../authContext'
import { useProductContext } from '../productContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Cart = () => {

    const [isLoading,setLoading]=useState(true)
    const {cart,total,clearCart,purchageAll,itemIncart}=useProductContext();
    const {userLoggedIn}=useAuthValue();
    const navigate=useNavigate();

    //jaise he mera loading show ho uss 4 sec baad he cart page show ho 
    //so uss k liye useEffect k anadar code likhenge q ki sbse pehle useEffect wala code chalta hai phr uss k bahar wala 
 
    useEffect(()=>{
        setTimeout(() => {
            setLoading(false);
            
        }, 400);

    },[])

    function handlePurchase(){
        //ye check krega that agar hmare cart me item 0 hai hum error show krwa denge
        //otherwise hum purchageAll function ko call krenge ye productcontext me bna hua hai
    if(itemIncart===0){
        toast.error(" nothing to purchage in your cart")
    }
    //otherwise purchageAll function call
    purchageAll()//isse sarre cart wala item purchage ho jayega and my orders k anadar aa jayega
     toast.success("yours item has been placed. Thank you for purchage")

       navigate("/myorder")
    }
 
 
    return (
        <> 
    <div>
        {/* cart  me jo user login kiya hai uska naam show hoga sath sath uska cart details 
        buy button increse + , decrese buttom -  */}
        {/* isLoading agar true hai to loading show otherwise cart show  */}
     {isLoading ? <h2>loading.....</h2>: <>
                                         <div className='main-container'>

                                              <div className='header'>

                                                   <div className='userInfo'>
                                                    {/* user name will display here */}
                                                    <h1>hey {userLoggedIn.name} <small>Your cart has </small></h1>
                                                   </div>

                                                   <div className='cart-details'>
                                                    <div className=''>
                                                        {/* initially hamara item kitn hai 0 so show hoga */}
                                                        Item: {itemIncart} 
                                                        <br />
                                                       {/* when I click on this button it will remove all the item from the cart*/}
                                                       {/* clearCart function humlog productContext me bnaye hua hai uss me sb functionality likha hua hai */}
                                                        <button className=''
                                                         onClick={clearCart}>Remove all</button>

                                                    </div>
                                                        <div>
                                                            Total amount : Rs. {total }
                                                            <br />
                                                            {/* handlePurchase function is created above */}
                                                            <button onClick={handlePurchase}>Purchase All</button>
                                                        </div>
                                                   </div>
                                                   {/* hmari cart agar empty hai to ek heading show hoga ki nothing here to display else cart me add kiya hua item show kre in <CartItem> componenet */}
                                                <div className='item-container'>
                                                    
                                                     {cart.length===0 ? <h1> Nothing here to display</h1> : 
                                                        cart.map((product,index)=>{
                                                             <CartItem product={product} key={index}/>//cartItem component me product pass
                                                        })
                                                    
                                                     
                                                                                                  
                                                     }
                                                </div>
                                              </div>

                                         </div>
     
     
     
     
     
     
                                        </>
     
     
     
     
     
     
     }



    </div>
    </>
  )
}

export default Cart