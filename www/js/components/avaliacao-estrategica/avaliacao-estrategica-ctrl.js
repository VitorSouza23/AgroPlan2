/* global angular */

angular.module('starter.controllers.avaliacaoEstrategica', ['starter.services.avaliacaoEstrategica',
    'starter.services.utilitarios'])

        .controller('AvaliacaoEstrategicaCtrl', function ($scope, AvaliacaoEstrategica, $ionicHistory,
                $ionicPopup, BancoDeDados, $ionicLoading, $rootScope) {
            $scope.avaliacaoEstrategica = AvaliacaoEstrategica.getAvaliacaoEstrategica();

            ionic.on('$locationChangeStart', function () {
                $scope.init();
            });

            $scope.init = function () {

                //$rootScope.verificarSeUsuarioEstaLogado();
                console.log($rootScope.planoDeNegocioMontado.avaliacaoEstrategica);

                $scope.avaliacaoEstrategica = AvaliacaoEstrategica.getAvaliacaoEstrategica();
                var avaliacaoEstrategicaAux = $rootScope.planoDeNegocioMontado.avaliacaoEstrategica;
                $scope.avaliacaoEstrategica._id = avaliacaoEstrategicaAux._id;
                if(avaliacaoEstrategicaAux.forca !== undefined){
                    $scope.avaliacaoEstrategica.forca = avaliacaoEstrategicaAux.forca;
                }else{
                    $scope.avaliacaoEstrategica.forca = '';
                }
                if(avaliacaoEstrategicaAux.fraquesa !== undefined){
                    $scope.avaliacaoEstrategica.fraquesa = avaliacaoEstrategicaAux.fraquesa;
                }else{
                    $scope.avaliacaoEstrategica.fraquesa = '';
                }
                if(avaliacaoEstrategicaAux.oportunidade){
                    $scope.avaliacaoEstrategica.oportunidade = avaliacaoEstrategicaAux.oportunidade;
                }else{
                    $scope.avaliacaoEstrategica.oportunidade = '';
                }
                if(avaliacaoEstrategicaAux.ameaca !== undefined){
                    $scope.avaliacaoEstrategica.ameaca = avaliacaoEstrategicaAux.ameaca;
                }else{
                    $scope.avaliacaoEstrategica.ameaca = '';
                }
            };

            $scope.bancoDeDados = BancoDeDados;
            $scope.showConfirm = function () {
                $ionicPopup.confirm({
                    title: 'Avaliação Estratégica',
                    template: 'É onde o usuário fará a avaliação de suas estratégias para seu negócio através da Análise FOFA.',
                    cancelText: 'Sair'
                });
            };

            $scope.back = function () {
                $ionicHistory.goBack();
            };

            $scope.atualizarPagina = function () {
                $scope.avaliacaoEstrategica._id = undefined;
                $scope.init();
                $scope.$broadcast('scroll.refreshComplete');
            };

            $scope.salvar = function () {
                var caminho;
                var objeto;
                $ionicLoading.show({
                    template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                    duration: 1000
                }).then(function () {
                    setTimeout(function () {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/avaliacaoEstrategica?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto = $scope.avaliacaoEstrategica;
                        $scope.bancoDeDados.atualizar(caminho, objeto);

                    }, 1000);
                });

                $scope.hide = function () {
                    $ionicLoading.hide().then(function () {
                        console.log("The loading indicator is now hidden");
                    });

                };
            };
        });
