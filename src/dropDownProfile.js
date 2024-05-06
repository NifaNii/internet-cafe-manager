import { useNavigate } from "react-router-dom";

export default function DropDownProfile(){
    // logs out the admin
    const navigateTo = useNavigate();
    const handleLogout = () => {
        setTimeout(() => {
            localStorage.setItem("isLoggedIn", false);
            window.history.replaceState(null, null, '/');
            navigateTo("/");
            navigateTo(0);
        }, 2000);  
    }

    return(
        <div className="dropDownProfile">
            <ul>
                <li onClick={handleLogout}>
                    <div className="dd-icon">
                        <img src="../images/logout.png" alt=""/>
                    </div>
                    <span style={{marginLeft: '-3px'}}>
                        Logout
                    </span>
                </li>
            </ul>
        </div>
    );
}