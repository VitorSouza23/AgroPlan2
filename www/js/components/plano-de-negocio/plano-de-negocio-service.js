angular.module('starter.services.plano-de-negocios', ['starter.services.utilitarios'])

.service('ServicoPlanoDeNegocio', function(BancoDeDados, $rootScope) {

  return{
    salvarPlanoDeNegocio: function(planoDeNegocio){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoDeNegocio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = planoDeNegocio;
      var novoPlano;
      objeto.idUsuario = $rootScope.usuario._id.$oid;
      BancoDeDados.salvar(caminho, objeto).then(function(dados){
        console.log(dados.data);
        novoPlano = dados.data;
      })
      return novoPlano;
    },

    atualizarPlanoDeNegocio: function(planoDeNegocio){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoDeNegocio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = planoDeNegocio;
      BancoDeDados.atualizar(caminho, objeto).then(function(dados){
        console.log(dados.data);
      })
    },

    excluirPlanoDeNegocio: function(planoDeNegocio){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoDeNegocio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = planoDeNegocio;
      BancoDeDados.remover(caminho, objeto).then(function(dados){
        console.log(dados.data);
      })
    },

    novoPlanoDeNegocio: function(){
      return new PlanoDeNegocio();
    }
  }
});
