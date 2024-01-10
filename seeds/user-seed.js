const { User } = require('../models');

const UserData = [
    {
        'name': 'Flora',
        'email': 'test@test.com',
        'password': '$2b$10$daObReD5OEQ1Ddf99Ire3eQykvmdcUiEG274NPZN4KmgGjTQ0dKzq' //password12345
    },
    {
        'name': 'Layla',
        'email': 'test@test2.com',
        'password': '$2b$10$daObReD5OEQ1Ddf99Ire3eQykvmdcUiEG274NPZN4KmgGjTQ0dKzq'
    },
];

const seedUsers = () => User.bulkCreate(UserData);

module.exports = seedUsers;