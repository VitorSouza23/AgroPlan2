angular.module('starter.services.construcaoDeCenario', [])
.service('ConstrucaoDeCenario', function(){
  this.editar = false;
  this.reordenar = false;
  this.construcaoDeCenario = new ConstrucaoDeCenario();

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

  this.getConstrucaoDeCenario = function(){
    return this.construcaoDeCenario;
  }
  this.setConstrucaoDeCenario= function(construcaoDeCenario){
    this.construcaoDeCenario = construcaoDeCenario;
  }
});
