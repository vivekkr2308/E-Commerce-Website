import React from 'react'

const OrderDetail = (props) => {
//kish date ko item puchage kiya hai
const {date,list,amount}=props.order;
//hmara productContext k anadr ek function create kiya tha purchage All
//iss function k andar kya kya tha date , list,amount
  return (
    <div>
     <h1 className='orderheading'>Ordered On:{date} </h1>
     <table>
       <tr>
         <th>product name</th>
         <th>price</th>
         <th>quantity</th>
         <th>amount</th>
       </tr>
       {/* hmara jitne bhi item hai wo list k anadr save hai */}
      
      {/* main yaha list ko traverse krwa leta hu */}

      {list.map((product,i)=>{
       <>
        <tr>
              {/* yaha serial no 1 hoga index 0 se start hota hai na iss liye i+1 */}
          <td>{i+1}</td>
              {/* yaha product name aayega */}
          <td>{product.name}</td> 
          <td>{product.price}</td> 
          <td>{product.quantity}</td> 
          {/* total amount */}
          <td>Rs.{product.quantity*product.price}</td> 

        </tr>

        
        </>

      })}
      <tr>
        <td colSpan={4}>Grand Total</td>
        <td>Rs.{amount}</td>
      </tr>
     </table>


    </div>
  )
}

export default OrderDetail;