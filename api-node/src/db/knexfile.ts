// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "db",
      user: "gameswithfriends",
      password: "password",
      database: "gameswithfriends",
      charset: "utf8",
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
    seeds: {
      directory: __dirname + "/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
