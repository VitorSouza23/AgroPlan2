angular.module('starter.services', ['starter.services.utilitarios'])

.service('ServicoLogin', function($q, BancoDeDados) {
  return {
    fazerLogin: function(cpf, senha) {
      var usuarios = [];
      deffered = $q.defer();
      var caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/usuario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      BancoDeDados.pesquisar(caminho, cpf).then(function(dados){
        dados.data;
        console.log(dados);
        usuario = dados.data;
        if (cpf == usuario.cpf && senha == usuario.senha) {
          console.log(usuario);
          deffered.resolve(usuario);
        }
      }, function(erro){
        console.log("Erro: " + erro);
      });
      return deffered.promise;
    },

    cadastrarUsuario: function(novoUsuario){
      deffered = $q.defer();
      var caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/usuario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      BancoDeDados.salvar(caminho, novoUsuario).then(function(dados){
        console.log(dados);
        deffered.resolve(dados);
      }, function(erro){
        console.log(erro);
      });
      return deffered.promise;
    }
  }
})
