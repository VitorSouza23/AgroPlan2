function PlanoFinanceiro(){
  this.estoqueInicial = new EstoqueInicial();
  this.vendas = new Array();
  this.compras = new Array();

  this.addVenda = function(venda){
    this.vendas.push(venda);
  };

  this.removerVenda = function(venda){
    var pos = this.vendas.indexOf(venda);
    this.vendas.splice(pos,1);
  };

  this.editarVenda = function(venda){
    var pos = this.vendas.indexOf(venda);
    this.vendas[pos] = vendas;
  };

  this.addCompra = function(compra){
    this.compras.push(compra);
  };

  this.removerCompra = function(compra){
    var pos = this.compras.indexOf(compra);
    this.compras.splice(pos,1);
  };

  this.editarCompra = function(compra){
    var pos = this.compras.indexOf(compra);
    this.compras[pos] = compra;
  };
}

function Equipamento(){
  this.descricao;
  this.quantidade;
  this.valorUnitario;


  this.calcularTotal = function(){
    return this.valorUnitario * this.quantidade;
  }
}

function Maquina(){
  this.descricao;
  this.quantidade;
  this.valorUnitario;


  this.calcularTotal = function(){
    return this.valorUnitario * this.quantidade;
  }
}

function Movel(){
  this.descricao;
  this.quantidade;
  this.valorUnitario;


  this.calcularTotal = function(){
    return this.valorUnitario * this.quantidade;
  }
}

function Utensilio(){
  this.descricao;
  this.quantidade;
  this.valorUnitario;

  this.calcularTotal = function(){
    return this.valorUnitario * this.quantidade;
  }
}

function Veiculo(){
  this.descricao;
  this.quantidade;
  this.valorUnitario;


  this.calcularTotal = function(){
    return this.valorUnitario * this.quantidade;
  }
}

function EstoqueInicial(){
  this.equipamentos = new Array();
  this.maquinas = new Array();
  this.moveis = new Array();
  this.utensilios = new Array();
  this.veiculos = new Array();


  this.addEquipamento = function(equipamento){
    this.equipamentos.push(equipamento);
  };

  this.removerEquipamento = function(equipamento){
    var pos = this.equipamentos.indexOf(equipamento);
    this.equipamentos.splice(pos,1);
  };

  this.editarEquipamento = function(equipamento){
    var pos = this.equipamentos.indexOf(equipamento);
    this.equipamentos[pos] = equipamento;
  };

  this.addMaquina = function(maquina){
    this.maquinas.push(maquina);
  };

  this.removerMaquina = function(maquina){
    var pos = this.maquinas.indexOf(maquina);
    this.maquinas.splice(pos,1);
  };

  this.editarMaquina = function(maquina){
    var pos = this.maquinas.indexOf(maquina);
    this.maquinas[pos] = maquina;
  };

  this.addMovel = function(movel){
    this.moveis.push(movel);
  };

  this.removerMovel = function(movel){
    var pos = this.moveis.indexOf(movel);
    this.moveis.splice(pos,1);
  };

  this.editarMovel = function(movel){
    var pos = this.moveis.indexOf(movel);
    this.moveis[pos] = movel;
  };

  this.addUtensilio= function(utensilio){
    this.utensilios.push(utensilio);
  };

  this.removerUtensilio = function(utensilio){
    var pos = this.utensilios.indexOf(utensilio);
    this.utensilios.splice(pos,1);
  };

  this.editarUtensilio = function(utensilio){
    var pos = this.utensilios.indexOf(utensilio);
    this.utensilios[pos] = utensilio;
  };

  this.addVeiculo = function(veiculo){
    this.veiculos.push(veiculo);
  };

  this.removerVeiculo = function(veiculo){
    var pos = this.veiculos.indexOf(veiculo);
    this.veiculos.splice(pos,1);
  };

  this.editarVeiculo = function(veiculo){
    var pos = this.veiculos.indexOf(veiculo);
    this.veiculos[pos] = veiculo;
  };

  this.valorFinalDeGastosIniciais = function(){
    var valorFinal = 0;
    for(e in this.equipamentos){
      valorFinal += e.calcularTotal();
    }
    for(e in this.maquinas){
      valorFinal += e.calcularTotal();
    }
    for(e in this.moveis){
      valorFinal += e.calcularTotal();
    }
    for(e in this.utensilios){
      valorFinal += e.calcularTotal();
    }
    for(e in this.veiculos){
      valorFinal += e.calcularTotal();
    }
    return valorFinal;
  };


};

function Venda(){
  this.dias;
  this.porcentagem;

  this.calcularMediaPonderadaDeDias = function(){
    return this.dias * this.porcentagem;
  }
};

function Compra(){
  this.dias;
  this.porcentagem;

  this.calcularMediaPonderadaDeDias = function(){
    return this.dias * this.porcentagem;
  }
};
