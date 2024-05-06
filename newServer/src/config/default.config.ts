export default () => ({
  port: parseInt(process.env.PORT),
  host: process.env.HOST,
  db: {
    port: parseInt(process.env.DBPORT),
    login: process.env.DBLOGIN,
    password: process.env.PASSWORD,
    name: process.env.NAMEDB,
    host: process.env.HOST,
  },
})
