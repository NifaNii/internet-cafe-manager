import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import PCManagement from './pages/pc';
import Members from './pages/members';
import Queue from './pages/queue';
import Navbar from './navbar';

function App() {
  // dependencies
  // npm i react-router-dom

  return (
    <>
      <Navbar />
      
      <div className='routes'>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/pc" element={<PCManagement />}/>
          <Route path="/members" element={<Members />}/>
          <Route path="/queue" element={<Queue />}/>
        </Routes>
      </div>
      
    </>
  );
}

export default App;
