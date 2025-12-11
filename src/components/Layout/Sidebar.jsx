import {NavLink} from "react-router-dom";
import "./Sidebar.css";


export default function Sidebar() {
    const role = localStorage.getItem("role");

    return (
        <div className="sidebar">
            <div className="sidebar-title"></div>

            <nav className="sidebar-menu">
                <NavLink to="/dashboard" className="menu-item">
                    Dashboard
                </NavLink>

                {role === "PROFESSOR" && (
                    <NavLink to="/students" className="menu-item">
                        Students
                    </NavLink>
                )}

                <NavLink to="/professors" className="menu-item">
                    Professors
                </NavLink>

                <NavLink to="/courses" className="menu-item">
                    Courses
                </NavLink>

                <NavLink to="/rooms" className="menu-item">
                    Rooms
                </NavLink>

                <NavLink to="/schedule" className="menu-item">
                    Schedule
                </NavLink>
            </nav>
        </div>
    );
}