import React, { useState, useEffect } from 'react'
import { useAuth } from '../Context/AuthContext'
import { Link, useNavigate } from 'react-router'

function SignUp() {
    const [name, setName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [err, setErr] = useState("")



    const { signUp, user} = useAuth()
    const navigate = useNavigate()


    const handleSignUp = async(e) =>{
        e.preventDefault()
        setErr('')

        if(!email || !name || !lastName || !password || !confirmPass){
            setErr("All fields Required")
            return;
        }


        if(password.length < 8){
            setErr("Password Required max 8 characters")
            return
        }
        if(password !== confirmPass){
            setErr("Password Not Match")
            return;
        }

        let FullName = name +" "+ lastName

        try {
          await signUp(FullName, email, password);
        
            

        } catch (error) {
            setErr("Failed to create user")
            console.log(error)
            
        }

    }


    useEffect(() => {
        if (user) {
          navigate("/");
          alert("Signup successfully");
        }
      }, [user, navigate]);

  

    return (
        <div className='signup'>
            <h1 className='logo-head'>PayFor</h1>

            <form className='signup-form' onSubmit={handleSignUp}>
                <h1>Sign Up</h1>
                <p>Get Your account</p>
                <div className='input-container-1'>
                    <div style={{display:'flex', flexDirection:'column', width:'190px'}}>
                        <label>First Name</label>
                        <input placeholder='Name' value={name} onChange={(val)=>setName(val.target.value)}/>

                    </div>


                    <div style={{display:'flex', flexDirection:'column', width:'190px'}}>
                        <label>Last Name</label>
                        <input placeholder='Last Name' value={lastName} onChange={(val)=> setLastName(val.target.value)}/>

                    </div>

                </div>
                <div className='input-container'>
                    <label>Email</label>
                    <input placeholder='Email' value={email} onChange={(val)=>setEmail(val.target.value)}/>
                </div>
                <div className='input-container'>
                    <label>Password</label>
                    <input placeholder='Password' type='password' min={8} max={16} value={password} onChange={(val)=> setPassword(val.target.value)}/>
                </div>
                <div className='input-container'>
                    <label>Confirm Password</label>
                    <input placeholder='Password' type='password'min={8} max={16} value={confirmPass} onChange={(val) => setConfirmPass(val.target.value)}/>
                </div>

                <div className='btn'>
                     <p className='error'>{err}</p>
                    <button type='submit'>SIGNUP</button>
                    <p>Already SignUp? <Link to="/">LogIn</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignUp
