import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Logon from "./Logon"
import Register from "./Register"

function AppRouter(){
    return(
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Logon/>}/>
          <Route path='/register' element={<Register/>}/>
      </Routes>
  </BrowserRouter>
    )
}

export default AppRouter