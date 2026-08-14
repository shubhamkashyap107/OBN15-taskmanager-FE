import { Route, Routes} from "react-router-dom"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import ProtectedRoutes from "./Pages/ProtectedRoutes"
import { UserContextProvider } from "./Utils/UserContext"
import NewTask from "./Pages/NewTask"
import { Toaster } from "react-hot-toast"
import Edittask from "./Pages/Edittask"
import Profile from "./Pages/Profile"

const App = () => {
  return (
    <UserContextProvider>

    <div>

      <Toaster />
      


      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewTask />} />
          <Route path="/edit" element={<Edittask />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>



    </div>
    </UserContextProvider>

  )
}

export default App