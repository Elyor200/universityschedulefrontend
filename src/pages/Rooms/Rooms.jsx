import {useEffect, useState} from "react";
import roomApi from "../../api/roomApi";


export default function Rooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        roomApi.getAllRooms().then(res => {
            setRooms(res.data);
        })
    }, [])

    return (
        <div>
            <h1>Rooms</h1>
        </div>
    )
}