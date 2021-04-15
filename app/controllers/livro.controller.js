const db = require ("../models");

Livro = db.livros;
const Op = db.sequelize.Op; // redução de código

exports.create_cadastro = (req, res) => {
   //Validate Request
   if (!req.body.nome){
       res.status(400).send({
           message: "Cadastro de livros não pode estar vazio!"
       });
       return;
   }

   const livro = {
       nome: req.body.nome,
       autor: req.body.autor,
       sinopse: req.body.sinopse,
       data_lancamento: req.body.data_lancamento,
       data_aluguel: req.body.data_aluguel,
       status: req.body.status ? req.body.status: false,
   };
   Livro.create(livro)
   .then((data) => {
       res.send(data);
   })
   .catch ((err) => {
       res.status(500).send ({
           message:err.message || "Erro interno ao criar o cadastro dos livros"
       })
   })
};

exports.findAll_livro = (req, res) =>{ 
   Livro.findAll()
   .then((data) => {
       res.send(data);
   })
   .catch((err) => {
       res.status(500).send({
           message:
           err.message || "Erro interno ao buscar os livros"
       }); 
   });
};
exports.findAll_status = (req, res) => {
    Livro.findAll({where: {status: true}})
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Erro interno ao buscar os livros publicados"
        }); 
    });
};

exports.findOne_id = (req, res) => {
 
    const id = req.params.id;
  
    Livro.findByPk(id)
    .then((data) => {
        if (!data){
            res.status(400).send({message: "id não encontrado"})
        }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
        err.message || `Erro interno ao buscar os livros pelo id: ${id}`
      });
    });
};
  
exports.update_atualizar = (req, res) => {
    const id = req.params.id;

    Livro.update(req.body, {
        where: {id : id}
    })
    .then(num => {
        if (num == 1) {
        res.send({
            message: "Cadastro atualizado"
        });
    } else {
        res.send({
            message: `Não foi possível atualizar o cadastro pelo id ${id}, livro não encontrado ou body vazio`
        });
    }
})
.catch(err => {
    res.status(500).send({
      message: `Erro interno ao atualizar o cadastro de id: ${id}`
    })
  })
};

exports.delete_livro = (req, res) => {
    const id = req.params.id;
  
    Livro.destroy({where: {id : id}})
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cadastro apagado com sucesso"
        });
      } else {
        res.send({
          message: `Não foi possível apagar o cadastro de id: ${id}, cadastro não encontrado ou body vazio`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Erro interno ao apagar o cadastro de id: ${id}`
      })
    })
  }

  exports.deleteAll_livro =(req, res) => {
      Livro.destroy({where: {},
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