import { useState } from "react";
import './studentFrom.css'
import useStudentStore from "../../store/studentStore";
import Navegador from "../Navegador/Navegador"

const StudentForm = () => {
    
    const { addStudent } = useStudentStore(); 

    const [studentData, setStudentData] = useState({
        firstName: "", 
        lastName: "",
    });

    console.log(studentData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        addStudent(studentData); 
        setStudentData({
            firstName: "",
            lastName: ""
        });
        alert("ESTUDIANTE AGREGADO");
    };

    return (
        <div className="register" >
            <Navegador/>
            <h1>FORMULARIO DE ESTUDIANTE</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder=" Nombre"
                    required
                    name="firstName" 
                    value={studentData.firstName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder=" Apellido"
                    required
                    name="lastName"
                    value={studentData.lastName}
                    onChange={handleInputChange}
                />
                <button type="submit">AGREGAR</button>  
            </form>
        </div>
    );
};

export default StudentForm;