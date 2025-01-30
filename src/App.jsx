import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './component/Dashboard'
import SignIn from './component/Login'
import SignUp from './component/SigUp'
import { Routes , Route} from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<SignIn/>} />
      <Route path='SignUp' element={<SignUp/>}/>
      <Route path='/DashBoard/:id' element={<Dashboard/>}/>
     </Routes>
    </>
  )
}

export default App
