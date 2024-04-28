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
  // npm install axios

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <>
        <Routes>
          {/* if admin is logged in */}
          {isLoggedIn && (
            <>
            <Navbar />
            
              <Route index element={<PCManagement />} />
              <Route path="/pc" element={<PCManagement />}/>
              <Route path="/members" element={<Members />}/>
              <Route path="/queue" element={<Queue />}/>
            </>
          )}

          {/* if admin is not logged in */}
          {!isLoggedIn && (
            <>
              <Route path="/" element={<Login />}/>
            </>
          )}
        </Routes>
    </>
  );
}

export default App;
