import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Profile from './Profile';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Signup';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/signup' element={<Signup />}></Route>
        <Route exact path='/profile' element={<Profile />}></Route>
        <Route exact path='/' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
