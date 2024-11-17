import React, { useEffect, useState } from 'react';
import './lista.css';
import Navegador from '../Navegador/Navegador';
import useStudentStore from '../../store/studentStore';
import EditModal from './Modal';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineEye } from 'react-icons/ai';

const StudentList = () => {
    const { fetchStudents, students, deleteStudent } = useStudentStore();
    const [deleteModal, setDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null); 
    const [editModal, setEditModal] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = (id) => {
        deleteStudent(id);
        setDeleteModal(false);
    }

    const handleDeleteModal = (studentId) => {
        setStudentToDelete(studentId);
        setDeleteModal(!deleteModal);
    }

    const handleEditModal = (student) => {
        setStudentToEdit(student);
        setEditModal(!editModal);
    }

    // Filtra los estudiantes según el término de búsqueda
    const filteredStudents = students.filter(student =>
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='lista'>
            <Navegador />
            <h1>LISTA DE ESTUDIANTES</h1>

            {/* Campo de búsqueda */}
            <input 
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <div className='cards-container'>
                {filteredStudents.map((student) => (
                    <div className='card' key={student.id}>
                        <p>{student.firstName} {student.lastName}</p>
                        <AiOutlineEye className='edit-ico' onClick={() => handleEditModal(student)} />
                        <RiDeleteBin5Fill className='delete-ico ico' onClick={() => handleDeleteModal(student.id)} />
                    </div>
                ))}
            </div>

            {deleteModal && (
                <div className='modal-delete'>
                    <div className="contend">
                        <p>ELIMINAR ESTUDIANTE</p>
                        <div className="btns">
                            <button className='btn-SI' onClick={() => handleDelete(studentToDelete)}>SI</button>
                            <button className='btn-NO' onClick={handleDeleteModal}>NO</button>
                        </div>
                    </div>
                </div>
            )}
            
            {editModal && (
                <EditModal student={studentToEdit} onClose={handleEditModal} />
            )}
        </div>
    );
}

export default StudentList;