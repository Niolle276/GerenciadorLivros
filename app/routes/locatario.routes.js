module.exports = app => {
    const locatarios = require ("../controllers/locatario.controller"); 
   

    var router = require ("express").Router();

    router.post("/", locatarios.create_locatario);

    router.get("/", locatarios.findAll_locatario);

    router.get("/status", locatarios.findAll_status)

    router.get("/:id", locatarios.findOne_id);

    router.put("/:id", locatarios.update_locatario);

    router.delete("/:id", locatarios.delete_locatario);

    router.delete("/", locatarios.deleteAll_locatario);
    
    app.use('/api/locatario', router)
}