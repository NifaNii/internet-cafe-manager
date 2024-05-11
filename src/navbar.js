import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './css/navbar.css';
import { useEffect, useRef, useState } from 'react';
import DropDownProfile from './dropDownProfile';

export default function Navbar(){
    const [openProfile, setOpenProfile] = useState(false);
    const dropDownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)){
            setOpenProfile(false);
        }
    };

    useEffect(() => {
        if(openProfile) {
            document.addEventListener('mousedown', handleClickOutside);
        }else{
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [openProfile]);

    return(
        <>
            <nav>
                <Link to="/" className='nav-title'>INTERNET CAFE <span className='nav-title-span'>MANAGER</span></Link>
                <ul className='nav-tabs'>
                    <CustomLink to="/pc">PC</CustomLink>
                    <CustomLink to="/members">MEMBERS</CustomLink>
                    <CustomLink to="/queue">QUEUE</CustomLink>
                </ul>
                <div className='admin-icon-area'>
                    <img src='../images/admin-icon.png' onClick={() => setOpenProfile((prev) => !prev)} alt=''/>
                </div>

                {openProfile && (
                    <div className='dropdown-wrapper' ref={dropDownRef}>
                    <   DropDownProfile />
                    </div>
                )}
            </nav>
        </>
    );
}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})

    return(
        <li>
            <Link to={to} {...props} className={isActive ? "active" : ""}>{children}</Link>
        </li>
    );
}