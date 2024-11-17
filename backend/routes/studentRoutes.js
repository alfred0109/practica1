const { Router } = require('express')
const { createStudentController, getAllStudentsController,updatedStudentByIdController,deleteStudentByIdController

} = require('../controllers/studentControllers')
const Student = require('../models/Student')

const studentRouter = Router()

//crear nuevo studiante

studentRouter.post("/", async (req, res) => {
    const { id, firstName, lastName } = req.body
    try {
        const newStudent = await createStudentController({ id, firstName, lastName })
        res.status(201).json(newStudent)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//get de la base de datos
studentRouter.get("/", async(req,res)=>{
    try {
        const student = await  getAllStudentsController()
        res.status(200).json(student) 

    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


//ACTUALIZAR RUT
studentRouter.put("/:id", async  (req, res) => {
    const  { id } = req.params
    const  studentData = req.body
    try {
        const updatedStudent = await updatedStudentByIdController(id, studentData)
        if  (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" })
        }
        res.status(200).json( updatedStudent)

    } catch (error) {
        res.status(400).json( {error:error.message})
    }

})

//eliminar datos

studentRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await deleteStudentByIdController(id)
        if (!deletedStudent) {
            return res.status.apply(404).json({ message: "Estudiante no encontrado" })
        }
        res.status(200).json({message:"estudiante eliminado "}); // Devuelve el mensaje de éxito
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = {
    studentRouter
}