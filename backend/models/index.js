const sequelize = require('../db')

//importar los modelos
const Student = require('./Student')
const Course = require('./Course')
const User = require('./User')



const db ={
    sequelize,
    Student,
    Course,
    User
    //agregar si hay mas modelos aqui.
}

module.exports = db