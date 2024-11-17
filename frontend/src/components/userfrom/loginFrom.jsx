import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import './LoginForm.css'; 

const LoginForm = () => {
    const navigate = useNavigate();
    const { fetchUsers, users } = useUserStore();
    const [userData, setUserData] = useState({
        userName: "", 
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                setIsLoading(true);
                await fetchUsers();
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (error.response && error.response.status === 401) {
                    setError('Token inválido. Por favor, inicia sesión de nuevo.');
                } else {
                    setError('Error al cargar los datos de usuario.');
                }
            }
        };
        loadUserData();
    }, [fetchUsers]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userExists = users.some(user => user.userName === userData.userName && user.password === userData.password);
        
        if (userExists) {
            navigate("/video");
        } else {
            setError('Usuario o contraseña incorrectos');
        }

        setUserData({
            userName: "",
            password: ""
        });
    };

    return (
        <div className="login-container">
            <h1>INICIO DE SESIÓN</h1>
            {error && <div className="error-message">{error}</div>}
            {isLoading ? (
                <div className="loading-spinner">Cargando...</div>
            ) : (
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        placeholder="Nombre de Usuario"
                        required
                        name="userName" 
                        value={userData.userName}
                        onChange={handleInputChange}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        required
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        className="login-input"
                    />
                    <button type="submit" className="login-button">INICIAR SESIÓN</button>  
                </form>
            )}
            <p className="create-account">
                ¿No tienes una cuenta? <span onClick={() => navigate("/userform")} className="create-account-link">Crea una cuenta</span>
            </p>
        </div>
    );
};

export default LoginForm;