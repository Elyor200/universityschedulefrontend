import {useState} from "react";
import ProfessorApi from "../../api/professorApi";
import {toast} from "react-toastify";


const AddProfessor = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessages] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessages("")

        try {
            await ProfessorApi.createProfessor(form)
            setMessages("Professor added successfully !")
            setForm({ firstName: "", lastName: "", email: "", });

            toast.success("Professor added successfully!", {
                position: "top-center",
                autoClose: 3000,
            });
        } catch (error) {
            toast.error("Error adding professor ", { autoClose: 3000 });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-form-container">
            <h2 className="page-title">Add Professor</h2>

            <form className="form-card" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <button className="submit-btn" disabled={loading}>
                    {loading ? "Saving..." : "Add Professor"}
                </button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default AddProfessor;