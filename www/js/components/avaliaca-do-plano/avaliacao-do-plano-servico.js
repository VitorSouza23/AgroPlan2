/* global angular */

angular.module('starter.services.avaliacaoDoPlano', [])
.service('AvaliacaoDoPlano', function(){
  this.editar = false;
  this.reordenar = false;
  this.avaliacaoDoPlano = new AvaliacaoDoPlano();

  this.getEditar = function(){
    return this.editar;
  };

  this.setEditar = function(e){
    this.editar = e;
  };

  this.getReordenar = function(){
    return this.reordenar;
  };

  this.setReordenar = function(r){
    this.reordenar = r;
  };

  this.getAvaliacaoDoPlano = function(){
    return this.avaliacaoDoPlano;
  };
  
  this.setAvaliacaoDoPlano = function(avaliacaoDoPlano){
    this.avaliacaoDoPlano = avaliacaoDoPlano;
  };
});
