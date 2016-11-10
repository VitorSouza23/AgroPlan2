angular.module('starter.controllers.planoFinanceiro', ['starter.services.planoFinanceiro', 'starter.services.planoFinanceiro'])

.controller('PlanoFinanceiroCtrl', function($scope, PlanoFinanceiro, Equipamento, Utensilio, Movel, Maquina, Veiculo, Compra, Venda, $ionicModal, $ionicListDelegate, $ionicHistory, $ionicPopup, $timeout, BancoDeDados,$ionicLoading, PlanoFinanceiroID){
  $scope.planoFinanceiro = PlanoFinanceiro.getPlanoFinanceiro();
  $scope.editar = PlanoFinanceiro.getEditar();
  $scope.bancoDeDados = BancoDeDados;
  $scope.planoFinanceiroID = PlanoFinanceiroID;
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Plano Financeiro',
      template: 'É onde o usuário irá informar o total de recursos a serem investidos para que o negócio comece a funcionar.',
      cancelText: 'Sair'
    })};


    //Equipamento
    $scope.addEquipamento = function(){
      if(!$scope.editar){
        $scope.planoFinanceiro.estoqueInicial.addEquipamento($scope.equipamento);
      }else{
        $scope.planoFinanceiro.estoqueInicial.editarEquipamento($scope.equipamento);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.closeEquipamentos();
    };

    $scope.botaoRemoverEquipamento= function(equipamento){
      $scope.planoFinanceiro.estoqueInicial.removerEquipamento(equipamento);
    };

    $scope.botaoEditarEquipamento = function(equipamento){
      $scope.equipamento = equipamento;
      $scope.editar = true;
      $scope.openEquipamentos();
    };

    $ionicModal.fromTemplateUrl('menus/subitens/equipamentos.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modale = modal;
    });

    $scope.closeEquipamentos = function() {
      $scope.modale.hide();
      $scope.equipamento = null;
    };

    $scope.openEquipamentos = function() {
      $scope.modale.show();
      if(!$scope.editar){
        $scope.equipamento = Equipamento.novoEquipamento();
      }
    };

    $scope.mostrarReordemEquipamento = function(){
      $scope.reordenarEquipamento = !$scope.reordenarEquipamento;
    }

    $scope.moverEquipamento = function(item, fromIndex, toIndex) {
      $scope.planoFinanceiro.estoqueInicial.equipamentos.splice(fromIndex, 1);
      $scope.planoFinanceiro.estoqueInicial.equipamentos.splice(toIndex, 0, item);
    };

    $scope.back = function(){
      $ionicHistory.goBack();
    };

    //Máquina

    $scope.addMaquina = function(){
      if(!$scope.editar){
        $scope.planoFinanceiro.estoqueInicial.addMaquina($scope.maquina);
      }else{
        $scope.planoFinanceiro.estoqueInicial.editarMaquina($scope.maquina);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.closeMaquinas();
    };

    $scope.botaoRemoverMaquina= function(maquina){
      $scope.planoFinanceiro.estoqueInicial.removerMaquina(maquina);
    };

    $scope.botaoEditarMaquina = function(maquina){
      $scope.maquina = maquina;
      $scope.editar = true;
      $scope.openMaquinas();
    };

    $ionicModal.fromTemplateUrl('menus/subitens/maquinas.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalma = modal;
    });

    $scope.closeMaquinas = function() {
      $scope.modalma.hide();
      $scope.maquina = null;
    };

    $scope.openMaquinas = function() {
      $scope.modalma.show();
      if(!$scope.editar){
        $scope.maquina = Maquina.novaMaquina();
      }
    };

    $scope.mostrarReordemMaquina = function(){
      $scope.reordenarMaquina = !$scope.reordenarMaquina;
    }

    $scope.moverMaquina= function(item, fromIndex, toIndex) {
      $scope.planoFinanceiro.estoqueInicial.maquinas.splice(fromIndex, 1);
      $scope.planoFinanceiro.estoqueInicial.maquinas.splice(toIndex, 0, item);
    };


    //Móvel

    $scope.addMovel = function(){
      if(!$scope.editar){
        $scope.planoFinanceiro.estoqueInicial.addMovel($scope.movel);
      }else{
        $scope.planoFinanceiro.estoqueInicial.editarMovel($scope.movel);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.closeMoveis();
    };

    $scope.botaoRemoverMovel= function(movel){
      $scope.planoFinanceiro.estoqueInicial.removerMovel(movel);
    };

    $scope.botaoEditarMovel= function(movel){
      $scope.movel = movel;
      $scope.editar = true;
      $scope.openMoveis();
    };

    $ionicModal.fromTemplateUrl('menus/subitens/moveis.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalmo = modal;
    });

    $scope.closeMoveis = function() {
      $scope.modalmo.hide();
      $scope.movel = null;
    };

    $scope.openMoveis = function() {
      $scope.modalmo.show();
      if(!$scope.editar){
        $scope.movel = Movel.novoMovel();
      }
    };

    $scope.mostrarReordemMovel = function(){
      $scope.reordenarMovel = !$scope.reordenarMovel;
    }

    $scope.moverMovel = function(item, fromIndex, toIndex) {
      $scope.planoFinanceiro.estoqueInicial.moveis.splice(fromIndex, 1);
      $scope.planoFinanceiro.estoqueInicial.moveis.splice(toIndex, 0, item);
    };

    //Utensílios

    $scope.addUtensilio = function(){
      if(!$scope.editar){
        $scope.planoFinanceiro.estoqueInicial.addUtensilio($scope.utensilio);
      }else{
        $scope.planoFinanceiro.estoqueInicial.editarUtensilio($scope.utensilio);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.closeUtensilios();
    };

    $scope.botaoRemoverUtensilio = function(utensilio){
      $scope.planoFinanceiro.estoqueInicial.removerUtensilio(utensilio);
    };

    $scope.botaoEditarUtensilio= function(utensilio){
      $scope.utensilio = utensilio;
      $scope.editar = true;
      $scope.openUtensilios();
    };

    $ionicModal.fromTemplateUrl('menus/subitens/utensilios.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalu = modal;
    });

    $scope.closeUtensilios = function() {
      $scope.modalu.hide();
      $scope.utensilio = null;
    };

    $scope.openUtensilios = function() {
      $scope.modalu.show();
      if(!$scope.editar){
        $scope.utensilio = Utensilio.novoUtensilio();
      }
    };

    $scope.mostrarReordemUtensilio = function(){
      $scope.reordenarUtensilio = !$scope.reordenarUtensilio;
    }

    $scope.moverUtensilio = function(item, fromIndex, toIndex) {
      $scope.planoFinanceiro.estoqueInicial.utensilios.splice(fromIndex, 1);
      $scope.planoFinanceiro.estoqueInicial.utensilios.splice(toIndex, 0, item);
    };

    //Veíclo

    $scope.addVeiculo = function(){
      if(!$scope.editar){
        $scope.planoFinanceiro.estoqueInicial.addVeiculo($scope.veiculo);
      }else{
        $scope.planoFinanceiro.estoqueInicial.editarVeiculo($scope.veiculo);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.closeVeiculos();
    };

    $scope.botaoRemoverVeiculo = function(veiculo){
      $scope.planoFinanceiro.estoqueInicial.removerVeiculo(veiculo);
    };

    $scope.botaoEditarVeiculo= function(veiculo){
      $scope.veiculo = veiculo;
      $scope.editar = true;
      $scope.openVeiculos();
    };

    $ionicModal.fromTemplateUrl('menus/subitens/veiculos.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalv = modal;
    });

    $scope.closeVeiculos = function() {
      $scope.modalv.hide();
      $scope.veiculo = null;
    };

    $scope.openVeiculos = function() {
      $scope.modalv.show();
      if(!$scope.editar){
        $scope.veiculo = Veiculo.novoVeiculo();
      }
    };

    $scope.mostrarReordemVeiculo = function(){
      $scope.reordenarVeiculo = !$scope.reordenarVeiculo;
    }

    $scope.moverVeiculo = function(item, fromIndex, toIndex) {
      $scope.planoFinanceiro.estoqueInicial.veiculos.splice(fromIndex, 1);
      $scope.planoFinanceiro.estoqueInicial.veiculos.splice(toIndex, 0, item);
    };

    //venda

    $scope.addVenda = function(){
      if(!$scope.editar){
        $scope.planoFinanceiro.addVenda($scope.venda);
      }else{
        $scope.planoFinanceiro.editarVenda($scope.venda);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.closeVendas();
    };

    $scope.botaoRemoverVenda = function(venda){
      $scope.planoFinanceiro.removerVenda(venda);
    };

    $scope.botaoEditarVenda= function(venda){
      $scope.venda = venda;
      $scope.editar = true;
      $scope.openVendas();
    };

    $ionicModal.fromTemplateUrl('menus/subitens/vendas.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalven = modal;
    });

    $scope.closeVendas = function() {
      $scope.modalven.hide();
      $scope.venda = null;
    };

    $scope.openVendas = function() {
      $scope.modalven.show();
      if(!$scope.editar){
        $scope.venda = Venda.novaVenda();
      }
    };

    $scope.mostrarReordemVenda = function(){
      $scope.reordenarVenda= !$scope.reordenarVenda;
    }

    $scope.moverVenda= function(item, fromIndex, toIndex) {
      $scope.planoFinanceiro.vendas.splice(fromIndex, 1);
      $scope.planoFinanceiro.vendas.splice(toIndex, 0, item);
    };

    //compra

    $scope.addCompra = function(){
      if(!$scope.editar){
        $scope.planoFinanceiro.addCompra($scope.compra);
      }else{
        $scope.planoFinanceiro.editarCompra($scope.compra);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.closeCompras();
    };

    $scope.botaoRemoverCompra = function(compra){
      $scope.planoFinanceiro.removerCompra(compra);
    };

    $scope.botaoEditarCompra= function(compra){
      $scope.compra = compra;
      $scope.editar = true;
      $scope.openCompras();
    };

    $ionicModal.fromTemplateUrl('menus/subitens/compras.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalcom = modal;
    });

    $scope.closeCompras = function() {
      $scope.modalcom.hide();
      $scope.venda = null;
    };

    $scope.openCompras = function() {
      $scope.modalcom.show();
      if(!$scope.editar){
        $scope.compra =
        Compra.novaCompra();
      }
    };
    $scope.mostrarReordemCompra = function(){
      $scope.reordenarCompra = !$scope.reordenarCompra;
    }

    $scope.moverCompra = function(item, fromIndex, toIndex) {
      $scope.planoFinanceiro.compras.splice(fromIndex, 1);
      $scope.planoFinanceiro.compras.splice(toIndex, 0, item);
    };

    $scope.salvar = function(){
      var caminho;
      var objeto;

      salvarEquipamentos();
      salvarMaquinas();
      salvarMoveis();
      salvarUtensilios();
      salvarVeiculos();
      salvarCompras();
      salvarVendas();

      $ionicLoading.show({
        template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 10000
      }).then(function(){
        setTimeout(function(){
          console.log($scope.planoFinanceiroID.idsEquipamentos);
          console.log($scope.planoFinanceiroID.idsMaquinas);
          console.log($scope.planoFinanceiroID.idsMoveis);
          console.log($scope.planoFinanceiroID.idsUtensilios);
          console.log($scope.planoFinanceiroID.idsVeiculos);
          console.log($scope.planoFinanceiroID.idsCompras);
          console.log($scope.planoFinanceiroID.idsVendas);
          json = angular.toJson($scope.planoFinanceiroID);
          localStorage.setItem("planoFinanceiro", json);
          caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoFinanceiro?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
          objeto = $scope.planoFinanceiroID;
          $scope.bancoDeDados.salvar(caminho, objeto);
        }, 10000);
      });

      $scope.hide = function(){
        $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
        });

      };
    };

    function salvarEquipamentos(){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/equipamento?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvarArray(caminho, $scope.planoFinanceiro.estoqueInicial.equipamentos).then(function (dados){
        dados.forEach(function(dado){
          $scope.planoFinanceiroID.idsEquipamentos.push(dado.data._id);
          console.log(dado);
        });
      });

    }

    function salvarMaquinas(){

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/maquina?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvarArray(caminho, $scope.planoFinanceiro.estoqueInicial.maquinas).then(function(dados){
        dados.forEach(function(dado){
          $scope.planoFinanceiroID.idsMaquinas.push(dado.data._id);
          console.log(dado);
        })
      });
    }

    function salvarMoveis(){

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/movel?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvarArray(caminho, $scope.planoFinanceiro.estoqueInicial.moveis).then(function(dados){
        dados.forEach(function(dado){
          $scope.planoFinanceiroID.idsMoveis.push(dado.data._id);
          console.log(dado);
        })
      });
    }

    function salvarUtensilios(){

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/utensilio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvarArray(caminho, $scope.planoFinanceiro.estoqueInicial.utensilios).then(function(dados){
        dados.forEach(function(dado){
          $scope.planoFinanceiroID.idsUtensilios.push(dado.data._id);
          console.log(dado);
        })
      });
    }

    function salvarVeiculos(){

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/veiculo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvarArray(caminho, $scope.planoFinanceiro.estoqueInicial.veiculos).then(function(dados){
        dados.forEach(function(dado){
          $scope.planoFinanceiroID.idsVeiculos.push(dado.data._id);
          console.log(dado);
        })
      });
    }

    function salvarCompras(){

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/compra?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvarArray(caminho, $scope.planoFinanceiro.compras).then(function(dados){
        dados.forEach(function(dado){
          $scope.planoFinanceiroID.idsCompras.push(dado.data._id);
          console.log(dado);
        })
      });
    }

    function salvarVendas(){

      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/venda?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvarArray(caminho, $scope.planoFinanceiro.vendas).then(function(dados){
        dados.forEach(function(dado){
          $scope.planoFinanceiroID.idsVendas.push(dado.data._id);
          console.log(dado);
        })
      });
    }
  });
