angular.module('starter.controllers.roteiroParaColeta', ['starter.services.roteiroParaColeta',
    'starter.services.utilitarios'])
        .controller('RoteiroParaColetaCtrl', function ($scope, RoteiroParaColeta, $ionicHistory,
                $ionicPopup, BancoDeDados, $ionicLoading, $rootScope) {
            $scope.roteiroParaColeta = RoteiroParaColeta.getRoteiroParaColeta();

            ionic.on('$locationChangeStart', function () {
                $scope.init();
            });

            $scope.init = function () {

                //$rootScope.verificarSeUsuarioEstaLogado();
                console.log($rootScope.planoDeNegocioMontado.roteiroDeInformacao);

                $scope.roteiroParaColeta = RoteiroParaColeta.getRoteiroParaColeta();
                $scope.roteiroParaColeta._id = $rootScope.planoDeNegocioMontado.roteiroDeInformacao._id;
                $scope.roteiroParaColeta.sumarioExecutivo = $rootScope.planoDeNegocioMontado.roteiroDeInformacao.sumarioExecutivo;
                $scope.roteiroParaColeta.analiseDeMercado = $rootScope.planoDeNegocioMontado.roteiroDeInformacao.analiseDeMercado;
                $scope.roteiroParaColeta.planoDeMarketing = $rootScope.planoDeNegocioMontado.roteiroDeInformacao.planoDeMarketing;
                $scope.roteiroParaColeta.planoOperacional = $rootScope.planoDeNegocioMontado.roteiroDeInformacao.planoOperacional;
                $scope.roteiroParaColeta.planoFinancerio = $rootScope.planoDeNegocioMontado.roteiroDeInformacao.planoFinancerio;

            };

            $scope.bancoDeDados = BancoDeDados;

            $scope.atualizarPagina = function () {
                $scope.roteiroParaColeta._id = undefined;
                $scope.init();
                $scope.$broadcast('scroll.refreshComplete');
            };

            $scope.showConfirm = function () {
                $ionicPopup.confirm({
                    title: 'Roteiro para Coleta de Informação',
                    template: 'É o questionário que o usuário fará para coleta de informações.',
                    cancelText: 'Sair'
                });
            };

            $scope.back = function () {
                $ionicHistory.goBack();
            };

            $scope.salvar = function () {
                var caminho;
                var objeto;
                $ionicLoading.show({
                    template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                    duration: 1000
                }).then(function () {
                    setTimeout(function () {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/roteiroInformacao?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto = $scope.roteiroParaColeta;
                        $scope.bancoDeDados.atualizar(caminho, objeto);

                    }, 1000);
                });

                $scope.hide = function () {
                    $ionicLoading.hide();
                };
            };
        });
