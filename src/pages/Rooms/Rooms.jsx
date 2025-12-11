import {useEffect, useState} from "react";
import roomApi from "../../api/roomApi";
import "./Room.css"


export default function Rooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        roomApi.getAllRooms().then(res => {
            setRooms(res.data);
        })
    }, [])

    return (
        <div className="room-container">
            <h1>AVAILABLE ROOMS</h1>
            <table className="room-table">
                <thead>
                <tr>
                    <th>Room Number</th>
                    <th>Floor</th>
                    <th>Capacity</th>
                </tr>
                </thead>
                <tbody>
                {rooms.map((room) => (
                    <tr key={room.room_id}>
                        <td>{room.room_number}</td>
                        <td>{room.floor}</td>
                        <td>{room.capacity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}