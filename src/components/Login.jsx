import React, { useRef, useState } from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
//import UseAuthValue function iss function k anadar jo value variable hai uss k anadr he to sb hai
import { useAuthValue } from '../authContext'

 const Login = () => {
    const navigate=useNavigate() 
    // const [email,setEmail]=useState();
    // const [password,setPassword]=useState();
    // or
    const emailRef=useRef();
    const passwordRef=useRef();
    // variable is created we will use it in input

//iss line of code ko last me padhna 
/////////////////////////////////////////////////////
 const {SignIn}=useAuthValue(); //aishe he same signUp wale page me krenge
//////////////////////////////////////////////
    //handleFunction is created 
    async function handleSubmit (e){

        //jb hum submit button pe click krenge to page refresh nai ho uss k liye 
        e.preventDefault();
        {/*so jo bhi user input emial  & password me likhega usko hum store kr rhe email & password me
        so jo bhi email password me aayega usko data variable me dal denge & iss data variable ko pass kr denge , jb user ko create krenge
    apne database k andar*/}
    const data={
        email:emailRef.current.value,
        password:passwordRef.current.value,
        // now email and password data k anadr aa gya hai
    }
  

   const status= await SignIn(data);
    //await here ki wait kro till email password ka detail data variable me aane tak as we r using firebase databse so aane tak we are waiting
    //so ye SignIn function hai isko hum apne authContext file k anadar create kenge, as we have created authcontext to store all the data related to auth
    //so authContext me create krne k baad import kr lenge useAuthValue wala function iss k andar he to value variable anadar sb hai
    //so ye wala function call kr lenge yaha and uss me se signIn function le lenge dekho aishe const {signIn}= useAuthValue()

     //so jo email & password hame milega usse user login kr lega to usss k baadd mera home visible hoga so uss k we use useNavigate from react router dom or user ka email id password wrong hai to login page he visible hoga
     {status ? navigate("/") : navigate("/Login")}
    //  if status is true to naviagte to home page & if email or password is incorrect then navigate to login page
   

    //now iss SignIn function ko add krna hoga authContext me
    //ab mujhe authContext file me jana hai uss me signIn, createUser ye function SignUp wale page me hai ,,, ye sb function create krenge sath sath signout k liye bhi function krna hoga
}


  return (
    <div className='container'>
        {/* main div */}

       <div className='inputForm'>
        <h1>Login In</h1>
    {/* jb submit button pe click hoga usko handle krega handleSubmit function */}
        <form action=" " onSubmit={handleSubmit}> 
            
            <input type="email" placeholder='Enter Email' required ref={emailRef} />
            <input type="password" placeholder='Enter Password' required ref={passwordRef} />
       {/* a submit button is created so when we click on it iss pe click krte he
        whatever details enter by user that will save in our database 
        so two variable/state create krte hai for email and password 
        onChange pe input me jo bhi user detail likhega usko iss variable/state me store kr lenge 
        by setState () call in handleSubmit function  
        

        hmlog ye kaam useRef k through b kr skte hai
        
        */}
 
 <button>Submit</button>

        </form>

        <br />
        {/*  &nbsp;  isse line break nai hoga or k baad */}
        <span>or &nbsp; </span> 

        <NavLink to={"/SignUp"}>Create New Account</NavLink>
        

       </div>




    </div>
  )
}

export default Login;

//so jaise he hum form (submit button) pe click krenge to handleSubmit function call hoga  then email and password ka detail data variable k anadar aa jayega and iss data ko hum pass kr rhe apne SignIn function me jo ki authContext me create kiyaa hua hai & jaise hmari website login hogi naviate hojayeega home page pe otherwise login page
