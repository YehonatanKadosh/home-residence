module.exports = {
  async up(db, client) {
    await db.collection('users').insertMany([
      {
        username: 'FirstAdminUsername',
        password: 'FirstAdminPassword',
        role: 'admin',
      },
      {
        username: 'SecondAdminUsername',
        password: 'SecondAdminPassword',
        role: 'admin',
      },
      {
        username: 'FirstUserUsername',
        password: 'FirstUserPassword',
        role: 'user',
      },
      {
        username: 'SecondUserUsername',
        password: 'SecondUserPassword',
        role: 'user',
      },
    ]);
  },

  async down(db, client) {
    await db.collection('users').deleteMany({});
  },
};
