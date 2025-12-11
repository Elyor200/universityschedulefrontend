import axios from "axios";
import {useEffect, useState} from "react";
import "./Dashboard.css";


export default function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(localStorage.getItem("token"));

        axios.get("http://localhost:8094/v1/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                setUser(res.data);
                const {id, email} = res.data;
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("studentId", res.data.studentId);
                localStorage.setItem("id", id)
                localStorage.setItem("email", email);
            })
            .catch(err => console.log(err));
    }, []);

    if (!user) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <header className="app-header">
                <div className="header-name">
                    <h3>UNIVERSITY SCHEDULE APPLICATION</h3>
                </div>
            </header>

            <div className="dashboard-container">
                <h1>DASHBOARD</h1>

                <div className="user-info-container">
                    <div className="user-info-card">
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p><b>Email:</b> {user.email}</p>

                        {user.role === "STUDENT" && (
                            <>
                                <p><b>Student ID:</b> {user.studentId}</p>
                                <p><b>Major:</b> {user.major}</p>
                                <p><b>Phone:</b> {user.phoneNumber}</p>
                            </>
                        )}

                        {user.role === "PROFESSOR" && (
                            <>

                            </>
                        )}
                    </div>
                    <div>
                        <span>{user.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}