import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Students from "../pages/Students/Students";
import Professors from "../pages/Professors/Professors";
import Courses from "../pages/Courses/Courses";
import Rooms from "../pages/Rooms/Rooms";
import Schedule from "../pages/Schedule/Schedule";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />

            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/students" element={<Students/>} />
                    <Route path="/professors" element={<Professors/>} />
                    <Route path="/courses" element={<Courses/>} />
                    <Route path="/rooms" element={<Rooms/>} />
                    <Route path="/schedule" element={<Schedule/>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}