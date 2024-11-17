import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
    users: [],

    addUser: async (user) => { // Método para agregar un usuario
        try {
            const response = await axios.post('http://localhost:3001/user', user);
            set((state) => ({ users: [...state.users, response.data] })); // Actualiza el estado
        } catch (error) {
            console.log('Error adding user', error.message);
        }
    },

    fetchUsers: async () => { // Método para obtener usuarios
        try {
            const response = await axios.get('http://localhost:3001/user');
            set({ users: response.data });
        } catch (error) {
            console.log('Error fetching users', error.message);
        }
    },

    deleteUser: async (id) => { // Método para eliminar un usuario
        try {
            const response = await axios.delete(`http://localhost:3001/user/${id}`); 
            console.log('Usuario eliminado:', response.data);
            set((state) => ({ users: state.users.filter(user => user.id !== id) }));
        } catch (error) {
            console.log('Error al eliminar usuario', error.message);
        }
    },

    updateUser: async (id, updatedData) => { // Método para actualizar un usuario
        try {
            const response = await axios.put(`http://localhost:3001/user/${id}`, updatedData);
            console.log('Usuario actualizado:', response.data);
            set((state) => ({ users: state.users.map((user) => user.id === id ? { ...user, ...response.data } : user) }));
        } catch (error) {
            console.log('Error al actualizar usuario:', error.message);
        }
    }
}));

export default useUserStore;