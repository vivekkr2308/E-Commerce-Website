import React from 'react'
import { useProductContext } from '../productContext'//for the addToCart function


const ItemCard = (props) => {
const {addToCart}=useProductContext();
    //yaha hum item ko le lete hai through props
    const {name,image,price,category}=props.item
  
  return (
    <div className='card-container'>
       <div>
        {/* //image le rhe sbse pehle */}
        <img src={image} alt={category}/>
       </div>

       <div>
            {/* //product name and price */} 

            <div>
            {/* for name */}
            {name}
            </div>

            <div>
            {/* price */}
            Rs.{price}
            </div>

       </div>

       <div>
        {/* add to cart button pe click krne k baad item cart me add ho jana chahiye uss k liye hum function bnaye the productContext me i.e addToCart so wha se import kr lenge yaha  */}
        <button onClick={addToCart}>Add to cart</button>
        {/* iss button pe click krenge to item cart me chla jayega */}
       </div>

    </div>
  ) 
}

export default ItemCard