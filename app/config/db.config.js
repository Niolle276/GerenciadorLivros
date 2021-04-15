module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "*****",
    DB:"db_gerenciador_livros",
    dialect: "mysql",
    pool: {
        max: 6,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};