import React, { useState } from 'react'

function Shop({shopAmt ,SetShopAmt, handleShop}) {
    
  return (
    <div className='shop'>
        <h1 style={{color:'black'}}>Shop</h1>
        <input placeholder='Enter Amount' value={shopAmt} onChange={(e)=>SetShopAmt(e.target.value)}/>
        <div className="btn" onClick={handleShop}><button>Shop</button></div>
      
    </div>
  )
}

export default Shop
