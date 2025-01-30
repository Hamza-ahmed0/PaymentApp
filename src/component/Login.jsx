
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router'


function SignIn() {
      const [email, setEmail] = useState()
      const [password, setPassword] = useState()
      const [err, setErr] = useState("")



      const {LogIn, user} = useAuth()
      const navigate = useNavigate()



      const handleLogin = async (e) =>{
       e.preventDefault()

       if(!email || !password){
           setErr("All fields Required")
           return
       }

       try {
           await LogIn(email, password)
           navigate(`/dashboard/${user.uid}`)
           setEmail('')
           setPassword('')
       } catch (error) {
           setErr("Invalid Email or Password")
           console.log(error)
           
       }

      }

     
      return (
          <div className='signIn'>
            <h1>PayFor</h1>
  
              <form className='signIn-form' onSubmit={handleLogin} >
                  <h1>Sign In</h1>
                  <p>Your account</p>
                  <div className='input-container'>
                      <label>Email</label>
                      <input placeholder='Email' value={email} onChange={(val)=>setEmail(val.target.value)}/>
                  </div>
                  <div className='input-container'>
                      <label>Password</label>
                      <input placeholder='Password' type='password' max={16} value={password} onChange={(val)=> setPassword(val.target.value)}/>
                  </div>
  
                  <div className='btn'>
                       <p className='error'>{err}</p>
                      <button type='submit'>LogIn</button>
                      <p>Get Account? <Link to="SignUp">SignUp</Link></p>
                  </div>
              </form>
          </div>
      )
  }

export default SignIn
