// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'posgres://localhost/weatherapp'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
