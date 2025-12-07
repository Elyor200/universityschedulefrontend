import {useEffect, useState} from "react";
import studentApi from "../../api/studentApi";


export default function Students() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        studentApi.getAll().then(res => {
            setStudents(res.data);
        });
    }, []);

    return (
        <div>
            <h1>Students</h1>
        </div>
    )
}