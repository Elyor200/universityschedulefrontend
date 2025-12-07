import {useEffect, useState} from "react";
import professorApi from "../../api/professorApi";
import "./Professors.css";


export default function Professors() {
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const fetchData = async () => {
        try {
            const response = await professorApi.getAllProfessors();
            setProfessors(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleAddProfessor = async (e) => {
        e.preventDefault();

        try {
            await professorApi.createProfessor(form);
            await fetchData();
            setShowModal(false);
            setForm({firstName: "", lastName: "", email: "", });
        } catch (error) {
            console.log(error);
            alert("Error adding professor");
        }
    }

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <div className="professors-page">
            <div className="page-header">
                <h2>Professors</h2>
                <button
                    className="add-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Add Professor
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="prof-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>

                    <tbody>
                    {professors.map((p) => (
                        <tr key={p.professor_id}>
                            <td>{p.professor_id}</td>
                            <td>{p.first_name}</td>
                            <td>{p.last_name}</td>
                            <td>{p.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h3>Add Professor</h3>

                        <form onSubmit={handleAddProfessor} className="modal-form">
                            <input
                                name="firstName"
                                placeholder="First Name"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                            />

                            <input
                                name="lastName"
                                placeholder="Last Name"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                            />

                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

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