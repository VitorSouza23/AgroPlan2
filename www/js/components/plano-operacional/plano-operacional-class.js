function PlanoOperacional(){
  this.layout;
  this.capacidadeProdutiva;
  this.capacidadeComercial;
  this.capacidadeComercialInicial;
  this.capacidadeProdutivaInicial;
  this.processosOperacionais;
  this.cargos = [];

  this.addCargo = function(cargo){
    this.cargos.push(cargo);
  };

  this.removerCargo = function(cargo){
    var pos = this.cargos.indexOf(cargo);
    this.cargos.splice(pos,1);
  };

  this.editarCargo = function(cargo){
    var pos = this.cargos.indexOf(cargo);
    this.cargos[pos] = cargo;
  };

}

function Cargo(){
  this._id;
  this.nome;
  this.salarioBase;
  this.qualificacoes;
  this.idUsuario;
}
