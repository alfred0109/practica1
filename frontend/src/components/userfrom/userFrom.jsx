import { useState } from "react";
 // Asegúrate de que el nombre del archivo CSS sea correcto
import useUserStore from "../../store/userStore"; // Asegúrate de que la ruta sea correcta
import './UserForm.css'
import Navegador from '../Navegador/Navegador';

const UserForm = () => {
    const { addUser } = useUserStore(); // Cambia addStudent a addUser

    const [userData, setUserData] = useState({
        userName: "", 
        password: "",
        role: ""
    });

    console.log(userData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (typeof addUser === 'function') { // Verifica si addUser es una función
            await addUser(userData); // Llama a addUser
            setUserData({
                userName: "",
                password: "",
                role: ""
            });
            alert("USUARIO AGREGADO");
        } else {
            console.error("addUser no es una función");
        }
    };

    return (
        <div className="register">
            <Navegador/>
            <h1>FORMULARIO DE USUARIO</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    required
                    name="userName" 
                    value={userData.userName}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    required
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Rol"
                    required
                    name="role"
                    value={userData.role}
                    onChange={handleInputChange}
                />
                <button type="submit">AGREGAR</button>  
            </form>
        </div>
    );
};

export default UserForm;