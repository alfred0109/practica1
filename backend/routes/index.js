const express = require('express'); // Asegúrate de importar express
const { studentRouter } = require('../routes/studentRoutes.js');
const {userRouter} = require ('../routes/userRoutes.js') // Corrige la sintaxis de importación

const router = express.Router();

router.use('/student', studentRouter);
router.use('/user', userRouter) // Asegúrate de que studentRouter esté definido y exportado correctamente

module.exports = router;

