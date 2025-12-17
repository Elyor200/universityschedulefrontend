import {useEffect, useState} from "react";
import scheduleApi from "../../api/scheduleApi";
import "./Schedule.css"
import courseApi from "../../api/courseApi";
import roomApi from "../../api/roomApi";
import {toast} from "react-toastify";


export default function Schedule() {
    const [schedule, setSchedule] = useState([]);
    const [studentSchedule, setStudentSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem("role");
    const [showModal, setShowModal] = useState(false);
    const [courses, setCourses] = useState([]);
    const [rooms, setRooms] = useState([]);

    const [form, setForm] = useState({
        courseId: null,
        professorId: "",
        roomId: "",
        dayOfWeek: "",
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        if (role === "PROFESSOR") {
            const fetchSchedules = async () => {
                setForm(prev => ({
                    ...prev,
                    professorId: Number(localStorage.getItem("id")),
                }))
                try {
                    const professorId = Number(localStorage.getItem("id"));
                    const response = await scheduleApi.getAllSchedulesByProfessorId(professorId);
                    setSchedule(response.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

            void fetchSchedules();
        } else if (role === "STUDENT") {
            const studentId = Number(localStorage.getItem("id"));
            const fetchStudentSchedules = async () => {
                try {
                    const studentScheduleResponse = await scheduleApi.getAllSchedulesByStudentId(studentId);
                    setStudentSchedule(studentScheduleResponse.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }

            void fetchStudentSchedules();
        }
    }, [role])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleAddNewSchedule = async (e) => {
        e.preventDefault();
        try {
            await scheduleApi.createSchedule(form);
            setShowModal(false);
            setForm({courseId: "", professorId: "", roomId: "", dayOfWeek: "", startTime: "", endTime: "", });
            toast.success("Schedule added", {position: "top-right", autoClose: 3000});
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const id = Number(localStorage.getItem("id"));
                const email = localStorage.getItem("email");
                const courseResponse = await courseApi.getAllCoursesByProfessor(id, email);
                setCourses(courseResponse.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        void fetchCourses();
    },  [])

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomResponse = await roomApi.getAllRooms();
                setRooms(roomResponse.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        void fetchRooms();
    }, [])

    if (loading) return <h2>Loading...</h2>

    return (
        <div className="schedule-container">
            <h1>MY SCHEDULES</h1>
            <div className="create-schedule-container">
                {role === "PROFESSOR" && (
                    <button
                        className="add-btn"
                        onClick={() => setShowModal(true)}
                    >
                        + Add New Schedule
                    </button>
                )}
            </div>
            <table className="schedule-table">
                <thead>
                <tr>
                    <th>DAY</th>
                    <th>TIME</th>
                    <th>COURSE</th>
                    <th>ROOM</th>
                    {role === "STUDENT" && (
                        <th>ENROLLED DATE</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {schedule.map((s, index) => (
                    <tr key={index}>
                        <td>{s.dayOfWeek}</td>
                        <td>{s.startTime} - {s.endTime}</td>
                        <td>{s.courseDTO.course_name} ({s.courseDTO.course_code})</td>
                        <td>{s.roomDTO.room_number} (Floor {s.roomDTO.floor})</td>
                    </tr>
                ))}
                </tbody>
                <tbody>
                {studentSchedule.map((s, index) => (
                    <tr key={index}>
                        <td>{s.dayOfWeek}</td>
                        <td>{s.startTime} - {s.endTime}</td>
                        <td>{s.courseDTO.course_name} ({s.courseDTO.course_code})</td>
                        <td>{s.roomDTO.room_number} (Floor {s.roomDTO.floor})</td>
                        <td>{s.enrolledAt ? new Date(s.enrolledAt).toLocaleString() : "-"}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showModal && (
                <div className="schedule-modal-overlay">
                    <div className="schedule-modal-card">
                        <h3>Add New Schedule</h3>

                        <form onSubmit={handleAddNewSchedule} className="schedule-modal-form">
                            <select
                                name="courseId"
                                value={form.courseId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Course</option>
                                {courses.map(c => (
                                    <option key={c.course_id} value={c.course_id}>
                                        {c.course_name} ({c.course_code})
                                    </option>
                                ))}
                            </select>
                            <input
                                name="professorId"
                                placeholder="Professor Id"
                                value={form.professorId}
                                onChange={handleChange}
                                required
                            />
                            <select
                                name="roomId"
                                value={form.roomId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Room</option>
                                {rooms.map(c => (
                                    <option key={c.room_id} value={c.room_id}>
                                        {c.room_number}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="dayOfWeek"
                                value={form.dayOfWeek}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Day</option>
                                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                            <input
                                name="startTime"
                                placeholder="Start Time"
                                value={form.startTime}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="endTime"
                                placeholder="End Time"
                                value={form.endTime}
                                onChange={handleChange}
                                required
                            />
                            <div className="schedule-modal-actions">
                                <button className="submit" type="submit">Add</button>
                                <button className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}