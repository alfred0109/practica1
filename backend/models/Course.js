const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const   Course = sequelize.define('Course',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    credits:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports=Course