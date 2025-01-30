import React, { useEffect, useState, useCallback } from 'react'
import Navbar from './Navbar'
import Balance from './Balance'
import Wallet from './Wallet'
import Shop from './Shop'
import { useAuth } from '../Context/AuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from './Firebase'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'

function Dashboard() {
  const {id} = useParams()
  const { LogOut }= useAuth()
  const [username, setUsername] = useState()
  const [balance, setBalance] = useState()
  const [increaseBal, SetIncreaseBal] = useState()
  const [shopAmt, SetShopAmt] = useState()
  const Navigate = useNavigate()
  
  console.log(id)
  const getuser = async () =>{
    try {
       const User = await getDoc(doc(db, "User", id))
       if (User.exists()) {
        const userData = User.data(); // Extract user data
        setUsername(userData.Name); // Set the username
        setBalance(userData.Balance?.amount); // Set the balance
        console.log(User)
    } else {
        console.error("No such user document found!");
    }
    } catch (error) {
        console.log(error)
    }
  }


  const SignOut = async () =>{
     try{
      await LogOut()
      Navigate('/')
     }catch(error){
      console.log(error)
     }
  }

  const UpdateBalance = async (newBal) =>{
      try {
        const userref =  doc(db,'User', id);
        await updateDoc(userref,{
          "Balance.amount": newBal,
          "Balance.LastUpdate":Date.now()
        })
        setBalance(newBal)
      } catch (error) {
        alert("SomeThing Wrong In Updating Balance")
        
      }
  }

  const handleIncreaseBal = useCallback(() => {
    if (increaseBal <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    let bal = parseInt(balance)
    let increaseAmt = parseInt(increaseBal)
    const newBalance = bal + increaseAmt;
    UpdateBalance(newBalance); // Update in Firestore and state
    SetIncreaseBal(0); // Reset the input field
  }, [increaseBal, balance, UpdateBalance]);

  const handleShop = useCallback(() =>{
    let shop = parseInt(shopAmt)
    let bal = parseInt(balance)
    if(shopAmt <= 0){
      alert("Please Enter Valid Amount");
      return
    }
    const newBalance =  bal - shop;
    UpdateBalance(newBalance)
    SetShopAmt(0)
  },[shopAmt, balance, UpdateBalance]
)

  useEffect(()=>{
    if(id){
      getuser();
    }
    
    
  },[id])

  return (
    <div className="dashboard">
      <div className="sidebar">
        <Navbar username={username} SignOut={SignOut}/>

      </div>
      <div className="dashboard-content">
        <div className="content-1">
          <Balance balance={balance} />
          <Wallet increaseBal={increaseBal} SetIncreaseBal={SetIncreaseBal} handleIncreaseBal={handleIncreaseBal}/>
        </div>
        <div className="content-2">
          <Shop shopAmt={shopAmt} SetShopAmt={SetShopAmt} handleShop={handleShop}/>
        </div>

      </div>


    </div>
  )
}

export default Dashboard
