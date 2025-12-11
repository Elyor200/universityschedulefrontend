import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Students from "../pages/Students/Students";
import Professors from "../pages/Professors/Professors";
import Courses from "../pages/Courses/Courses";
import Rooms from "../pages/Rooms/Rooms";
import Schedule from "../pages/Schedule/Schedule";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../login/Login";
import ProtectedRoute from "./ProtectedRoute";

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
            <Routes>
                <Route path="/" element={<Login/>}/>


                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/students"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Students/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/professors"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Professors/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/courses"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Courses/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/rooms"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Rooms/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/schedule"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Schedule/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}