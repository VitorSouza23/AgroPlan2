angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('AnaliseDeMercado', function(){
  var analiseDeMercado = new AnaliseDeMercado();
  return analiseDeMercado;
})

.service('AvaliacaoEstrategica', function(){
  var avaliacaoEstrategica = new AvaliacaoEstrategica();
  return avaliacaoEstrategica;
})
.service('AvaliacaoDoPlano', function(){
  var avaliacaoDoPlano = new AvaliacaoDoPlano();
  return avaliacaoDoPlano;
})

.service('ConstrucaoDeCenario', function(){
  var construcaoDeCenarios = new ConstrucaoDeCenario();
  return construcaoDeCenarios;
})

.service('PlanoFinanceiro', function(){
  var planoFinanceiro = new PlanoFinanceiro();
  return planoFinanceiro;
})
.service('PlanoDeMarketing', function(){
  var planoDeMarketing= new PlanoDeMarketing();
  return planoDeMarketing;
})

.service('PlanoOperacional', function(){
  var planoOperacional= new PlanoOperacional();
  return planoOperacional;
})
.service('RoteiroParaColeta', function(){
  var roteiroParaColeta = new RoteiroParaColeta();
  return roteiroParaColeta;
})

.service('SumarioExecutivo', function(){
  this.editar = false;
  this.cnpjOuCpf = false;
  this.reordenar = false;
  this.sumarioExecutivo = new SumarioExecutivo();

  this.escolherCnpjOuCpf = function(){
   this.cnpjOuCpf = !this.cnpjOuCpf;
  }

  this.getCnpjOuCpf = function(){
    return this.cnpjOuCpf;
  }

  this.getEditar = function(){
    return this.editar;
  }

  this.setEditar = function(e){
    this.editar = e;
  }

  this.getReordenar = function(){
    return this.reordenar;
  }

  this.setReordenar = function(r){
    this.reordenar = r;
  }

  this.getSumarioExecutivo = function(){
    return this.sumarioExecutivo;
  }
  this.setSumarioExecutivio = function(sumarioExecutivo){
    this.sumarioExecutivo = sumarioExecutivo;
  }

})

.service('Socio', function(){
  this.socio = new Socio();

  this.getSocio = function(){
    return this.socio;
  }

  this.setSocio = function(socio){
    this.socio = socio;
  }

  this.novoSocio = function(){
    return this.socio = new Socio();
  }

})


;
