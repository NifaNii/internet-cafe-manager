import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './css/navbar.css';

export default function Navbar(){
    return(
        <>
            <nav>
                <Link to="/">INTERNET CAFE MANAGER</Link>
                <ul>
                    <CustomLink to="/pc">PC</CustomLink>
                    <CustomLink to="/members">MEMBERS</CustomLink>
                    <CustomLink to="/queue">QUEUE</CustomLink>
                </ul>
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