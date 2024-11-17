const { DataTypes} = require('sequelize')
const sequelize = require('../db')


const User = sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true //para que sea autoincrementable
    },
    userName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false
    }
})



module.exports=User