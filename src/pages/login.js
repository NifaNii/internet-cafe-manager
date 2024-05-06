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
    const [incoCred, setIncoCred] = useState(false);

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
    const handleSubmit = async (e) => {
      e.preventDefault();
        try{
            const result = await checkAdmin(username, password);
            console.log(result);
            if (result !== -1 && result !== -2) {
              setIncoCred(false);
              localStorage.setItem("isLoggedIn", true);
              window.history.replaceState(null, null, '/');
              // Added setTimeout
              setTimeout(() => {
                navigateTo("/pc");
                navigateTo(0);
              }, 2000);
            } else {
              setIncoCred(true);
            }
          }catch(error){
            alert('Check Eclipse.');
          }   
    }

    return(
        <div className="login-main">
          <div className="upper-area">
            <h2>INTERNET CAFE <span>MANAGER</span></h2>
          </div>
          <div className="middle-area">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-area"> 
                <div className="login-inputs">
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
                </div>
                {incoCred ? (
                  <p className="login-error">Incorrect username or password.</p>
                ) : (<p></p>)}
                <button type="submit">Log In</button>
                
              </div>
            </form>
          </div>
        </div>
    );
}