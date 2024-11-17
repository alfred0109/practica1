import React, { useEffect, useState } from 'react';
import Navegador from '../Navegador/Navegador';
import useUserStore from '../../store/userStore'; // Asegúrate de que este store maneje usuarios
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineEye } from 'react-icons/ai';
import Modal from './Modal';
// Asegúrate de que este modal sea adecuado para usuarios

const UserList = () => {
    const { fetchUsers, users, deleteUser } = useUserStore(); // Cambiar a fetchUsers y deleteUser
    const [deleteModal, setDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null); 
    const [editModal, setEditModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers(); // Carga los usuarios al montar el componente
    }, []);

    const handleDelete = (id) => {
        deleteUser(id); // Elimina el usuario seleccionado
        setDeleteModal(false);
    }

    const handleDeleteModal = (userId) => {
        setUserToDelete(userId);
        setDeleteModal(!deleteModal);
    }

    const handleEditModal = (user) => {
        setUserToEdit(user);
        setEditModal(!editModal);
    }

    // Filtra los usuarios según el término de búsqueda
    const filteredUsers = users.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='lista'>
            <Navegador />
            <h1>LISTA DE USUARIOS</h1>

            {/* Campo de búsqueda */}
            <input 
                type="text"
                placeholder="Buscar por nombre de usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            {/* Tabla de usuarios */}
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>USUARIO ID</th>
                        <th>Nombre de Usuario</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.userName}</td>
                            <td>{user.role}</td>
                            <td>
                                {/* Botón para editar */}
                                <button className='edit-btn' onClick={() => handleEditModal(user)}>
                                    <AiOutlineEye className='edit-ico' />
                                </button>

                                {/* Botón para eliminar */}
                                <button className='delete-btn' onClick={() => handleDeleteModal(user.id)}>
                                    <RiDeleteBin5Fill className='delete-ico' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {deleteModal && (
                <div className='modal-delete'>
                    <div className="contend">
                        <p>ELIMINAR USUARIO</p>
                        <div className="btns">
                            <button className='btn-SI' onClick={() => handleDelete(userToDelete)}>SI</button>
                            <button className='btn-NO' onClick={handleDeleteModal}>NO</button>
                        </div>
                    </div>
                </div>
            )}
            
            {editModal && (
                <Modal user={userToEdit} onClose={handleEditModal} /> // Asegúrate de que EditModal maneje usuarios
            )}
        </div>
    );
}

export default UserList;