import {useEffect, useState} from "react";
import courseApi from "../../api/courseApi";
import "./Course.css"
import professorApi from "../../api/professorApi";
import {toast} from "react-toastify";
import scheduleApi from "../../api/scheduleApi";
import {all} from "axios";


export default function Courses() {
    const [courses, setCourses] = useState([])
    const [professors, setProfessors] = useState([])
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [allCourses, setAllCourses] = useState([]);
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
                const studentId = Number(localStorage.getItem("id"));
                // const studentId = localStorage.getItem("studentId");
                const enrolledStudentsResponse = await courseApi.getAllEnrolledCoursesByStudentId(studentId);
                setEnrolledCourses(enrolledStudentsResponse.data);

                const allCoursesRes = await courseApi.getAllCourses();
                setAllCourses(allCoursesRes.data);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
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


    const loadSchedules = async (courseId) => {
        try {
            setSelectedCourse(courseId);
            const res = await scheduleApi.getAllSchedulesByCourseId(courseId);
            setSchedules(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEnroll = async (e) => {
        e.preventDefault();
        if (!selectedSchedule) {
            toast.error("Please select a schedule");
            return;
        }
        try {
            const studentId = localStorage.getItem("id");
            await courseApi.enrollToCourse({ studentId, scheduleId: selectedSchedule });
            toast.success("Enroll success");
            setShowModal(false);
            setSelectedCourse(null);
            setSelectedSchedule(null);
            setSchedules([]);
            const enrolledRes = await courseApi.getAllEnrolledCoursesByStudentId(studentId);
            setEnrolledCourses(enrolledRes.data);
        } catch (err) {
            const errorMessage = err.response?.data?.message;
            toast.error(errorMessage);
        }
    };

    return (
        <div className="courses-page">
            <h2>MY COURSES</h2>
            <div className="page-header">
                {role === "STUDENT" && (
                    <button
                        className="add-btn"
                        onClick={() => setShowModal(true)}
                    >
                        + Enroll
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

            {showModal && role === "STUDENT" && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h3>Enroll in Course</h3>
                        <form onSubmit={handleEnroll} className="modal-form">

                            <label>Courses</label>
                            <select
                                value={selectedCourse || ""}
                                onChange={async (e) => {
                                    const courseId = e.target.value;
                                    setSelectedCourse(courseId);
                                    if (courseId) {
                                        const res = await scheduleApi.getAllSchedulesByCourseId(courseId);
                                        setSchedules(res.data);
                                    } else {
                                        setSchedules([]);
                                    }
                                }}
                                required
                            >
                                <option value="">Select Course</option>
                                {allCourses.map((c) => (
                                    <option key={c.course_id} value={c.course_id}>
                                        {c.course_name} ({c.course_code})
                                    </option>
                                ))}
                            </select>

                            {schedules.length > 0 && (
                                <>
                                    <label>Schedule</label>
                                    <select
                                        value={selectedSchedule || ""}
                                        onChange={(e) => setSelectedSchedule(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Schedule</option>
                                        {schedules.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.dayOfWeek} {s.startTime}-{s.endTime}
                                                {" "} (Room: {s.roomDTO?.room_number})
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}

                            <div className="modal-actions">
                                <button type="submit">Enroll</button>
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}