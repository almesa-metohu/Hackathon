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
import AddRide from './components/AddRide';

function App() {

  const userId = localStorage.getItem('userId')
  const [role, setRole] = useState("")
  const [refresh, setRefresh] = useState()

  useEffect(() => {
    userId?
    axios.get('http://localhost:8000/api/user/' + userId)
      .then(res => { setRole(res.data.role) })
      .catch(err => console.log(err)) : console.log("errors")
  }, [refresh])

  return (
    
     <BrowserRouter>
    <div className="App">
      {role === "admin" ? 
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path='/home' element={<AdminView />}/>
        <Route path='/auth' element={<Authenticate {...{setRefresh}}/>} />
      </Routes> : 
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path='/auth' element={<Authenticate {...{setRefresh}}/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/recent-drives' element={<PreviousTripsList />} />
        <Route path='/be-a-driver' element={<DriverForm />} />
        <Route path='/add-a-ride' element={<AddRide />} />
      </Routes>}
    </div>
  </BrowserRouter> 
  );
}

export default App;
