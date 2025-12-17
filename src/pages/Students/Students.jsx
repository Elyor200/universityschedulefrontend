import {useEffect, useState} from "react";
import "./Student.css";
import studentApi from "../../api/studentApi";
import courseApi from "../../api/courseApi";
import scheduleApi from "../../api/scheduleApi";
import {toast} from "react-toastify";


export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const professorId = Number(localStorage.getItem("professorId"));
                const response = await studentApi.getAllStudentsByProfessorId(professorId);
                setStudents(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        void fetchStudents();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courseResponse = await courseApi.getAllCourses();
                setCourses(courseResponse.data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        void fetchCourses();
    }, []);

    return (
        <div className="students-page">
            <h2>STUDENTS</h2>
            <div className="page-header">
                <table className="students-table">
                    <thead>
                    <tr>
                        <th>STUDENT ID</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>EMAIL</th>
                        <th>MAJOR</th>
                        <th>PHONE NUMBER</th>
                    </tr>
                    </thead>

                    <tbody>
                    {students.map(s => (
                        <tr key={s.student_id}>
                            <td>{s.student_id}</td>
                            <td>{s.first_name}</td>
                            <td>{s.last_name}</td>
                            <td>{s.email}</td>
                            <td>{s.major}</td>
                            <td>{s.phone_number}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}