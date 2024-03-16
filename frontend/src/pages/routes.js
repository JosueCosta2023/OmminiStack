import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Logon from "./Logon"
import Register from "./Register"
import Profile from './Profile'

function AppRouter(){
    return(
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Logon/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          {/* <Route path='/incidents/new' element={<Profile/>}/> */}
      </Routes>
  </BrowserRouter>
    )
}

export default AppRouter