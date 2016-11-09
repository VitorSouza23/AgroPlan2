angular.module('starter.services.sumarioExecutivo', [])
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

.factory('SumarioExecutivoID', function(){
  var idsSocios = [];
  return{
    idsSocios:idsSocios
  }
});
