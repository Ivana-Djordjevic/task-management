const seedTasks = require('./task-seed');
const seedUsers = require('./user-seed');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedTasks();
    console.log('\n----- TASKS SEEDED -----\n');

    process.exit(0);
};

seedDatabase();
