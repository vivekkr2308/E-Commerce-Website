// In react as we have contextapi to store data of user then why we use firebase database to do ???

// ans: React's Context API is useful for managing global state within a React application, it's primarily meant for sharing data that can be considered as "global" or shared across components
// Firebase, on the other hand, is a real-time database that provides a cloud-based backend service to store and sync data in real-time.
// Firebase also offers features such as authentication, cloud functions, storage, and hosting, making it a comprehensive solution for building real-time applications

// Means context api is generally use to sharing data from global state to a particular component? 
// By using the Context API, you can avoid the prop drilling problem and make the data accessible to all the components that are interested in consuming it, without explicitly passing it down through every level of the component tree

// Then what about redux? ???
// Redux is a predictable state container for JavaScript apps, often used with React, but it can be used with any other view library as well. It helps manage the state of an application in a predictable way. Redux is particularly useful for managing larger and more complex application states, especially when the application state needs to be shared across multiple components.




// redux is same like context api????
// Redux and React's Context API serve similar purposes in that they both help manage and share state across a React application. However, they differ significantly in terms of their capabilities, use cases, and how they manage state.
import {createContext, useState} from "react";
import { useContext } from "react";//useContext imported
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore"; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//mujhe apne data ko add krna hai apne database(i.e firebase store) k anadr 
//so add krne k liye documentation me syntax hai uss k liye
//so uss k liye import krna padega collection,addDoc nichhe hai reference jo firebase me likha hua tha
// import { collection, addDoc } from "firebase/firestore"; 
//  Add a new document with a generated id.
// const docRef = await addDoc(collection(db, "cities"), {
//   name: "Tokyo",
//   country: "Japan"
// });
// console.log("Document written with ID: ", docRef.id);



//sbse pehle yaha se padho nichhe tak
const authContext=createContext(); //context created

// ye purra function ko last me padhna hai 
///////////////////////////////////////////////////////////
export function useAuthValue(){
    const value=useContext(authContext);
    //iss value k anadar jitne b hmare state hai, function jitne bhi create kiya hai wo sb iss k anadar aa gya hai
    return value;
} //yaha authContext complete ho gya hai ab jatte hai Login page pe
////////////////////////////////////////////////////////////////////


//function created iss function k anadar jitne bhi mere state and function jo authendication se related hoga we will write inside it.
//then main uss context ko provide krunga parent component ko

export function AuthContext (children){
    //now think jb koi user sbse pehle authendication krega to kaun kaun si
    //state declare honi chahiye
    //sbse pehle aap check kroge ki apaka website login hui hai ya nhi
    //so state is created for log in and log out
    const[isLoggedIn, setLoggedIn]= useState(false); //so sbse we will check ki website login hai ya nhi, so in initialy hamara login in false hai 
//mtlb user login nai hai
//then hum check kregenge , agar hamara website login hai to kaun sa user hai? kish user ne login kiya hai
//ye bhi check krna hai

//user who is logged in? foe this we created state
const [userLoggedIn, setUserLoggedIn]=useState(null) //initially hamara website login in nai hogi so "false" and userLoggedIn "null";


//created a state for list of user in our database 

const [userList, setUserList]=useState([]) //initially user ek b nai honge so empty



//so initially website pe login nai hai, hmare database pe ek b user nai hai 
//so kaise user ko hum insert kregenge apne database k andar
//now meko user create krna hai to,  now jaise he  website ko koi user open krega
//account create krega, then user ka details hmare database me save ho jayega
//now user ka deatil hum apne databse me kaise save krenge
//As we using firebase's database in this project we have to read firebase ka documentation to add user , remove, update user in this documentation.
// database created in firebase by import firebase store & get firebase store  
// through addDoc we will add user in our database


//createUser is created & iss me data pass kiye hai ye signUp page se aayega 
//async q ki user jb match nai kr rha to firebase databse me save user ka detail to uss ka syntax me await hai to functiion bhi async hona chahiye
async function createUser(data){      //signUp function
    //now yaha mil gya to hum yaha check krenge ki ye email id name hmare database me already created hai ya nai
    //agar created hai to ek pop message show krna hoga ki email already exit "please login here aur login ka link dena hoga"
    //agar user database me exit nai krta to signUp kraunga then main uss ka detail apne database me save krunga
   const index= userList.findIndex((user)=>user.email===data.email);
   // here we will ki sign up me jo detail aa rha hai wo database me exit krta hai ya nai
   //so hme user detail chahiye jo already data me hai wo kaha se milega wo userList se milega issse sarre user ka list aa jayega 
   //so uss me jo user.email hai usko match kr lenge jo sign up page se email input se aya hai
   //to waha se index mil jayega uss user ka then uss index ko check krenge if my index is  equal to -1 , it means  no user is matching with userList 
   //findIndex automatic generated index deta hai ye khud sb item looping krta hai ,array me se userList bhi to array he hai[0, 1, 2, 3,4 ] here index of 2 is 2 not 3
   //The findIndex() method of Array instances returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned. 
   //const array1 = [5, 12, 8, 130, 44];

// const isLargeNumber = (element) => element > 13;

// console.log(array1.findIndex(isLargeNumber));
// Expected output: 3
//it takes callback function 


//so if jo index return aaya wo -1 hai to no user exited
//agar index !==-1 index -1 se equal nai hai to to user already exit

if(index!==-1){
    //user exit hai to pop message show krwna hai to uss k liye 
    //npm i react-toastify ye install and import{ToastContainer, toast} kr rhe hai
   toast.error("Email Already Exit,Try to SignIn");
   return;
}


if(index==-1){
    //index=-1 means user match nai kiya userList se
    //so ab apne iss data(is user ka detail) ko save krunga apne database k anadar
    //for this we will use this syntax this is comin from firebase
    {/*const docRef = await addDoc(collection(db, "cities"), {
  name: "Tokyo",
  country: "Japan"
 }); */}

 //cities collection ka naam hai so hmlog music likh dete hai iss k jagah
 //name: ko data variable se jo name aa rha iss name me daal denge 
 //same waise he email and password  k liye

 const docRef = await addDoc(collection(db, "music"), {
    name: "data.name",
    email: "data.email",
    password:"data.password",
    cart:[],
    order:[],
    
    //jb bhi koi new user account create krega uss k cart/playlist me music/subscribed channel/order ek bhi oder of items cart me item kuch bhi nai rahega
//cart/playlist and order bhi empty rahega
//so jb user new account banayega to ye sb details save ho jayega firebase cloud database k andar
  });
//data save hone k baad hum ek message show krwayenge by toastify that account is created please login  
   
    toast.success("Account created succesfully, Login to continue ");

}

//ab dusra function create krenge signIn(same yahi naam se login page me function bnaye the) k liye , jub user sign in krega, user website pe login krega to uss k andar hum kya kya krenge
//signIn function k anadr data le rhe jo user input me email id and password likh rha hai jo login page me data variable k andar store kiye hua the wahi yaha le rhe iss function me

async  function signIn(data){
     //jb user sign krega to we will check ki user ka detail hamre databse me exit krta hai nai
     //agar user database me exit krta hai to tbhi login krega otherwise signUp page open hoga and usko signUp krna padega
     const index= userList.findIndex((user)=>user.email===data.email); //
     if(index==-1){
        toast.error("Email not Exit,sign up ");
       return;
        }
     if(userList[index].password===data.password){
     toast.success("Login Successfully");
    //so jb user ne website pe login successfully kr liya to  jo hum initial state create kiye the 
    //const[isLoggedIn, setLoggedIn]= useState(false); isko change kr k true krenge and
    //const [userLoggedIn, setUserLoggedIn]=useState(null) isko null se change kr k user k equal kr denge mtln jo user login kiya hai 
    //so ye  kaise pta chalega ki kaun user login kiya h ye to userList[index] me database se mil jayega
    setLoggedIn(true)
    setUserLoggedIn(userList[index])

    //the key benefits of using local storage in web applications that When the page is refreshed, the data stored in the local storage remains accessible, allowing the application to retrieve the stored data and continue functioning seamlessly without the need to fetch the data again from an external server.

    //iss k baad hum kya krenge , jo hmara local storage , browser pe bhi hum apana 
    //deatils hai  like tokens,index hai usko save kr denge apne browser pe bhi
    //local storage me data set krte time ek (token , value(value can be object / array anything))pass krte hai so iss value ko get or remove krna ho from local storage to we can do this from particular token /index;
    window.localStorage.setItem("token",true)
    window.localStorage.setItem("index",JSON.stringify(userList[index]));
    //json.stringify  jo hmara indexx hai, iss particular index se jo hmara userLIst hai wo index wala user localstorage me set/save ho jayega ho jayega
    return true;
  

    //agar hmara password match krta hai to hum ye sb upper wla chiz krenge but agar password match nai krt hai to
    //uss k liye condition kya hogi else uss k anadr ek meaasage show krwa denge

     }else {
        toast.error("wrong password");
        return false; 

     }



} //now ye function complete ho gya hai



//ye function hai sign out k liye
async function signOut (){
    //so jaise he hum sign out krenge user ki detail jo hum save local storage me save kari thi usko remove kr denge
    //so remove krne k set krte time jo token name diye the uss ko pass krne se he hoga
    window.localStorage.removeItem("token"); //here "token" is the particular key chabhi
    window.localStorage.removeItem("index"); //here "index" is the particular key chabhi
    

    setLoggedIn("false"); //setlogginIn false krna hoga
    setUserLoggedIn(null);
    toast.success("Sign out successfully");
}
//        yaha ye function complete hua



//ab sub function create ho ggya createUser,signIn,signOut ye sb function ko pass kr denge to
//hmare children k andar, uss k liye AuthContext function me children likha hua pass kr denge upper me dekho kaise
//so jinte bhki function create kiye yaha usko export kr dete hai apne childrens me by using
//context Provider and value k andar hmlog kuch pass kr skte hai like object,array,function,string,number so pass krna hai ye sb ko children k anadar


return (
    <>
       {/* value sb to provide kr diye ab ye sb value ko consume krna hai means lena hai uss k liye useContext ka use krenge
   so  uss k liyr import krnge useContext then ek function bna lete hai useAuthValue iss k andar
   useContext(iss me create context wala naam) = value then value ko return and then function ko export 
   ab jish bhi componenet me context ka value access krna hai to iss function kaa naam ko import kr lenge in a particular component */}
    < authContext.Provider value={{createUser,signIn,signOut,isLoggedIn,setLoggedIn,setUserLoggedIn}}>
        <ToastContainer/>
        {children}
    </authContext.Provider>

    
    </>
)

} 


}