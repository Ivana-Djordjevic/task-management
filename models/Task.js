const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        priority: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        // progress: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     defaultValue: 0
        // },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        notification: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'task'
    }
);

module.exports = Task;