const Student =  require('../models/Student')
const { studentRouter } = require('../routes/studentRoutes')

//crea datos
const createStudentController = async ({id, firstName, lastName}) =>{
    try {
        const newStudent = await  Student.create({id, firstName, lastName})
        return newStudent

    } catch (error) {
        throw new Error(error.message)
    }
}

//optiene todos los datos
const  getAllStudentsController = async () =>{
    try {
        const students = await Student.findAll()
        return students
    } catch (error) {
        throw  new Error(error.message)

    }
}

//actualizar
const updatedStudentByIdController =async ( id, studentData) =>{
    try {
        const student = await Student.findByPk(id)
        if(!student){
            return null
        }
        await student.update(studentData)
        return student
    } catch (error) {
        throw new Error(error.message) 
    }
}

//eliminar
const deleteStudentByIdController = async (id) => {
    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return null; 
        }
        await student.destroy();
        return student; 
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = {
    createStudentController,
    getAllStudentsController,
    updatedStudentByIdController,
    deleteStudentByIdController
}