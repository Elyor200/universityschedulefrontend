import {useState} from "react";
import loginApi from "../api/loginApi";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.css"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await loginApi.login(email, password);
            const {token, role} = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            toast.success("Login success!", {autoClose: 3000});
            navigate("/dashboard");
        } catch (error) {
            if (error.response && error.response.status === 403) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            toast.error("Login failed!", {autoClose: 3000});
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default Login;