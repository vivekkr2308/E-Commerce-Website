import React from 'react'

import {AiFillMinusCircle} from 'react-icons/ai'
import {BsFillPlusCircleFill} from 'react-icons/bi'

import { useProductContext } from '../productContext'

const CartItem = (props) => {
    const {name,price,quantity,image,category}=props.product
    const {removeFromCart,increaseQuant,decreaseQuant}=useProductContext();
  return (
    //add to cart button krne k baad wo item cart me aayega so cart component me display krnwaa hai wo item so cart component me pe
    //pehle to user ka details rahega aur remove ALL and Purchage All button bhi rahega 
    //then wo product hoga jo add to click pe aaya hai wo to change hota rahega so ek alag cartItem component bna liye uss k liye and iss componneyt ko cart componenet me call kr liye sath me jo jo detail yaha need hai wo sb pass b kr diye.
    <div>
        <div className='cardContainer' >
            <div className='imageContainer'>
                <img src={image} alt={category} />
            </div>

            <div className='itemInfo'>
            {/* item name, price, two button for increasing and decreasing the quantity and remove from cart */}
                   <div className='name'>
                      {name}
                   </div>

                   <div className='price'>
                     Rs.{price}
                   </div>

                   <div className='quantity'>
                        <span className='minus'> 
                        {/* icon + iska for this npm i react-icons then react icon githhub select jiska ko use krna ho copy ho jayega 
                        paste here AiFillMinusCircle    ye paste kiye ab dekho kya kya krte hai
                         <AiFillMinusCircle/> usko aishe krna padega then isko import krna padega aishe import {AiFillMinusCircle} from 'react-icons/ai' last me khud se ai lgana pada*/}
                           <AiFillMinusCircle onClick={()=>decreaseQuant(props.product)}/>
                           {/* jaise he iss icon pe click kru item ka quantity decrease ho jayye so decreaseQuant function call ye function productContext me bnaye the 
                           &nbsp; gives space*/}
                        </span>
                        &nbsp; {quantity}  &nbsp;

                        <span className='plus'>
                            {/* icons for plus */}
                           < BsFillPlusCircleFill onClick={()=>increaseQuant(props.product)}/>
                        </span>
                        
                   </div>
            </div>

            <div className='btncontainer'>
                <button onClick={removeFromCart(props.product)}>
                  Remove from Cart
                </button>

            </div>

        </div>


    </div>
  )
} 

export default CartItem