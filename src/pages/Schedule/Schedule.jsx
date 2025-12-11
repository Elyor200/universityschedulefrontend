import {useEffect, useState} from "react";
import scheduleApi from "../../api/scheduleApi";
import "./Schedule.css"


export default function Schedule() {
    const [schedule, setSchedule] = useState([]);
    const [studentSchedule, setStudentSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (role === "PROFESSOR") {
            const fetchSchedules = async () => {
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
    }, [])

    if (loading) return <h2>Loading...</h2>

    return (
        <div className="schedule-container">
            <h1>MY SCHEDULES</h1>
            <table className="schedule-table">
                <thead>
                <tr>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Course</th>
                    <th>Room</th>
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}