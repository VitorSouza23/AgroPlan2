angular.module('starter.controllers.menuArmazenamento', [])
.controller('MenuArmazenamentoCtrl', function($scope, $state, $ionicHistory){
  $scope.menuArmazenamento = [
    { title: 'Sumário Executivo', id: 0},
    { title: 'Análise de Mercado', id: 1},
    { title: 'Plano de Marketing', id: 2},
    { title: 'Plano Operacional', id: 3},
    { title: 'Plano Financeiro', id: 4},
    { title: 'Construção de Cenários', id: 5},
    { title: 'Avaliação Estratégica', id: 6},
    { title: 'Avaliação do Plano de Negócios', id: 7},
    { title: 'Roteiro para Coleta de Informação', id: 8}
  ]

  $scope.voltar = function(){
    $ionicHistory.goBack();
  }
});
