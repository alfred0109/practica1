const express = require('express');
const router = express.Router();
const {
    createUserController,
    getAllUsersController,
    updatedUserByIdController,
    deleteUserByIdController
} = require('../controllers/userControllers');

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    const { userName, password, role } = req.body;
    try {
        const newUser = await createUserController({ userName, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsersController(req, res, next);
        res.status(200).json(users);
    } catch (error) {
        next(error); // Manejo de errores genérico
    }
});

// Ruta para actualizar un usuario por ID
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await updatedUserByIdController(req, res, next);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error); // Manejo de errores genérico
    }
});

// Ruta para eliminar un usuario por ID
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteUserByIdController(req, res, next);
        res.status(204).send(); // No content
    } catch (error) {
        next(error); // Manejo de errores genérico
    }
});

module.exports = { userRouter: router };