import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../authContext';
const SignUp = () => {
    const naviagte=useNavigate();
    const nameRef=useRef()
    const emailRef=useRef()
    const passwordRef=useRef()

    // so jo bhi hum name email password input me likhenge wo nameRef emailRef passwordRef me aa jayega
 //Ye line of code of last me padhna
 //////////////////////////////////////////////////////
 const {createUser}=useAuthValue();//context me ye wala function created hai
//  yaha hmara login /sign up page complete ho gya hai ab jaatte hai navbar me
 /////////////////////////////////////////////

    function handleSubmit (e){
           e.preventDefault();
           const data={
            name:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
           }
           
    //ye sb deatil aa gya data variable k andar ab isko bhej denge apne store k anadr i.e authContext 
    //so createUser signIn function ye sb authContext me create krenge hmlog. so abhi signup wala data hm createUser function me pass krenge
     createUser(data); 
     //so user create hote he means sign up hote he navigate kro login page pe
     naviagte("/Login")
    }
  return (
    <div className='container'>

        <div className='inputForm'>
            <h1>Sign Up</h1>

            <form action="" onSubmit={handleSubmit}>
                <input type="text" ref={nameRef} placeholder='Name' required/>
                <input type="email"  ref={emailRef} placeholder='Enter Email'required />
                <input type="password" ref={passwordRef} placeholder='Enter password'required/>
                <button>submit</button>
            </form>
        </div>
        
        
        
        </div>
  )
}

export default SignUp