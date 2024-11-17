const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Crea un nuevo usuario
const createUserController = async ({ userName, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const newUser = await User.create({ userName, password: hashedPassword, role });
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Obtiene todos los usuarios
const getAllUsersController = async (req, res, next) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        next(error); // Manejo de errores genérico
    }
}

// Actualiza un usuario por ID
const updatedUserByIdController = async (req, res, next) => {
    const { id } = req.params;
    const userData = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.update(userData);
        return res.status(200).json(user);
    } catch (error) {
        next(error); // Manejo de errores genérico
    }
}

// Elimina un usuario por ID
const deleteUserByIdController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.destroy();
        return res.status(204).send(); // No content
    } catch (error) {
        next(error); // Manejo de errores genérico
    }
}

module.exports = {
    createUserController,
    getAllUsersController,
    updatedUserByIdController,
    deleteUserByIdController
}