import React, { useState, useEffect } from 'react';
import useUserStore from '../../store/userStore'; // Cambia a usar el store de usuarios
import { IoSaveOutline } from "react-icons/io5"; 
import { IoTrashOutline } from "react-icons/io5"; 

const Modal = ({ user, onClose }) => {
    const { updateUser } = useUserStore(); // Cambia a la función de actualización de usuarios
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                userName: user.userName,
                password: user.password,
                role: user.role,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(user.id, formData); // Cambia a la función de actualización de usuarios
            alert('Usuario Modificado.');
            onClose();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    return (
        <div className='edit-modal'>
            <div className="modal-content">
                <h3>Modificar Usuario</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        NOMBRE DE USUARIO:
                        <input 
                            type="text" 
                            name="userName" 
                            value={formData.userName} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <label>
                        {/* CONTRASEÑA:
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required
                        /> */}
                    </label>
                    <label>
                        ROL:
                        <input 
                            type="text" 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <div className="btns">
                        <button type="submit" className='btn-guardar'>
                            <IoSaveOutline /> Guardar
                        </button>
                        <button type="button" className='btn-cancelar' onClick={onClose}>
                            <IoTrashOutline /> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;