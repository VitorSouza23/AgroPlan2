angular.module('starter.controllers', ['starter.services','starter.controllers.sumarioExecutivo',
'starter.controllers.analiseDeMercado', 'starter.controllers.planoFinanceiro',
'starter.controllers.planoDeMarketing', 'starter.controllers.planoOperacional',
'starter.controllers.construcaoDeCenario', 'starter.controllers.avaliacaoEstrategica',
'starter.controllers.roteiroParaColeta', 'starter.controllers.avaliacaoDoPlano',
'starter.controllers.login'])


.controller('MenuCtrl', function($scope, Menu) {
  $scope.menu = Menu;
})
