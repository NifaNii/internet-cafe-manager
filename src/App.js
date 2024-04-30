import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/queue';
import PCManagement from './pages/pc';
import Members from './pages/members';
import Queue from './pages/login';
import Navbar from './navbar';

function App() {
  // dependencies
  // npm i react-router-dom
  // npm install axios

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <>
          {/* if admin is logged in */}
          {isLoggedIn && (
            <>
            <Navbar />

            <Routes>
              <Route index element={<PCManagement />} />
              <Route path="/pc" element={<PCManagement />}/>
              <Route path="/members" element={<Members />}/>
              <Route path="/queue" element={<Queue />}/>
            </Routes>
            </>
          )}

          {/* if admin is not logged in */}
          {!isLoggedIn && (
            <>
            <Routes>
              <Route path="/" element={<Login />}/>
            </Routes>
            </>
          )}
    </>
  );
}

export default App;
