import React, { useState, useEffect } from 'react';
import './edit.css';
import useStudentStore from '../../store/studentStore';
import { IoSaveOutline } from "react-icons/io5"; 
import { IoTrashOutline } from "react-icons/io5"; 

const Modal = ({ student, onClose }) => {
    const { updateStudent } = useStudentStore();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
    });

    useEffect(() => {
        if (student) {
            setFormData({
                firstName: student.firstName,
                lastName: student.lastName,
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStudent(student.id, formData);
            alert('Estudiante Modificado.');
            onClose();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    return (
        <div className='edit-modal'>
            <div className="modal-content">
                <h3>Modificar Estudiante</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        NOMBRE:
                        <input 
                            type="text" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <label>
                        APELLIDO:
                        <input 
                            type="text" 
                            name="lastName" 
                            value={formData.lastName} 
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