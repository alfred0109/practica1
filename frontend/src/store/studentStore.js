import { create } from 'zustand';
import axios from 'axios';


const useStudentStore = create((set) => ({
    students: [],
    
    addStudent: async (student) => {// metodo  para agregar un estudiante

        try {
            const response = await axios.post('http://localhost:3001/student', student);
            set((state) => ({ students: [...state.students, response.data] })); // update the state
        } catch (error) {
            console.log('Error adding student', error.message);
        }
    },

    fetchStudents: async () => { //metodo  para obtener estudiantes

        try {
            const response = await axios.get('http://localhost:3001/student');
            set({ students: response.data });
        } catch (error) {
            console.log('Error fetching students', error.message);
        }
    },

    deleteStudent: async (id) => {//metodo para eliminar estudiante
        try {
            const response = await axios.delete(`http://localhost:3001/student/${id}`); 
            console.log('Estudiante eliminado:', response.data);
            set((state) => ({ students: state.students.filter(student => student.id !== id) }));
        } catch (error) {
            console.log('Error al eliminar estudiante', error.message);
        }
    },

    updateStudent: async (id, updatedData) => { //  método para actualizar estudiante
        try {
            const response = await axios.put(`http://localhost:3001/student/${id}`, updatedData);
            console.log('Estudiante actualizado:', response.data);
            set((state) => ({ students: state.students.map((student) => student.id === id ? { ...student, ...response.data } : student) }));
        } catch (error) {
            console.log('Error al actualizar estudiante:', error.message);
        }
    }
}));

export default useStudentStore;