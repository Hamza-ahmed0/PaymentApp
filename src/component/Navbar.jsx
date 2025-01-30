import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";

function Navbar({username, SignOut}) {
  return (
    <div className='navbar'>
        <ul>
            <li>
                <h3>PayFor</h3>
            </li>
            <li>
                <FaRegCircleUser/>

            </li>
            <li><h5>{username}</h5></li>
        </ul>
        <div className='btn' onClick={SignOut}>
          <button>Logout</button>
        </div>
      
    </div>
  )
}

export default Navbar
