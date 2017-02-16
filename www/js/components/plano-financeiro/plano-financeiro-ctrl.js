angular.module('starter.controllers.planoFinanceiro', ['starter.services.planoFinanceiro',
'starter.services.utilitarios'])

.controller('PlanoFinanceiroCtrl', function($scope, PlanoFinanceiro, Equipamento, Utensilio, Movel,
   Maquina, Veiculo, Compra, Venda, $ionicListDelegate, $ionicHistory, $ionicPopup, $timeout,
   BancoDeDados,$ionicLoading, PlanoFinanceiroID, Modal, $rootScope){

     $scope.planoFinanceiro = PlanoFinanceiro.getPlanoFinanceiro();

  $scope.init = function(){

  }

  $scope.editar = PlanoFinanceiro.getEditar();
  $scope.bancoDeDados = BancoDeDados;
  $scope.planoFinanceiroID = PlanoFinanceiroID;

  Modal.init('js/components/plano-financeiro/subitens/equipamentos.html', $scope).then(function(modal){
    $scope.modalEquipamento = modal;
  });
  Modal.init('js/components/plano-financeiro/subitens/maquinas.html', $scope).then(function(modal){
    $scope.modalMaquina = modal;
  });
  Modal.init('js/components/plano-financeiro/subitens/moveis.html', $scope).then(function(modal){
    $scope.modalMovel = modal;
  });
  Modal.init('js/components/plano-financeiro/subitens/utensilios.html', $scope).then(function(modal){
    $scope.modalUtensilio = modal;
  });
  Modal.init('js/components/plano-financeiro/subitens/veiculos.html', $scope).then(function(modal){
    $scope.modalVeiculo = modal;
  });
  Modal.init('js/components/plano-financeiro/subitens/vendas.html', $scope).then(function(modal){
    $scope.modalVenda = modal;
  });
  Modal.init('js/components/plano-financeiro/subitens/compras.html', $scope).then(function(modal){
    $scope.modalCompra = modal;
  });

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Plano Financeiro',
      template: 'É onde o usuário irá informar o total de recursos a serem investidos para que o negócio comece a funcionar.',
      cancelText: 'Sair'
    })};


    //Equipamento
    $scope.addEquipamento = function(){
      if(!$scope.editar){
        $scope.equipamento.idUsuario = $rootScope.usuario._id.$oid;
        salvarEquipamento($scope.equipamento);
        $scope.planoFinanceiro.estoqueInicial.addEquipamento($scope.equipamento);
      }else{
        $scope.planoFinanceiro.estoqueInicial.editarEquipamento($scope.equipamento);
        atualizarEquipamento($scope.equipamento);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.modalEquipamento.hide();
    };

    $scope.botaoRemoverEquipamento= function(equipamento){
      var pos = $scope.planoFinanceiroID.idsEquipamentos.indexOf(equipamento._id.$oid);
      $scope.planoFinanceiroID.idsEquipamentos.splice(pos,1);
      $scope.planoFinanceiro.estoqueInicial.removerEquipamento(equipamento);
    };

    $scope.botaoEditarEquipamento = function(equipamento){
      $scope.equipamento = equipamento;
      $scope.editar = true;
      $scope.openEquipamentos();
    };

    $scope.openEquipamentos = function() {
      $scope.modalEquipamento.show();
      if(!$scope.editar){
        $scope.equipamento = Equipamento.novoEquipamento();
      }
    };

    $scope.excluirEquipamentoPermanentemente = function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Excluir?',
        template: 'Deseja excluir permanentemente este item?',
        cancelText: 'Não'
      });

      confirmPopup.then(function(res) {
        if(res) {
          excluirEquipamento($scope.equipamento);
          console.log("Excluído!");
        } else {
          console.log('Não Excluído!');
        }
      });
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
        $scope.maquina.idUsuario = $rootScope.usuario._id.$oid;
        salvarMaquina($scope.maquina);
        $scope.planoFinanceiro.estoqueInicial.addMaquina($scope.maquina);
      }else{
        $scope.planoFinanceiro.estoqueInicial.editarMaquina($scope.maquina);
        atualizarMaquina($scope.maquina);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.modalMaquina.hide();
    };

    $scope.botaoRemoverMaquina= function(maquina){
      var pos = $scope.planoFinanceiroID.idsMaquinas.indexOf(maquina._id.$oid);
      $scope.planoFinanceiroID.idsMaquinas.splice(pos,1);
      $scope.planoFinanceiro.estoqueInicial.removerMaquina(maquina);
    };

    $scope.botaoEditarMaquina = function(maquina){
      $scope.maquina = maquina;
      $scope.editar = true;
      $scope.openMaquinas();
    };

    $scope.openMaquinas = function() {
      $scope.modalMaquina.show();
      if(!$scope.editar){
        $scope.maquina = Maquina.novaMaquina();
      }
    };

    $scope.excluirMaquinaPermanentemente = function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Excluir?',
        template: 'Deseja excluir permanentemente este item?',
        cancelText: 'Não'
      });

      confirmPopup.then(function(res) {
        if(res) {
          excluirMaquina($scope.maquina);
          console.log("Excluído!");
        } else {
          console.log('Não Excluído!');
        }
      });
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
        $scope.movel.idUsuario = $rootScope.usuario._id.$oid;
        salvarMovel($scope.movel);
        $scope.planoFinanceiro.estoqueInicial.addMovel($scope.movel);
      }else{
        $scope.planoFinanceiro.estoqueInicial.editarMovel($scope.movel);
        atualizarMovel($scope.movel);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.modalMovel.hide();
    };

    $scope.botaoRemoverMovel= function(movel){
      var pos = $scope.planoFinanceiroID.idsMoveis.indexOf(movel._id.$oid);
      $scope.planoFinanceiroID.idsMoveis.splice(pos,1);
      $scope.planoFinanceiro.estoqueInicial.removerMovel(movel);
    };

    $scope.botaoEditarMovel= function(movel){
      $scope.movel = movel;
      $scope.editar = true;
      $scope.openMoveis();
    };

    $scope.excluirMovelPermanentemente = function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Excluir?',
        template: 'Deseja excluir permanentemente este item?',
        cancelText: 'Não'
      });

      confirmPopup.then(function(res) {
        if(res) {
          excluirMovel($scope.movel);
          console.log("Excluído!");
        } else {
          console.log('Não Excluído!');
        }
      });
    };

    $scope.openMoveis = function() {
      $scope.modalMovel.show();
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
        $scope.utensilio.idUsuario = $rootScope.usuario._id.$oid;
        salvarUtensilio($scope.utensilio);
        $scope.planoFinanceiro.estoqueInicial.addUtensilio($scope.utensilio);
      }else{
        $scope.planoFinanceiro.estoqueInicial.editarUtensilio($scope.utensilio);
        atualizarUtensilio($scope.utensilio);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.modalUtensilio.hide();
    };

    $scope.botaoRemoverUtensilio = function(utensilio){
      var pos = $scope.planoFinanceiroID.idsUtensilios.indexOf(utensilio._id.$oid);
      $scope.planoFinanceiroID.idsUtensilios.splice(pos,1);
      $scope.planoFinanceiro.estoqueInicial.removerUtensilio(utensilio);
    };

    $scope.botaoEditarUtensilio= function(utensilio){
      $scope.utensilio = utensilio;
      $scope.editar = true;
      $scope.openUtensilios();
    };

    $scope.excluirUtensilioPermanentemente = function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Excluir?',
        template: 'Deseja excluir permanentemente este item?',
        cancelText: 'Não'
      });

      confirmPopup.then(function(res) {
        if(res) {
          excluirUtensilio($scope.utensilio);
          console.log("Excluído!");
        } else {
          console.log('Não Excluído!');
        }
      });
    };

    $scope.openUtensilios = function() {
      $scope.modalUtensilio.show();
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
        $scope.veiculo.idUsuario = $rootScope.usuario._id.$oid;
        salvarVeiculo($scope.veiculo);
        $scope.planoFinanceiro.estoqueInicial.addVeiculo($scope.veiculo);
      }else{
        $scope.planoFinanceiro.estoqueInicial.editarVeiculo($scope.veiculo);
        atualizarVeiculo($scope.veiculo);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.modalVeiculo.hide();
    };

    $scope.botaoRemoverVeiculo = function(veiculo){
      var pos = $scope.planoFinanceiroID.idsVeiculos.indexOf(veiculo._id.$oid);
      $scope.planoFinanceiroID.idsVeiculos.splice(pos,1);
      $scope.planoFinanceiro.estoqueInicial.removerVeiculo(veiculo);
    };

    $scope.botaoEditarVeiculo= function(veiculo){
      $scope.veiculo = veiculo;
      $scope.editar = true;
      $scope.openVeiculos();
    };

    $scope.excluirVeiculoPermanentemente = function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Excluir?',
        template: 'Deseja excluir permanentemente este item?',
        cancelText: 'Não'
      });

      confirmPopup.then(function(res) {
        if(res) {
          excluirVeiculo($scope.veiculo);
          console.log("Excluído!");
        } else {
          console.log('Não Excluído!');
        }
      });
    };

    $scope.openVeiculos = function() {
      $scope.modalVeiculo.show();
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
        $scope.venda.idUsuario = $rootScope.usuario._id.$oid;
        salvarVenda($scope.venda);
        $scope.planoFinanceiro.addVenda($scope.venda);
      }else{
        $scope.planoFinanceiro.editarVenda($scope.venda);
        atualizarVenda($scope.venda);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.modalVenda.hide();
    };

    $scope.botaoRemoverVenda = function(venda){
      var pos = $scope.planoFinanceiroID.idsVendas.indexOf(venda._id.$oid);
      $scope.planoFinanceiroID.idsVendas.splice(pos,1);
      $scope.planoFinanceiro.removerVenda(venda);
    };

    $scope.botaoEditarVenda= function(venda){
      $scope.venda = venda;
      $scope.editar = true;
      $scope.openVendas();
    };

    $scope.excluirVendaPermanentemente = function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Excluir?',
        template: 'Deseja excluir permanentemente este item?',
        cancelText: 'Não'
      });

      confirmPopup.then(function(res) {
        if(res) {
          excluirVenda($scope.venda);
          console.log("Excluído!");
        } else {
          console.log('Não Excluído!');
        }
      });
    };

    $scope.openVendas = function() {
      $scope.modalVenda.show();
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
        $scope.compra.idUsuario = $rootScope.usuario._id.$oid;
        salvarCompra($scope.compra);
        $scope.planoFinanceiro.addCompra($scope.compra);
      }else{
        $scope.planoFinanceiro.editarCompra($scope.compra);
        atualizarCompra($scope.compra);
        $scope.editar = false;
        $ionicListDelegate.closeOptionButtons();
      }
      $scope.modalCompra.hide();
    };

    $scope.botaoRemoverCompra = function(compra){
      var pos = $scope.planoFinanceiroID.idsCompras.indexOf(compra._id.$oid);
      $scope.planoFinanceiroID.idsCompras.splice(pos,1);
      $scope.planoFinanceiro.removerCompra(compra);
    };

    $scope.botaoEditarCompra= function(compra){
      $scope.compra = compra;
      $scope.editar = true;
      $scope.openCompras();
    };

    $scope.excluirCompraPermanentemente = function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Excluir?',
        template: 'Deseja excluir permanentemente este item?',
        cancelText: 'Não'
      });

      confirmPopup.then(function(res) {
        if(res) {
          excluirCompra($scope.compra);
          console.log("Excluído!");
        } else {
          console.log('Não Excluído!');
        }
      });
    };

    $scope.openCompras = function() {
      $scope.modalCompra.show();
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

      $ionicLoading.show({
        template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 1000
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
          $scope.bancoDeDados.salvar(caminho, objeto).then(function(dados){
            console.log(dados.data);
            $rootScope.planoDeNegocioID.planoFinanceiroID = dados.data._id.$oid;
          });
        }, 10000);
      });

      $scope.hide = function(){
        $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
        });

      };
    };


    function salvarEquipamento(equipamento){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/equipamento?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvar(caminho, equipamento).then(function(dados){
        console.log(dados.data);
        $scope.equipamento._id = dados.data._id;
        $scope.planoFinanceiroID.idsEquipamentos.push(dados.data._id.$oid);
      });
    };

    function atualizarEquipamento(equipamento){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/equipamento?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.atualizar(caminho, equipamento).then(function(dados){
        console.log(dados.data);
      });
    };

    function excluirEquipamento(equipamento){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/equipamento?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.remover(caminho, equipamento).then(function(dados){
        console.log(dados.data);
      });
      $scope.botaoRemoverEquipamento(equipamento);
      $scope.modalEquipamento.hide();
    };


    function salvarMaquina(maquina){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/maquina?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvar(caminho, maquina).then(function(dados){
        console.log(dados.data);
        $scope.maquina._id = dados.data._id;
        $scope.planoFinanceiroID.idsMaquinas.push(dados.data._id.$oid);
      });
    };

    function atualizarMaquina(maquina){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/maquina?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.atualizar(caminho, maquina).then(function(dados){
        console.log(dados.data);
      });
    };

    function excluirMaquina(maquina){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/maquina?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.remover(caminho, maquina).then(function(dados){
        console.log(dados.data);
      });
      $scope.botaoRemoverMaquina(maquina);
      $scope.modalMaquina.hide();
    };


    function salvarMovel(movel){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/movel?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvar(caminho, movel).then(function(dados){
        console.log(dados.data);
        $scope.movel._id = dados.data._id;
        $scope.planoFinanceiroID.idsMoveis.push(dados.data._id.$oid);
      });
    };

    function atualizarMovel(movel){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/movel?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.atualizar(caminho, movel).then(function(dados){
        console.log(dados.data);
      });
    };

    function excluirMovel(movel){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/movel?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.remover(caminho, movel).then(function(dados){
        console.log(dados.data);
      });
      $scope.botaoRemoverMovel(movel);
      $scope.modalMovel.hide();
    };


    function salvarUtensilio(utensilio){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/utensilio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvar(caminho, utensilio).then(function(dados){
        console.log(dados.data);
        $scope.utensilio._id = dados.data._id;
        $scope.planoFinanceiroID.idsUtensilios.push(dados.data._id.$oid);
      });
    };

    function atualizarUtensilio(utensilio){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/utensilio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.atualizar(caminho, utensilio).then(function(dados){
        console.log(dados.data);
      });
    };

    function excluirUtensilio(utensilio){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/utensilio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.remover(caminho, utensilio).then(function(dados){
        console.log(dados.data);
      });
      $scope.botaoRemoverUtensilio(utensilio);
      $scope.modalUtensilio.hide();
    };


    function salvarVeiculo(veiculo){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/veiculo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvar(caminho, veiculo).then(function(dados){
        console.log(dados.data);
        $scope.veiculo._id = dados.data._id;
        $scope.planoFinanceiroID.idsVeiculos.push(dados.data._id.$oid);
      });
    };

    function atualizarVeiculo(veiculo){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/veiculo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.atualizar(caminho, veiculo).then(function(dados){
        console.log(dados.data);
      });
    };

    function excluirVeiculo(veiculo){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/veiculo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.remover(caminho, veiculo).then(function(dados){
        console.log(dados.data);
      });
      $scope.botaoRemoverVeiculo(veiculo);
      $scope.modalVeiculo.hide();
    };


    function salvarCompra(compra){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/compra?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvar(caminho, compra).then(function(dados){
        console.log(dados.data);
        $scope.compra._id = dados.data._id;
        $scope.planoFinanceiroID.idsCompras.push(dados.data._id.$oid);
      });
    };

    function atualizarCompra(compra){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/compra?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.atualizar(caminho, compra).then(function(dados){
        console.log(dados.data);
      });
    };

    function excluirCompra(compra){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/compra?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.remover(caminho, compra).then(function(dados){
        console.log(dados.data);
      });
      $scope.botaoRemoverCompra(compra);
      $scope.modalCompra.hide();
    };


    function salvarVenda(venda){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/venda?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.salvar(caminho, venda).then(function(dados){
        console.log(dados.data);
        $scope.venda._id = dados.data._id;
        $scope.planoFinanceiroID.idsVendas.push(dados.data._id.$oid);
      });
    };

    function atualizarVenda(venda){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/venda?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.atualizar(caminho, venda).then(function(dados){
        console.log(dados.data);
      });
    };

    function excluirVenda(venda){
      caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/venda?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
      $scope.bancoDeDados.remover(caminho, venda).then(function(dados){
        console.log(dados.data);
      });
      $scope.botaoRemoverVenda(venda);
      $scope.modalVenda.hide();
    };

    $scope.recuperarDadosEquipamentos = function(){
      $ionicLoading.show({
        template: 'Acessando Equipamentos... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 1000
      }).then(function(){
        $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/equipamento?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function(dados){
          $scope.planoFinanceiro.estoqueInicial.equipamentos = dados.data;
          $scope.planoFinanceiroID.idsEquipamentos = [];
          dados.data.forEach(function(dado){
            $scope.planoFinanceiroID.idsEquipamentos.push(dado._id.$oid);
          })
          console.log(dados);
        });
      });
    };

    $scope.recuperarDadosMaquinas = function(){
      $ionicLoading.show({
        template: 'Acessando Maquinas... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 1000
      }).then(function(){
        $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/maquina?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function(dados){
          $scope.planoFinanceiro.estoqueInicial.maquinas = dados.data;
          $scope.planoFinanceiroID.idsMaquinas = [];
          dados.data.forEach(function(dado){
            $scope.planoFinanceiroID.idsMaquinas.push(dado._id.$oid);
          })
          console.log(dados);
        });
      });
    };

    $scope.recuperarDadosMoveis = function(){
      $ionicLoading.show({
        template: 'Acessando Moveis... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 1000
      }).then(function(){
        $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/movel?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function(dados){
          $scope.planoFinanceiro.estoqueInicial.moveis = dados.data;
          $scope.planoFinanceiroID.idsMoveis = [];
          dados.data.forEach(function(dado){
            $scope.planoFinanceiroID.idsMoveis.push(dado._id.$oid);
          })
          console.log(dados);
        });
      });
    };

    $scope.recuperarDadosUtensilios = function(){
      $ionicLoading.show({
        template: 'Acessando Utensílios... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 1000
      }).then(function(){
        $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/utensilio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function(dados){
          $scope.planoFinanceiro.estoqueInicial.utensilios = dados.data;
          $scope.planoFinanceiroID.idsUtensilios = [];
          dados.data.forEach(function(dado){
            $scope.planoFinanceiroID.idsUtensilios.push(dado._id.$oid);
          })
          console.log(dados);
        });
      });
    };

    $scope.recuperarDadosVeiculos = function(){
      $ionicLoading.show({
        template: 'Acessando Veiculos... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 1000
      }).then(function(){
        $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/veiculo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function(dados){
          $scope.planoFinanceiro.estoqueInicial.veiculos = dados.data;
          $scope.planoFinanceiroID.idsVeiculos = [];
          dados.data.forEach(function(dado){
            $scope.planoFinanceiroID.idsVeiculos.push(dado._id.$oid);
          })
          console.log(dados);
        });
      });
    };

    $scope.recuperarDadosCompras = function(){
      $ionicLoading.show({
        template: 'Acessando Compras... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 1000
      }).then(function(){
        $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/compra?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function(dados){
          $scope.planoFinanceiro.compras = dados.data;
          $scope.planoFinanceiroID.idsCompras = [];
          dados.data.forEach(function(dado){
            $scope.planoFinanceiroID.idsCompras.push(dado._id.$oid);
          })
          console.log(dados);
        });
      });
    };

    $scope.recuperarDadosVendas = function(){
      $ionicLoading.show({
        template: 'Acessando Vendas... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
        duration: 1000
      }).then(function(){
        $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/venda?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function(dados){
          $scope.planoFinanceiro.vendas = dados.data;
          $scope.planoFinanceiroID.idsVendas = [];
          dados.data.forEach(function(dado){
            $scope.planoFinanceiroID.idsVendas.push(dado._id.$oid);
          })
          console.log(dados);
        });
      });
    };

  });
