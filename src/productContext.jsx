//sbse pehle context create
import { createContext, useContext, useEffect, useState } from "react"; //imported
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuthValue } from "./authContext";//imported this to get isLoggedIn
import { arrayUnion, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import {data} from "./components/data" 


export const productContext=createContext();//created

//iss context ko hum alag alag component me use krenge to uss k liye ek function 
//bna lete hai iss function ko he import kr lenge in a particular componenet 
//use the data by distructuring 


//iss function ko he hmlog import krenge jaha product se related functionality chahiye
//same jaise hum useAuthValue naam se function bnaye the
export function useProductContext (){
    const value=useContext(useProductContext);
return value;
}

 export function ProductContext (children){

 //isko last me padhna hai
 ///////////////////////////////////////////////////



 useEffect(()=>{
//to jaise he user ne login kiya, to sbse pehle mujhe token chhaiye, jo ki localStorage se milega
 const token=window.localStorage.getItem("token");
 //agar mera token true hai to isloggedIn hai usko b true kr dunga then
 //jish user ne login kiya hai usko data me set kr dunga

 if(token){//if token is true
    //I will get first from here
    const index= window.localStorage.getItem("index");
    const user=JSON.parse(index); //yaha se mujhe user mil gya
    //ab apne login me token ko & userLogin me user ko add krna hai
    isLoggedIn(token);
    setUserLoggedIn(user); //setUserLoggedIn is imported from useAuthValue context 
 }

 },[])//iss se kys hoga ki user hmara login krega to user hai wo set ho jayega hmare state me 

//now ab me kya chahti hu ki jbtak mera user login rhe to tabtak to mera items bhi real time update hota rhe
//uss k liye again useEffect bna lete hai

useEffect(()=>{
    //so first check user logged in?
    if(isLoggedIn){// user login true
//so jbtk user login rahega to sbse pehle item ko fetch krwaunga database se and ussko 
//real time pe update krtA jaunga

//main data ko kaise access krunga using snapshot so for this we have to import import { db } from "./firebase";
//import { collection, addDoc } from "firebase/firestore";  from firebase
  const unsub =onSnapshot(doc(db,"music",userLoggedIn.id),(doc)=>{
       setCart(doc.data().cart); //item fetch & cart k andar set
       setMyOrders(doc.data().orders);
  });
let sum=0;
cart.map((item)=> Number(sum+=item.price));
 } 

},[userLoggedIn])//ye jbtk user login rhega tb tak he chalega so userLoggedIn ko import kr lenge from useAuthValue se 



///////////////////////////////////////////////////////////////////////////////////////////////



// yaha se padhna start kr skte hai

    //cart k liyye
//kitne item hai hmare cart k andar iss k liye state declare krenge
//total amount kitna hai iss k liye hum state declare krenge
const {isLoggedIn,setUserLoggedIn,setLoggedIn,userLoggedIn}=useAuthValue(); //yaha se isLoggedIn mkil gya so isko addToCart wala me function check krenge ki user login hai ya nai
const[itemInCart,setItemInCart]=useState(0); //hmesa state create krenge jbbhi ui me data pehle kuch aur show kr rha usko check kr k kuch aur show krwna ho waha to here initially itemIncart :0 then setItemInCart se usko change krenge onclick function pe
const[cart,setCart]=useState([]); //inially hmara cart empty hai 
const[total,setTotal]=useState(0);//initially 0
const[myorders,setMyOrders]=useState([]);//initially empty items
//so ye sb initially declare krne se UI pe ye sb show krega 
//state to declare ho gya ab bahut sarra functionality likhna hoga to change the state


//ab yaha bahut sarre functionality ki likhna hai
//1. jaise he main kissi product ko add krte hai to kya hoga, ye function hmara product ko
//cart me add kr dega

//so hmlog iss me pass kr denge product and ye product jo hai wo add to cart button click krne pe wo particular product yaha aayega
async function addToCart (product){
//aur iss fuction ko hum jb home page ko render krwayenge tb home page se he call krenge and uss pass kr denge product

//so kissi product ko add krne se pehle ye check krenge ki user login hai ya nhi 
//so for this humko chahiye isLoggedIn state ye humko authContext se milega so uss k liye  useauthVlue wala function ko import krna padega 

//if user loggedIn nai hai to

if(!isLoggedIn) {
    toast.error("Please Login First");
    return;
}

//agar login hai to nichhe wala code chalega else ya if me likhne ki jarurat nhi hai ki if login hai to 
//but user login hai to now apne product ko cart me add kr payenge
//hmare pass bahut sarre product hai home page k anadar  to mujhe kisi particular product ko add krna hai to uss 
//k liye uss product ka index chahiye similarly jaise UserList se ek particular email id wala user ko match krna tha ki user database me exit hai ya nai 

const index=cart.findIndex((item)=> item.name===product.name);//iteam me ek particular product hai uska index mil jayega yaha
//agar index -1 nai ata hai to wo particular product cart me pehle se he hai so pehle se hai to uski quantity increase krenge ek function se i.e increaseQuantity and ye function onClick on button + pe lga denge 
if(index!==-1) {
   //so yaha -1 index nai aaya hai to ye particular product pehle se cart me hai
    increaseQuantity(cart[index]); //increaseQuantity function me cart[index] pass kr denge,ye function bnayenge upper
    return;
}

//but hamara item already cart k andar paresent hai to ye b ho skta hai ki cart me pehle se aur b item hai to uss k ye wala item b combine kr denge 
 //cart ko update krna hai

  
const userRef= doc(db,"music",userLoggedIn.id); //this is comong from firebase 
await updateDoc(userRef, {
    cart:arrayUnion({quantity:1,...product})
});

//so jaise he item ko cart me daalenge amount b increase ho jayega
setTotal(Number(total+product.price));
//no of items in cart wo bhi increase ho jayega, initially zero hai
setItemInCart(itemInCart+1);//initially itemInCart zero hai
toast.success("added to cart");

}
 async function increaseQuantity (product){
    //product to iss function ko milla but product to bahut sarra rahega 
    //so ye sb product me se pta krna hai ki wo kaun sa product hai jo add kre ki qunatity incraese ho
    const index=cart.findIndex((item)=> item.name===product.name); 
    //and index milne k baad uss particular item ko update kr denge
    //uss item ki quantity ko increase kr denge
    cart[index].quantity++;
    setCart(cart)
//isko hum apne database me kaise add krenge 

  
const userRef= doc(db, "music",userLoggedIn.id); //this is comong from firebase 
await updateDoc(userRef, {
    cart:cart
});
setItemInCart(itemInCart+1);
setTotal(Number(total+product.price));
 



}




async function decreaseQuant (product){
    //product to iss function ko milla but product to bahut sarra rahega 
    //so ye sb product me se pta krna hai ki wo kaun sa product hai jo minus kre ki qunatity decraese ho
    const index=cart.findIndex((item)=> item.name===product.name); 
    //and index milne k baad uss particular item ko update kr denge
    //uss item ki quantity ko decrease kr denge
    cart[index].quantity--;
    setCart(cart)
//isko hum apne database me kaise add krenge 

  
const userRef= doc(db, "music",userLoggedIn.id); //this is comong from firebase 
await updateDoc(userRef, {
    cart:cart
});
setItemInCart(itemInCart-1);
setTotal(Number(total-product.price));
 



}




 //function to remove from cart
 async function removeFromCart(product){
    const userRef= doc(db,"music",userLoggedIn.id);
    await updateDoc(userRef, {
        cart:arrayRemove(product)
    });
   setTotal(Number(total-(product.quantity*product.price)));
   setItemInCart(itemInCart-product.quantity);
   toast.success("Item Removed Successfully");
 }
//function to create all the items from the cart
 async function clearCart (){
    //first we will check ki cart me item hai ya nahi
    if(itemInCart===0){  //agar cart me item zero hai tb
    toast.error("Nothing to remove in cart");
    return;
    }
    //now database se bhi update kr denge that cart empty and also total price 0
    const userRef= doc(db,"music",userLoggedIn.id);
    await updateDoc(userRef,{
        cart:[]
    })
    setTotal(0);
    setItemInCart(0);
    toast.success("Empty Cart !!!");

 }


 // function for that when we click on buy button/purchage all order placed message come & items should show in my order to show details that what we bought
 async function purchageAll(){ //or buy button function
    const currentDate= getDate(); //to get the current date jish din norder kiye uska detail k liye
//yaha se current date mill jayegi
// database se data update kr denge
const userRef= doc(db,"music",userLoggedIn.id); //this is comong from firebase 
await updateDoc(userRef, { //here we are updating the order uss me date ko currentDate k equal list ko cart k equal amount ko total k equal
    order:arrayUnion({date:currentDate,list:cart,amount:total})
});// order page k andr 3 chiz hai date kish date ko item ko purchage kiya hai,cart, kitna total amount ho  rha hai
 clearCart(); //cart se sb item order page me aa gya to cart me kuch nai bacha to cart will b empty
 } //function completed




 //function for the current date ko access krna hai to

function getDate (){
    const date=new Date();
    let days=date.getDate();
    let months=date.getMonth()+1;
    let year=date.getFullYear();
     return (`${year}-${months}-${days}`)
}


//ab agar meri website login hai user ne login kiya hai jbtak tbtak mera product real time me upadate hota rhe
//uss  k liye useEffect me code likhenge  uppr me likh rhe hai wo





//now yaha hum jitne bhi  function ,state declare kiye hai wo pass kr children ko 

return(  //data iska ek dusra file se aa rha h yaha and yaha se data send ho rha but hmare case me we will fetch through axios 
    <productContext.Provider value={{data,addToCart,cart,total,setTotal,removeFromCart, clearCart,purchageAll,increaseQuantity,decreaseQuant,itemInCart,myorders }}>
        {children}
    </productContext.Provider>
)//sb pass ho gya chalo ab home page ko design kiya jayye



}
