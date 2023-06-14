import './App.css';
import Authenticate from './views/Authenticate';
import Home from './views/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditProfile from './views/EditProfile';
import PreviousTripsList from './views/PreviousTripsList';

function App() {



  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<Authenticate/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/edit-profile' element={<EditProfile/>}/>
        <Route path='/recent-drives' element={<PreviousTripsList/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
