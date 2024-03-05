
// Navbar-- navbar link created by <NavLink to={"/path"}>.for we have to install and import react router dom.
// In navbar we have to apply some condition to hide or show button like when website open there should be login button but when login is done by the user there should be log out button in place of login button. So for this we will  use context api or router i.e state management . we will create context by create createContext in separate file in which we will all the state and function there and through context.Provider we will provide everything to parent componenet (through value props)i.e app componenet. Now whenever any want this date we can easily send them. for this we have to write useContext in required componenet. 
// .authContext.js we will create in our project- authendication's state and function we will write here

// .jaise koi user application ko open krega to kya krega sign in , sign out, account bnayega sign up krega  uss k baaad sign in krega so isse related jitne bhi function state we will write here

// FireBase 
// we are using firebase for database and userAuthendication. 
// in firebase we have to create database then we will install firebase in our project.
// . create project in firebase
// .install firebase in project by npm install firebase 
// create firebase.js in project and paste code from firebase  here.
// now firebase is connected to our project.

// now we will database in firebase from option firebase databse
    
////////////////////////////////////////////////////////////////



import React from "react";


import { NavLink } from "react-router-dom";

import { useAuthValue } from "../../authContext"; //imported here

const Navbar = () => {
// abhi hmlog aaye hai login page and sign up page ko complete kr k yaha 
// so yaha condition kya hai ki jb hmara login hogi tabhi cart/order/playlist/aurkuch  option visible hongi
// aisha condition lgane k liye isloggedIn and signOut ko ko le lenge from context and in context sb useAuthValue function me sb hai
// so isko call kr le lenge
const [isloggedIn,signOut]=useAuthValue(); //yaha se de data le rhe hai
//ab hum kya chahte ki agar user login nai hai to home pag mtlb navLink wala ,explore,upgrade wala ya jo bhi jo without login pe bhi wo sb dikhaye uss me kuch condition nai lagayenge 
// but cart,playlist,my order , payment ye sb kb visible hoga jb user login ho 
//so suppose ye wala navLink tabhi visible ho jb user login ho to

//{isloggedIn &&
{/*<NavLink to={"/Playlists"}>
 <MdOutlinePlaylistPlay className="navbtn" />
<p className="hidden lg:flex text-[22px] font-bold">Playlists</p>
</NavLink> */}

//}
// mtlb ki isloggedIn agar true hai to && k baad wlaa option tabhi visible hoga so ye wala kissi b link ko chahiye to usko {  isloggedIn &&  koi bhi link ko yaha  } iss k andar likh denge
 {/* { isloggedIn &&
     <NavLink to={}>

     </NavLink>
} */}










  return (
    <div className="navbarContainer">


    
      <div className="appName">
      {/* whenever I click on this logo, it will redirect to home page */}
      {/* "w-7 h-7 hover:scale-110" duration-200 ease-out*/}
        <NavLink to={"/"}>
          <div>FOOD</div>
        </NavLink>
      </div>



    
       <div className="navLinks">
        
          <NavLink to={"/"}>
            <span className="navbtn">
              {/* <i className="fa-solid fa-house"></i> */}
              Home
              </span>
            
          </NavLink>
{/* condition applied here */}
        {isloggedIn && <NavLink to={"/myorder"}>
            <span className="navbtn">
              {/* <i className="fa-solid fa-house"></i> */}
              My Order
              </span>
            
          </NavLink>}

       {isloggedIn &&   <NavLink to={"/cart"}>
            <span className="navbtn">
              {/* <i className="fa-solid fa-house"></i> */}
              cart
              </span>
            
          </NavLink>}



       






      </div>
      


    
     {/* agar meri website login nai hai to usko login krwaunga but meri website login hai to usko home page pe bhejunga */}
     
      {/* jb mera website khule to login dikhe navbar me but jaise he login krdu to login in ki jagar log out waha button visible kre 
         to uss k  liye 
         <NavLink to={!isloggedIn ? "/Login" : "/"}>

               {!isloggedIn  ?  <>
                              <div>----agar website login nai--
                                 <div>---to wala button code visible-----
                               </>   :   <>
                                     div---agar login hai to yaha wala 
                                          code visible----
                                        div-----
                                         </>
               }
      
      */}

 <NavLink to={!isloggedIn ? "/Login" : "/"}>
       {!isloggedIn  ?
        <>
      <div className="btn-Container">
        <button className="login-Btn">LOG IN</button>
      </div> 
      
       </> : <>

      <div>
        <button className="logout-btn" onClick={signOut}>LOG Out</button>

              {/* ye signOut function hum context se le rhe hai wahi hum create kiye hai wha kya kya lihe hai dikha deta hu 
                async function signOut (){
               //so jaise he hum sign out krenge user ki detail jo hum save local storage me save kari thi usko remove kr denge
              //so remove krne k set krte time jo token name diye the uss ko pass krne se he hoga
              window.localStorage.removeItem("token"); //here "token" is the particular key chabhi
              window.localStorage.removeItem("index"); //here "index" is the particular key chabhi
              setLoggedIn("false"); //setlogginIn false krna hoga
              setUserLoggedIn(null);
              toast.success("Sign out successfully");
                 } */}
       </div> 
               </> 
        }

  </NavLink>


    </div>

    );
};

export default Navbar;




    //  login and log out to gya tha ab yaha mera navbar bhi complete ho gya hai like hum apne data ko kaise save krte hai database k andar, fetch kaise krte hai  
    //  sign in kaise krenge,sign out kaise krenge ye sb complete ho gya hai
    //  ab hum dekhenge ki home page ko kaise dikhayenge 
    //  home page k andar ek search input hai , filter button hai ,products hai
    //iss baad hum cart page bnayenge ,myorder page bnayenge aur jaise he my order button click kr rhe to pehle loading show kr rha to uss k liye loader dikhayneg 
    //error ka bhi page bnayenge for ki hum unwanted url pe click ko url me likho to error page show ho 
    //home page,cart page,myorder page rehte hai
    //so ab hum app.js file k andar jate hai navbar,login,signup kpage ko dalte hai
 