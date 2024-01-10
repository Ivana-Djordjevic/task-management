const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notification extends Model {}

Notification.init(
    {
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        details: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'notification'
    }
);

module.exports = Notification;