import './App.css';
import Authenticate from './views/Authenticate';
import AdminView from './views/AdminView';
import Home from './views/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import EditProfile from './views/EditProfile';
import PreviousTripsList from './views/PreviousTripsList';
import axios from 'axios';
import DriverForm from './components/DriverForm';

function App() {

  const userId = localStorage.getItem('userId')
  const [role, setRole] = useState("")

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/' + userId)
      .then(res => { setRole(res.data.role) })
      .catch(err => console.log(err))
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        {role === "admin" ? 
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path='/home' element={<AdminView />}/>
          <Route path='/auth' element={<Authenticate />} />
        </Routes> : 
        <Routes>
          <Route path='/auth' element={<Authenticate />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/recent-drives' element={<PreviousTripsList />} />
          <Route path='/be-a-driver' element={<DriverForm />} />
        </Routes>}
      </div>
    </BrowserRouter>
  );
}

export default App;
