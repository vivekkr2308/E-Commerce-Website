import React from 'react'
//so ProductContext me jo product fetch kiye wo data k naam se hai usko hum yaha lenge, so useProductContext iss function ko import kr lenge 
import {useProductContext} from "../productContext"

const MainContent = (props) => {
    const data=useProductContext();//here we are taking the data from useProductContext
   
    console.log(data);
    
    const {search,price,category,applyFilter}=props; // //we getting these from home componenet through props
  return (
    <div className='item-container'>
    {/* jo data hmare pass ayega, iss k andar sarre items hai aur harek item ka khud ka image name price ye sb hoga 
    so jo data milega uss me se hum filter krr denge price k according , category k according, search k according */}

     {data.filter((item)=>{
        //so hum yaha pe return kr dete hai jo item hum search krenge uss k according he item return kre
        //koi serach me kuch b likhe wo sb search me store ho rha jo home component me bnaye hai ussi ko yaha layye hai by props
        //so search.toLowerCase mtlb pehle usko lower case me kr liye then ye agar empty string k equal hai to hum jitne b item hai wo sb show krwa denge jitne b data me hai #else item me jo search me include hai wo 
        return search.toLowerCase()===" "? item : item.name.toLowerCase().includes(search);
        //search k liye filter complete ho gya, ab iss k baad yaha se b jo item milenge usko b filter k dete hai uss k according ki agar mera applyFilter false hai to sarre item visible honge else true to return jiska price 5000 se equal ya usse km hai
     }) .filter((item)=>{
          return !applyFilter ? item : //will show whole item
          item.price<=price
          //iss k baad b hum filter lgate hai to filter according to category
          //agar mera applyFilter true hai ya or categorry none k equal hai to item show krwayenge otherwise  item jiski category category input k equal hai  
     }) .filter((item)=>{
         return !applyFilter || category==='none' ? item : item.category===category
     })//aur yaha se jo item milega uss me map kr denge aur yaha se jo item milega usko usko pass kr denge ItemCard component ko
     //jo item hum filter kr k milega usko pass kr itemCard component k andar
     .map((item)=>{
        <ItemCard key={item.id} item={item}/>
     })
     //yaha hmara mainContent complete ho gya ab bnayenge ItemCard
     //ItemCard bnane k baad hmara home page complete hojayega
     
     }
    </div>
  )
}

export default MainContent