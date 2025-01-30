import React, { useState } from 'react'

function Wallet({increaseBal, SetIncreaseBal, handleIncreaseBal}) {
    const [wallet, setWallet] = useState(false)

    const handleButtonClick = () => {
        if (wallet) {
          // If the input is visible, trigger the handleIncreaseBal function
          if (increaseBal && increaseBal > 0) {
            handleIncreaseBal(); // Call the increase balance handler
            setWallet(false); // Hide the input field after the balance is updated
          } else {
            alert('Please enter a valid amount to increase the balance.');
          }
        } else {
          // If the input is not visible, show it
          setWallet(true);
        }
      };
  return (
    <div className='increase-wallet'>
        <h1 style={{color:'black'}}>Increase Balance</h1>
        {wallet ? <input placeholder='Enter Amount' className='amount-inp' value={increaseBal} onChange={(e)=>SetIncreaseBal(e.target.value)}/> : ""}
        <div className='btn' onClick={handleButtonClick}><button>{wallet ? "Submit" : "Add Amount"}</button></div>
    </div>
  )
}

export default Wallet
