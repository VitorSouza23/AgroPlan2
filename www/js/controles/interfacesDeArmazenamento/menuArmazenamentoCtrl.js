angular.module('starter.controllers.menuArmazenamento', [])
.controller('MenuArmazenamentoCtrl', function($scope){
$scope.menuArmazenamento = [
    { title: 'Sumário Executivo', id: 1, terminado: true},
    { title: 'Análise de Mercado', id: 2, terminado: true},
    { title: 'Plano de Marketing', id: 3, terminado: true },
    { title: 'Plano Operacional', id: 4, terminado: true },
    { title: 'Plano Financeiro', id: 5, terminado: true },
    { title: 'Construção de Cenários', id: 6, terminado: true },
    { title: 'Avaliação Estratégica', id: 7, terminado: true },
    { title: 'Avaliação do Plano de Negócios', id: 8, terminado: true },
    { title: 'Roteiro para Coleta de Informação', id: 9, terminado: true }
]
});
