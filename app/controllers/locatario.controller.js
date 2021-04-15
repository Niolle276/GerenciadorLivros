const db = require ("../models");

Locatario = db.locatarios;
const Op = db.sequelize.Op; // redução de código

exports.create_locatario = (req, res) => {
   //Validate Request
   if (!req.body.nome){
       res.status(400).send({
           message: "Cadastro do locatario não pode ser vazio!"
       });
       return;
   }

   const locatario = {
       nome: req.body.nome,
       cpf: req.body.cpf,
       status: req.body.status ? req.body.status: false,
   };
   Locatario.create(locatario)
   .then((data) => {
       res.send(data);
   })
   .catch ((err) => {
       res.status(500).send ({
           message:err.message || "Erro interno ao criar o cadastro de locatarios"
       })
   })
};

exports.findAll_locatario = (req, res) =>{ 
   Locatario.findAll()
   .then((data) => {
       res.send(data);
   })
   .catch((err) => {
       res.status(500).send({
           message:
           err.message || "Erro interno ao cadastar os locatarios"
       }); 
   });
};
exports.findAll_status = (req, res) => {
    Locatario.findAll({where: {status: true}})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Erro interno ao buscar os locatarios cadastrados"
        }); 
    });
};

exports.findOne_id = (req, res) => {
 
    const id = req.params.id;
  
    Locatario.findByPk(id)
    .then((data) => {
        if (!data){
            res.status(400).send({message: "id não encontrado"})
        }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
        err.message || `Erro interno ao buscar os locatarios pelo id: ${id}`
      });
    });
};
  
exports.update_locatario = (req, res) => {
    const id = req.params.id;

    Locatario.update(req.body, {
        where: {id : id}
    })
    .then(num => {
        if (num == 1) {
        res.send({
            message: "Cadastro atualizado"
        });
    } else {
        res.send({
            message: `Não foi possível atualizar o cadastro dos locatarios pelo id ${id}, locatario não encontrado ou body vazio`
        });
    }
})
.catch(err => {
    res.status(500).send({
      message: `Erro interno ao cadastro de id: ${id}`
    })
  })
};

exports.delete_locatario = (req, res) => {
    const id = req.params.id;
  
    Locatario.destroy({where: {id : id}})
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cadastro do locatario apagado com sucesso"
        });
      } else {
        res.send({
          message: `Não foi possível apagar o cadastro de id: ${id}, cadastro do locatario não encontrado ou body vazio`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Erro interno ao apagar o cadastro do locatario pelo id: ${id}`
      })
    })
  }

  exports.deleteAll_locatario =(req, res) => {
      Locatario.destroy({where: {},
    truncate: false })
    .then(nums =>{
        res.send({message: `${nums} Cadastros deletados com sucesso`})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Erro ao deletar todos os cadastros"
        });
    });
  };