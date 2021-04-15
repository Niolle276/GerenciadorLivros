module.exports = app => {
    const livros = require ("../controllers/livro.controller"); 
   

    var router = require ("express").Router();

    router.post("/", livros.create_cadastro);

    router.get("/", livros.findAll_livro);

    router.get("/status", livros.findAll_status)

    router.get("/:id", livros.findOne_id);

    router.put("/:id", livros.update_atualizar);

    router.delete("/:id", livros.delete_livro);

    router.delete("/", livros.deleteAll_livro);
    
    app.use('/api/livro', router)
}