const Task = require('./Task');
const User = require('./User');

User.hasMany(Task, {
    foreignKey: 'user_id',
})

Task.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { Task, User };
