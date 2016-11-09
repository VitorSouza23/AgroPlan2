angular.module('starter.services.planoFinanceiro', [])
.service('PlanoFinanceiro', function(){
  this.editar = false;
  this.reordenar = false;
  this.planoFinanceiro = new PlanoFinanceiro();

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

  this.getPlanoFinanceiro = function(){
    return this.planoFinanceiro;
  }
  this.setPlanoFinanceiro = function(planoFinanceiro){
    this.planoFinanceiro = planoFinanceiro;
  }
})

.service('Equipamento', function(){
  this.esquipamento = new Equipamento();

  this.getEquipamento = function(){
    return this.equipamento;
  }

  this.setEquipamento = function(equipamento){
    this.equipamento = equipamento;
  }

  this.novoEquipamento = function(){
    return this.equipamento = new Equipamento();
  }
})

.service('Maquina', function(){
  this.maquina = new Maquina();

  this.getMaquina = function(){
    return this.maquina;
  }

  this.setMaquina = function(maquina){
    this.maquina = maquina;
  }

  this.novaMaquina = function(){
    return this.maquina = new Maquina();
  }
})

.service('Movel', function(){
  this.movel = new Movel();

  this.getMovel = function(){
    return this.movel;
  }

  this.setMovel = function(movel){
    this.movel = movel;
  }

  this.novoMovel = function(){
    return this.movel = new Movel();
  }
})

.service('Utensilio', function(){
  this.utensilio = new Utensilio();

  this.getUtensilio = function(){
    return this.utensilio;
  }

  this.setUtensilio = function(utensilio){
    this.utensilio = utensilio;
  }

  this.novoUtensilio = function(){
    return this.utensilio = new Utensilio();
  }
})

.service('Veiculo', function(){
  this.veiculo = new Veiculo();

  this.getVeiculo = function(){
    return this.veiculo;
  }

  this.setVeiculo = function(veiculo){
    this.veiculo = veiculo;
  }

  this.novoVeiculo = function(){
    return this.veiculo = new Veiculo();
  }
})


.service('Compra', function(){
  this.compra = new Compra();

  this.getCompra = function(){
    return this.compra;
  }

  this.setCompra = function(compra){
    this.compra = compra;
  }

  this.novaCompra = function(){
    return this.compra = new Compra();
  }
})

.service('Venda', function(){
  this.venda = new Venda();

  this.getVenda = function(){
    return this.venda;
  }

  this.setVenda = function(venda){
    this.venda = venda;
  }

  this.novaVenda = function(){
    return this.venda = new Venda();
  }
})

.factory('PlanoFinanceiroID',function(){
  var idsEquipamentos = [];
  var idsMaquinas = [];
  var idsMoveis = [];
  var idsUtensilios = [];
  var idsVeiculos = [];

  var idsCompras = [];
  var idsVendas = [];

  return{
    idsEquipamentos:idsEquipamentos,
    idsMaquinas:idsMaquinas,
    idsMoveis:idsMoveis,
    idsUtensilios:idsUtensilios,
    idsVeiculos:idsVeiculos,
    idsCompras:idsCompras,
    idsVendas:idsVendas
  }
})
;
