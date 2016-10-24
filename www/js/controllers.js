angular.module('starter.controllers', ['starter.services'])


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('AvaliacaoEstrategicaCtrl', function($scope, AvaliacaoEstrategica){
  $scope.avaliacaoEstrategica = AvaliacaoEstrategica;
})

.controller('AnaliseDeMercadoCtrl', function($scope, AnaliseDeMercado, Concorrente, Fornecedor, $ionicModal, $ionicListDelegate, $ionicHistory){
  $scope.analiseDeMercado = AnaliseDeMercado.getAnaliseDeMercado();
  $scope.editar  = AnaliseDeMercado.editar;


  $scope.addConcorrente = function(){
    if(!$scope.editar){
      $scope.analiseDeMercado.addConcorrente($scope.concorrente);
    }else{
      $scope.analiseDeMercado.editarConcorrente($scope.concorrente);
      $scope.editar = false;
      $ionicListDelegate.closeOptionButtons();
    }
    $scope.closeConcorrentes();
  }

  $scope.botaoRemoverConcorrente = function(concorrente){
    $scope.analiseDeMercado.removerConcorrente(concorrente);
  };

  $scope.botaoEditarConcorrente = function(concorrente){
    $scope.concorrente = concorrente;
    $scope.editar = true;
    $scope.openConcorrentes();
  };

  $ionicModal.fromTemplateUrl('menus/subitens/concorrentes.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeConcorrentes = function() {
    $scope.modal.hide();
  };

  $scope.openConcorrentes = function() {
    $scope.modal.show();
    if(!$scope.editar){
      $scope.concorrente = Concorrente.novoConcorrente();
    }

  };

  $scope.addFornecedor = function(){
    if(!$scope.editar){
      $scope.analiseDeMercado.addFornecedor($scope.fornecedor);
    }else{
      $scope.analiseDeMercado.editarFornecedor($scope.fornecedor);
      $scope.editar = false;
      $ionicListDelegate.closeOptionButtons();
    }
    $scope.closeFornecedores();
  }

  $scope.botaoRemoverFornecedor = function(fornecedor){
    $scope.analiseDeMercado.removerFornecedor(fornecedor);
  };

  $scope.botaoEditarFornecedor = function(fornecedor){
    $scope.fornecedor = fornecedor;
    $scope.editar = true;
    $scope.openFornecedores();
  };

  $ionicModal.fromTemplateUrl('menus/subitens/fornecedores.html', {
    scope: $scope
  }).then(function(modale) {
    $scope.modale = modale;
  });

  $scope.closeFornecedores = function() {
    $scope.modale.hide();
  };

  $scope.openFornecedores = function() {
    $scope.modale.show();
    if(!$scope.editar){
      $scope.fornecedor = Fornecedor.novoFornecedor();
    }

  };

  $scope.back = function(){
    $ionicHistory.goBack();
  };

  $scope.mostrarReordemConcorrente = function(){
    $scope.reordenarConcorrente = !$scope.reordenarConcorrente;
  }

  $scope.moverConcorrente = function(item, fromIndex, toIndex) {
    $scope.analiseDeMercado.concorrentes.splice(fromIndex, 1);
    $scope.analiseDeMercado.concorrentes.splice(toIndex, 0, item);
  };

  $scope.mostrarReordemFornecedor = function(){
    $scope.reordenarFornecedor = !$scope.reordenarFornecedor;
  }

  $scope.moverFornecedor = function(item, fromIndex, toIndex) {
    $scope.analiseDeMercado.fornecedores.splice(fromIndex, 1);
    $scope.analiseDeMercado.fornecedores.splice(toIndex, 0, item);
  };
})

.controller('AvaliacaoDoPlanoCtrl', function($scope, AvaliacaoDoPlano){
  $scope.avaliacaoDoPlano = AvaliacaoDoPlano;
})

.controller('CosntrucaoDeCenarioCtrl', function($scope, ConstrucaoDeCenario){
  $scope.construcaoDeCenario = ConstrucaoDeCenario;
})

.controller('PlanoFinanceiroCtrl', function($scope, PlanoFinanceiro){
  $scope.planoFinanceiro = PlanoFinanceiro;
})
.controller('PlanoDeMarketingCtrl', function($scope, PlanoDeMarketing, Produto, $ionicModal, $ionicListDelegate, $ionicHistory){
  $scope.planoDeMarketing = PlanoDeMarketing.getPlanoDeMarketing();
  $scope.editar = PlanoDeMarketing.editar;

  $scope.addProduto = function(){
    if(!$scope.editar){
      $scope.planoDeMarketing.addProduto($scope.produto);
    }else{
      $scope.planoDeMarketing.editarProduto($scope.produto);
      $scope.editar = false;
      $ionicListDelegate.closeOptionButtons();
    }
    $scope.closeProdutos();
  }

  $scope.botaoRemoverProduto= function(produto){
    $scope.planoDeMarketing.removerProduto(produto);
  };

  $scope.botaoEditarProduto = function(produto){
    $scope.produto = produto;
    $scope.editar = true;
    $scope.openProdutos();
  };

  $scope.back = function(){
    $ionicHistory.goBack();
  };

  $ionicModal.fromTemplateUrl('menus/subitens/produtos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeProdutos = function() {
    $scope.modal.hide();
  };

  $scope.openProdutos= function() {
    $scope.modal.show();
    if(!$scope.editar){
      $scope.produto = Produto.novoProduto();
    }
  };

  $scope.mostrarReordem = function(){
    $scope.reordenar = !$scope.reordenar;
  }

  $scope.moverProduto = function(item, fromIndex, toIndex) {
    $scope.planoDeMarketing.produtos.splice(fromIndex, 1);
    $scope.planoDeMarketing.produtos.splice(toIndex, 0, item);
  };
})

.controller('PlanoOperacionalCtrl', function($scope, PlanoOperacional, Cargo, $ionicModal, $ionicListDelegate, $ionicHistory){
  $scope.planoOperacional = PlanoOperacional.getPlanoOperacional();
  $scope.editar = PlanoOperacional.editar;

  $scope.addCargo = function(){
    if(!$scope.editar){
      $scope.planoOperacional.addCargo($scope.cargo);
    }else{
      $scope.planoOperacional.editarCargo($scope.cargo);
      $scope.editar = false;
      $ionicListDelegate.closeOptionButtons();
    }
    $scope.closeCargos();
  };

  $scope.botaoRemoverCargo = function(cargo){
    $scope.planoOperacional.removerCargo(cargo);
  };

  $scope.botaoEditarCargo = function(cargo){
    $scope.cargo = cargo;
    $scope.editar = true;
    $scope.openCargos();
  };

  $scope.back = function(){
    $ionicHistory.goBack();
  };

  $ionicModal.fromTemplateUrl('menus/subitens/cargos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeCargos = function() {
    $scope.modal.hide();
  };

  $scope.openCargos= function() {
    $scope.modal.show();
    if(!$scope.editar){
      $scope.cargo = Cargo.novoCargo();
    }
  };

  $scope.takePicture = function () {

    var options = {
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      quality : 75,
      targetWidth: 200,
      targetHeight: 200,
      sourceType: 1
    };

    Camera.getPicture(options).then(function(imageData) {
      $scope.picture = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      console.log(err);
    });

  };

  $scope.getPicture = function () {

    var options = {
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      quality : 75,
      targetWidth: 200,
      targetHeight: 200,
      sourceType: 0
    };

    Camera.getPicture(options).then(function(imageData) {
      $scope.picture = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      console.log(err);
    });
  };

  $scope.mostrarReordem = function(){
    $scope.reordenar = !$scope.reordenar;
  }

  $scope.moverCargo = function(item, fromIndex, toIndex) {
    $scope.planoOperacional.cargos.splice(fromIndex, 1);
    $scope.planoOperacional.cargos.splice(toIndex, 0, item);
  };


})

.controller('RoteiroParaColetaCtrl', function($scope, RoteiroParaColeta){
  $scope.roteiroParaColeta = RoteiroParaColeta;
})

.controller('SumarioExecutivoCtrl', function($scope, SumarioExecutivo, Socio, $ionicModal, $ionicListDelegate, $ionicHistory){
  $scope.sumarioExecutivo = SumarioExecutivo.getSumarioExecutivo();
  $scope.cnpjOuCpf = SumarioExecutivo.getCnpjOuCpf();
  $scope.escolherCnpjOuCpf = SumarioExecutivo.escolherCnpjOuCpf();
  $scope.editar = SumarioExecutivo.editar;


  $scope.socio = Socio.getSocio();

  $scope.botaoAdicionarSocio = function(socio){
    if(!this.editar){
      $scope.sumarioExecutivo.adicionarSocio($scope.socio);
      $ionicListDelegate.closeOptionButtons();
    }else{
      $scope.sumarioExecutivo.editarSocio($scope.socio);
      $scope.editar = false;
    }
    $scope.closeSocios();
  };

  $scope.botaoRemoverSocio = function(socio){
    $scope.sumarioExecutivo.removerSocio(socio);
  };

  $scope.botaoEditarSocio = function(socio){
    $scope.socio = socio;
    $scope.editar = true;
    $scope.openSocios();

  };

  $ionicModal.fromTemplateUrl('menus/subitens/socios.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeSocios = function() {
    $scope.modal.hide();
  };

  $scope.openSocios = function() {
    $scope.modal.show();
    if(!$scope.editar){
      $scope.socio = Socio.novoSocio();
    }
  };

  $scope.back = function(){
    $ionicHistory.goBack();
  };

  $scope.mostrarReordem = function(){
    $scope.reordenar = !$scope.reordenar;
  }

  $scope.moverSocio = function(item, fromIndex, toIndex) {
    $scope.sumarioExecutivo.socios.splice(fromIndex, 1);
    $scope.sumarioExecutivo.socios.splice(toIndex, 0, item);
  };

})

;
