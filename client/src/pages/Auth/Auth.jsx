import React,{useState} from 'react'
import './Auth.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AboutAuth from './AboutAuth'
import icon from '../../assets/logo.svg'
import { signup,login } from '../../actions/auth'
const Auth = () => {
    const [isSignup,setIsSignup] =useState(false)
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const dispatch=useDispatch();
    const navigator=useNavigate();
    const handleSwitch=()=>{
      setIsSignup(!isSignup)
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(!email && !password){
        alert("Enter email and password");
      }
      if(isSignup){
        if(!name){
          alert("Enter a name to continue")
        }
        dispatch(signup({name,email,password},navigator));
      }
      else{
        dispatch(login({email,password},navigator));
      }
    }
  return (
   <section className='auth-section'>
    {isSignup && <AboutAuth/>}
    <div className='auth-container-2'>
      {!isSignup && <img src={icon} alt='stack overflow' className='login-logo' width="50"/>}
      <form onSubmit={handleSubmit}>
        {isSignup &&(
          <label htmlFor='name'>
            <h4>Display Name</h4>
            <input type='text' id='name' name='name' onChange={(e)=>{setName(e.target.value)}}></input>
          </label>
        )}
        <label>
          <h4>Email</h4>
          <input type='email' name='email' id='email' onChange={(e)=>{setEmail(e.target.value)}}></input>
        </label>
        <label htmlFor='password'>
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <h4>Password</h4>
          { !isSignup &&<p style={{color:"#007ac6", fontSize:"13px", paddingTop:"9px"}}>Forget password? </p>}
          </div>
          <input type='password' name='password' id='password' onChange={(e)=>{setPassword(e.target.value)}}></input>
          {isSignup && <p style={{color:"#666767", fontSize:"13px"}}>Password must contain at least eight<br/> characters including at least 1 letter and 1<br/>  number</p>}
        </label>
        { isSignup && (<label htmlFor='check'>
          <input type='checkbox' id='check'></input>
          <p style={{ fontSize:"13px"}}>Opt-in to receive occasional, <br/> product updates,user research invitations,<br/>company announcements,digests  </p>
        </label>)}
        <button type='submit' className='auth-btn'>{isSignup?'Sign up':'Log in'}</button>
        {isSignup && (
        <p style={{color:"#666767", fontSize:"13px"}}>By clicking "Sign Up", you agree to our 
          <span style={{color:"#007ac6"}}> terms of <br/>services</span>,
          <span style={{color:"#007ac6"}}> privacy policy</span> and
          <span style={{color:"#007ac6"}}> cookie policy</span></p>
        )}
      </form>
      <p>
        {isSignup ? "Already have an account?":"Don't have an account?"}
        <button type='button' className='handle-switch' onClick={handleSwitch}>{isSignup?'Log in':'Sign up'}</button>
      </p>
    </div>

   </section>
  )
}

export default Auth