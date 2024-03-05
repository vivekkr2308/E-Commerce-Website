import React, { useEffect, useState } from 'react'
import MainContent from './MainContent';

//AuthContext k andar hmara sarra user se realate state function create kiye the hmlog
//hmlog ek aur context create krenge for the product so that will be product context
//iss k anadr rahega that add to cart button pe click krne pe hmara wo particular product cart me ja k add ho jayye iska functionality likhenge
// aur ye bhi add cart me remove from cart button pe click kre to wo product cart se remove ho jayye
//cart me product ka quantity increase decrease bhi kr skte 
//ye sarre functionality product context me rahega
//aur need k according we will import here

const Home = () => {
//so sbse pehle home page me kya hoga sbse pehle to loading show krega the data 
//so uss k liye bhi state declare krna padeega bcz ui pe show hota hai na
const [isLoading,setLoading]=useState(true);//initially true hoga
//apply filter button hai ui me usko click krne pe filter apply k liye ui me ek baar khulta hai uss me hai category,women men,price se related filter krne k liye 
//so initially filter false rahega tabhi to sarra item show krega but when true hoga to filtered k according data show hoga so uss k liye b state bnana padega 
const [applyFilter,setApplyFilter]=useState(false);
const [price ,setPrice]=useState(5000)//mtlb jaise he hum apply filtrer pe click krenge to wo item show honge jo 5000se below hai ya ussse equal hai
const [category,setCategory]=useState('none'); //initially none hogi 
const [search,setSearch]=useState('');//initiall search k anadar kuch nahi hai ,mtlb kuch b character nhi hai

//so sbse pehle loading dikhaye tho uska wla cose useeffect me likhna hoga qki 
//jb bhi rendering hota hai to sbse pehle useeffect k anadr wala code chlta hai

useEffect(()=>{
  //mtlb jaise he page render hoga 4 sec k baad loading false ho jayega as it is initally true
  setTimeout(() => {
    setLoading(flase);
  },400);

},[])

   





  return (
   <>
    <div>
      {/* isLoading initially true hai to loading show kr rha then 4 sec k baad home page wala content */}
      {isLoading? <h1>Loading....</h1> :   // : (else) iss k baad home page ka content
      
          <>
         <div>
            {/* initially search ki value search hai but jaise he input me kuch likhnege wo chnage hoga we can know this through onchange*/}
            <input type="text" placeholder='search item ' value={search} onChange={(e) => {
              setSearch(e.target.value);
            } } />

            {/* firstly aaplyFilter agar true hai to cancel dikhao else applyfilter dikhao
    and onclick pe setApplyFilter(!applyFilter) iska mtlb hua ki jb bhi iss button pe click kru to agar applyFilter show kr rha to cancel dikhaye or cancel dikha rha to applyfilter dikhaye */}
            <button onClick={() => { setApplyFilter(!applyFilter); } }>
              {applyFilter ? "cancel" : "applyfilter"}
            </button>

          </div>
          {/* //applyFilterBar 
          jb hmara applyFilter true hoga tabhi applyFilterBar show hoga */}

            <div > 
             {/* jb mera applyFilter true hoga tb mujhe  FilterBar show hojayeega
             iss bar k anadar price hai,category hai a/c to mens ,womens to ye sb yaha se pass kr dete hai waha props k through le lega  */}
               {/* ab iss FilterBar componenet  bna lete hai then us me price , category le lenge */}
             {applyFilter && <FilterBar  price={price} setPrice={setPrice} setCategory={setCategory}/>}
            </div>
          {/* //ab yaha hmlog ko main content product wala design krna hai , MainContent componenet ko he import kr liye 
          aur iss mainContent k anadar he mere sarre item present honge  */}
          {/* aur iss me search pass krunga so jish b particular item k liye search kru ussi k according  item show ho */}
            {/* price b pass krunga so that ki price k according hmara item show ho */}
            {/* same category  k according */}
            {/* applyfilter b pass kr denge */}
            <MainContent search={search} price={price} category={category} applyFilter={applyFilter}/>
            {/* ab hum apne MainContent component k anadr jate hai aur ye sabhi chiz ko le lete hai through props */}
            </>
      
      
      
      
      
      
 }










    </div>
   </>

  )
}

export default Home