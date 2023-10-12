import {Link} from "react-router-dom";

export function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light p-4">
                <Link to="/HRnet/" className="navbar-brand">
                    <img src="/HRnet/img/logo.svg" alt="logo" width={50} height={50}/>
                </Link>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/HRnet/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/HRnet/employee-list" className="nav-link">View Current Employees</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}