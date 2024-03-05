import React, { useState } from 'react'
import { useProductContext } from '../productContext';

const MyOrder = () => {
    //jn bhi cart se product buy kru to uss product ka details MyOrder page/component me show hoga
  const [isLoading,setLoading]=useState(true);
  const {myorders}=useProductContext();


  useEffect(()=>{
    //mtlb jaise he page render hoga 4 sec k baad loading false ho jayega as it is initally true
    setTimeout(() => {
      setLoading(flase);
    },400);

  },[])
    return (
    // iss k andar sbse pehle loading show krwana hai
    <>
    <div> 
        {isLoading ? <h1>Loading...</h1> : <>
                                        <div>
                                            <h1 className='order-Heading'>My Order</h1>
                                            {/* agar order ki length zero ho "You have not placed any order yet" else order details */}
                                            {/* agar myorders ki length zero hoti hai to */}
                                            {myorders.length === 0 ? 
                                                       <>
                                                       <h1>You have not placed any order yet</h1>
                                                       <link to="/">Start shopping</link>
                                                       </>
                                                    // agar  myorders ki length zero nai hoti hai to  hame apne order ko show krwana hai
                                                       :
                                                       <div className='orderListContainer'> 
                                                       {/* jo b item order hoga to usko map se traverse kr lenge as data change hota rahega jaise card bnaye the uss me product pass kiye the jaise cart bnaye the and map k through traverse k ek new component cartItem pe data pass kr diye the waise he yaha bhi krenge */}
                                                        {myorders.map((order,i)=><OrderDetail order={order} key={i}/>)} 
                                                                {/*jjitne b hmare orders hone wo sb ka design wo sb hum OrderDetail component me likhenge    */}
                                                       </div>

                                            
                                            }
                                        </div>
        
                                         </>
        
    } 

    </div>
    </>
  )
}

export default MyOrder