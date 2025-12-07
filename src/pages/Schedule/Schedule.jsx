import {useEffect, useState} from "react";
import scheduleApi from "../../api/scheduleApi";


export default function Schedule() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        scheduleApi.getAllSchedules().then(res => {
            setCourses(res.data);
        });
    }, [])

    return (
        <div>
            <h1>Courses</h1>
        </div>
    )
}