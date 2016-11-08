angular.module('starter.services.analiseDeMercado', [])
.service('AnaliseDeMercado', function(){
  this.editar = false;
  this.reordenar = false;
  this.analiseDeMercado = new AnaliseDeMercado();

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

  this.getAnaliseDeMercado = function(){
    return this.analiseDeMercado;
  }
  this.setAnaliseDeMercado = function(analiseDeMercado){
    this.analiseDeMercado = analiseDeMercado;
  }

  this.novaAnaliseDeMercado = function(){
    return new AnaliseDeMercado();
  }
})

.service('Fornecedor', function(){
  this.fornecedor = new Fornecedor();

  this.getFornecedor = function(){
    return this.fornecedor;
  }

  this.setFornecedor = function(fornecedor){
    this.fornecedor = fornecedor;
  }

  this.novoFornecedor = function(){
    return this.fornecedor = new Fornecedor();
  }
})

.service('Concorrente', function(){
  this.concorrente = new Concorrente();

  this.getConcorrente = function(){
    return this.concorrente;
  }

  this.setConcorrente = function(concorrente){
    this.concorrente = concorrente;
  }

  this.novoConcorrente = function(){
    return this.concorrente = new Concorrente();
  }
})

.factory('AnaliseDeMercadoID', function(){
  var idCliente;
  var idsFornecedores = [];
  var idsConcorrentes = [];
  return{
    idCliente : idCliente,
    idsFornecedores : idsFornecedores,
    idsConcorrentes : idsConcorrentes
  }
})
