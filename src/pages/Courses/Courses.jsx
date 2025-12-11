import {useEffect, useState} from "react";
import courseApi from "../../api/courseApi";
import "./Course.css"
import professorApi from "../../api/professorApi";
import {toast} from "react-toastify";


export default function Courses() {
    const [courses, setCourses] = useState([])
    const [professors, setProfessors] = useState([])
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const role = localStorage.getItem("role");

    const [form, setForm] = useState({
        courseName: "",
        courseCode: "",
        creditHours: "",
        professor: {
            firstName: "",
            lastName: "",
            email: "",
        }
    });

    const fetchData = async () => {
        try {
            if (role === "PROFESSOR") {
                const id = Number(localStorage.getItem("id"));
                const email = localStorage.getItem("email");
                const response = await courseApi.getAllCoursesByProfessor(id, email);
                const profRes = await professorApi.getAllProfessors();
                setProfessors(profRes.data);
                setCourses(response.data);
            } else if (role === "STUDENT"){
                const studentId = localStorage.getItem("studentId");
                const enrolledStudentsResponse = await courseApi.getAllEnrolledCoursesByStudentId(studentId);
                setEnrolledCourses(enrolledStudentsResponse.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleAddCourse = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await courseApi.createCourse(form);
            await fetchData();
            setShowModal(false);

            toast.success("Course added successfully!", {
                position: "top-center",
                autoClose: 3000,
            });
        } catch (error) {
            console.log(error);
            toast.error("Error adding course", { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);



    return (
        <div className="courses-page">
            <h2>MY COURSES</h2>
            <div className="page-header">
                {role === "ADMIN" && (
                    <button
                        className="add-btn"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Course
                    </button>
                )}
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="course-table">
                    <thead>
                    <tr>
                        <th>COURSE ID</th>
                        <th>COURSE NAME</th>
                        <th>COURSE CODE</th>
                        <th>CREDIT HOURS</th>
                        <th>PROFESSOR</th>
                    </tr>
                    </thead>

                    <tbody>
                    {courses.map((p) => (
                        <tr key={p.course_id}>
                            <td>{p.course_id}</td>
                            <td>{p.course_name}</td>
                            <td>{p.course_code}</td>
                            <td>{p.credit_hours}</td>
                            <td>{p.professor?.first_name} {p.professor?.last_name}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tbody>
                    {enrolledCourses.map((p) => (
                        <tr key={p.course_id}>
                            <td>{p.course_id}</td>
                            <td>{p.course_name}</td>
                            <td>{p.course_code}</td>
                            <td>{p.credit_hours}</td>
                            <td>{p.professor?.first_name} {p.professor?.last_name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h3>Add Course</h3>

                        <form onSubmit={handleAddCourse} className="modal-form">
                            <input
                                name="courseName"
                                placeholder="Course Name"
                                value={form.courseName}
                                onChange={handleChange}
                                required
                            />

                            <input
                                name="courseCode"
                                placeholder="Course Code"
                                value={form.courseCode}
                                onChange={handleChange}
                                required
                            />

                            <input
                                name="creditHours"
                                placeholder="Credit Hours"
                                value={form.creditHours}
                                onChange={handleChange}
                                required
                            />

                            <select
                                name="professorSelect"
                                onChange={(e ) => {
                                    const selected = professors.find(
                                        prof => prof.professor_id === Number(e.target.value)
                                    );
                                    setForm({
                                        ...form,
                                        professor: {
                                            first_name: selected.first_name,
                                            lastName: selected.lastName,
                                            email: selected.email,
                                        }
                                    });
                                }}
                            >
                                <option value="">Select Professor</option>
                                {professors.map((p) => (
                                    <option key={p.professor_id} value={p.professor_id}>
                                        {p.first_name} {p.last_name} {p.email}
                                    </option>
                                ))}
                            </select>

                            <div className="modal-actions">
                                <button className="submit" type="submit">Save</button>
                                <button className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}