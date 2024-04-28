import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/login.css';

export default function Login(){
    // redirect to /pc if admin is already logged in
    const navigate = useNavigate();
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
          navigate('/pc');
        }
    }, [navigate]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // validates if admin or not part 1
    // -1: invalid credentials
    // -2: not admin
    const checkAdmin = async(username, password) => {
        try {
          const response = await axios.get(`http://localhost:8080/member/checkAdmin?username=${username}&password=${password}`);
          return response.data;
        }catch (error) {
          throw new Error('Error checking login credentials.');
        }
    }
     
    // validates if admin or not part 2
    // -1: invalid credentials
    // -2: not admin
    const navigateTo = useNavigate();
    const handleSubmit = async () => {
        try{
            const result = await checkAdmin(username, password);
            console.log(result);
            if (result !== -1 && result !== -2) {
              localStorage.setItem("isLoggedIn", true);
              window.history.replaceState(null, null, '/');
              // Added setTimeout
              setTimeout(() => {
                navigateTo("/pc");
                navigateTo(0);
              }, 2000);
            } else {
              alert("Invalid username or password");
            }
          }catch(error){
            alert('Check Eclipse.');
          }   
    }

    return(
        <div className="main">
          <div className="upper-area">
            <h2>INTERNET CAFE <span>MANAGER</span></h2>
          </div>
          <div className="middle-area">
            <div className="login-area"> 
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button onClick={handleSubmit}>Log In</button>
            </div>
          </div>
        </div>
    );
}