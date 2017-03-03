angular.module('starter.services.plano-de-negocios', ['starter.services.utilitarios'])

.service('ServicoPlanoDeNegocio', function(BancoDeDados, $rootScope, $q) {

  return{
    salvarPlanoDeNegocio: function(planoDeNegocio){

      var arrayDePromessas = [];
      var novoPlano;
      var promessasResolvidas;
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/analiseMercado?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = {};
      arrayDePromessas.push(BancoDeDados.salvarPromessa(caminho, objeto));

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoPlano?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = {};
      arrayDePromessas.push(BancoDeDados.salvarPromessa(caminho, objeto));

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/construcaoCenario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = {};
      arrayDePromessas.push(BancoDeDados.salvarPromessa(caminho, objeto));

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoEstrategica?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = {};
      arrayDePromessas.push(BancoDeDados.salvarPromessa(caminho, objeto));

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoMarketing?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = {};
      arrayDePromessas.push(BancoDeDados.salvarPromessa(caminho, objeto));

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoFinanceiro?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = {};
      arrayDePromessas.push(BancoDeDados.salvarPromessa(caminho, objeto));

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoOperacional?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = {};
      arrayDePromessas.push(BancoDeDados.salvarPromessa(caminho, objeto));

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/roteiroInformacao?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = {};
      arrayDePromessas.push(BancoDeDados.salvarPromessa(caminho, objeto));

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/sumarioExecutivo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      objeto = {};
      arrayDePromessas.push(BancoDeDados.salvarPromessa(caminho, objeto));

      console.log(arrayDePromessas);

      $q.all(arrayDePromessas).then(function(dados){
        console.log(dados);
        planoDeNegocio.analiseDeMercadoID = dados[0].data._id;
        planoDeNegocio.avaliacaoDoPlanoID = dados[1].data._id;
        planoDeNegocio.avaliacaoEstrategicaID = dados[2].data._id;
        planoDeNegocio.construcaoDeCenariosID = dados[3].data._id;
        planoDeNegocio.planoDeMarketingID = dados[4].data._id;
        planoDeNegocio.planoFinanceiroID = dados[5].data._id;
        planoDeNegocio.planoOperacinalID = dados[6].data._id;
        planoDeNegocio.roteiroDeInformacaoID = dados[7].data._id;
        planoDeNegocio.sumarioExecutivoID = dados[8].data._id;

        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoDeNegocio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocio;
        return BancoDeDados.salvar(caminho, objeto);
      }).then(function(result){
        console.log(result);
      });
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
    },

    remontarPlanoDeNegocio: function(planoDeNegocioID){
      console.log(planoDeNegocioID);
      $rootScope.planoDeNegocioMontado = {};
      var listaDePromises = [];

      //analiseDeMercado
      if(planoDeNegocioID.analiseDeMercadoID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/analiseMercado?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.analiseDeMercadoID;
        listaDePromises.push(BancoDeDados.recuperarComId(caminho, objeto));
      }else{
        listaDePromises.push($q.defer());
      }

      //avaliacaoDoPlano
      if(planoDeNegocioID.avaliacaoDoPlanoID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoPlano?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.avaliacaoDoPlanoID;
        listaDePromises.push(BancoDeDados.recuperarComId(caminho, objeto));

      }else{
        listaDePromises.push($q.defer());
      }
      //avaliacaoEstrategica
      if(planoDeNegocioID.avaliacaoEstrategicaID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoEstrategica?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.avaliacaoEstrategicaID;
        listaDePromises.push(BancoDeDados.recuperarComId(caminho, objeto));

      }else{
        listaDePromises.push($q.defer());
      }
      //construcaoDeCenarios
      if(planoDeNegocioID.construcaoDeCenariosID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/construcaoCenario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.construcaoDeCenariosID;
        listaDePromises.push(BancoDeDados.recuperarComId(caminho, objeto));

      }else{
        listaDePromises.push($q.defer());
      }
      //planoDeMarketing
      if(planoDeNegocioID.planoDeMarketingID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoMarketing?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.planoDeMarketingID;
        listaDePromises.push(BancoDeDados.recuperarComId(caminho, objeto));

      }else{
        listaDePromises.push($q.defer());
      }


      //planoFinanceiro
      if(planoDeNegocioID.planoFinanceiroID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoFinanceiro?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.planoFinanceiroID;
        listaDePromises.push(BancoDeDados.recuperarComId(caminho, objeto));

      }else{
        listaDePromises.push($q.defer());
      }

      //planoOperacinal
      if(planoDeNegocioID.planoOperacinalID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoOperacional?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.planoOperacionalID;
        listaDePromises.push(BancoDeDados.recuperarComId(caminho, objeto));

      }else{
        listaDePromises.push($q.defer());
      }


      //roteiroDeInformacao
      if(planoDeNegocioID.roteiroDeInformacaoID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/roteiroInformacao?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.roteiroDeInformacaoID;
        listaDePromises.push(BancoDeDados.recuperarComId(caminho, objeto));

      }else{
        listaDePromises.push($q.defer());
      }
      //sumarioExecutivo
      if(planoDeNegocioID.sumarioExecutivoID != undefined){
        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/sumarioExecutivo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
        objeto = planoDeNegocioID.sumarioExecutivoID;
        listaDePromises.push(BancoDeDados.recuperarComId(caminho, objeto));

      }else{
        listaDePromises.push($q.defer());
      }


      $q.all(listaDePromises).then(function(dados){
        console.log(dados);
        $rootScope.planoDeNegocioMontado.analiseDeMercado = dados[0].data[0];
        $rootScope.planoDeNegocioMontado.avaliacaoDoPlano = dados[1].data[0];
        $rootScope.planoDeNegocioMontado.avaliacaoEstrategica = dados[2].data[0];
        $rootScope.planoDeNegocioMontado.construcaoDeCenarios = dados[3].data[0];
        $rootScope.planoDeNegocioMontado.planoDeMarketing = dados[4].data[0];
        $rootScope.planoDeNegocioMontado.planoFinanceiro = dados[5].data[0];
        $rootScope.planoDeNegocioMontado.planoOperacional = dados[6].data[0];
        $rootScope.planoDeNegocioMontado.roteiroDeInformacao = dados[7].data[0];
        $rootScope.planoDeNegocioMontado.sumarioExecutivo = dados[8].data[0];
      });


      console.log($rootScope.planoDeNegocioMontado);

    }
  }

});
