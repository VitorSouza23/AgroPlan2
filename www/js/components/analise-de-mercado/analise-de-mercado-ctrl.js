/* global angular */

angular.module('starter.controllers.analiseDeMercado', ['starter.services.analiseDeMercado',
    'starter.services.utilitarios'])

        .controller('AnaliseDeMercadoCtrl', function ($scope, AnaliseDeMercado, AnaliseDeMercadoID,
                Concorrente, Fornecedor, $ionicListDelegate, $ionicHistory, $ionicPopup,
                BancoDeDados, $ionicLoading, Modal, $rootScope, RecuperarPartes, MontadorAnaliseDeMercado) {
            $scope.analiseDeMercado = AnaliseDeMercado.getAnaliseDeMercado();
            $scope.editar = AnaliseDeMercado.editar;
            $scope.bancoDeDados = BancoDeDados;
            $scope.analiseDeMercadoID = AnaliseDeMercadoID;

            ionic.on('$locationChangeStart', function () {
                $scope.init();
            });

            ionic.on('$locationChangeSuccess', function () {
                $scope.init();
            });


            $scope.init = function () {
                console.log($rootScope.planoDeNegocioMontado.analiseDeMercado);


                var analiseDeMercadoAux = RecuperarPartes.recuperarAnaliseDeMercado($rootScope.planoDeNegocioMontado.analiseDeMercado);
                $ionicLoading.show({
                    template: 'Carregando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                    duration: 1500
                }).then(function () {
                    setTimeout(function () {
                        console.log(analiseDeMercadoAux);
                        $scope.analiseDeMercado = MontadorAnaliseDeMercado.montar(analiseDeMercadoAux);
                        $scope.analiseDeMercadoID = MontadorAnaliseDeMercado.montarID(analiseDeMercadoAux);
                    }, 1000);

                });
            };

            $scope.atualizarPagina = function () {
                $scope.analiseDeMercado._id = undefined;
                $scope.init();
                $scope.$broadcast('scroll.refreshComplete');
            };

            Modal.init('js/components/analise-de-mercado/subitens/concorrentes.html', $scope).then(function (modal) {
                $scope.modalConcorrente = modal;
            });

            Modal.init('js/components/analise-de-mercado/subitens/fornecedores.html', $scope).then(function (modal) {
                $scope.modalFornecedor = modal;
            });

            $scope.addConcorrente = function () {
                if (!$scope.editar) {
                    $scope.concorrente.idUsuario = $rootScope.usuario._id;
                    salvarConcorrente($scope.concorrente);
                    $scope.analiseDeMercado.addConcorrente($scope.concorrente);
                } else {
                    $scope.analiseDeMercado.editarConcorrente($scope.concorrente);
                    atualizarConcorrente($scope.concorrente);
                    $scope.editar = false;
                    $ionicListDelegate.closeOptionButtons();
                }
                $scope.modalConcorrente.hide();
            };

            $scope.showConfirm = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Análise de Mercado',
                    template: 'É onde serão inseridos os dados coletados pelo usuário em relação do seu empreendimento com o mercado.',
                    cancelText: 'Sair'
                });
            };


            $scope.botaoRemoverConcorrente = function (concorrente) {
                var pos = $scope.analiseDeMercadoID.idsConcorrentes.indexOf(concorrente._id);
                $scope.analiseDeMercadoID.idsConcorrentes.splice(pos, 1);
                $scope.analiseDeMercado.removerConcorrente(concorrente);
            };

            $scope.botaoEditarConcorrente = function (concorrente) {
                $scope.concorrente = concorrente;
                $scope.editar = true;
                $scope.openConcorrentes();
            };

            $scope.openConcorrentes = function () {
                $scope.modalConcorrente.show();
                if (!$scope.editar) {
                    $scope.concorrente = Concorrente.novoConcorrente();
                }
            };

            $scope.excluirConcorrentePermanentemente = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Excluir?',
                    template: 'Deseja excluir permanentemente este item?',
                    cancelText: 'Não'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        excluirConcorrente($scope.concorrente);
                        console.log("Excluído!");
                    } else {
                        console.log('Não Excluído!');
                    }
                });
            };

            $scope.addFornecedor = function () {
                if (!$scope.editar) {
                    $scope.fornecedor.idUsuario = $rootScope.usuario._id;
                    salvarFornecedor($scope.fornecedor);
                    console.log($scope.fornecedor);
                    $scope.analiseDeMercado.addFornecedor($scope.fornecedor);

                } else {
                    $scope.analiseDeMercado.editarFornecedor($scope.fornecedor);
                    atualizarFornecedor($scope.fornecedor);
                    $scope.editar = false;
                    $ionicListDelegate.closeOptionButtons();
                }
                $scope.modalFornecedor.hide();
            };

            $scope.botaoRemoverFornecedor = function (fornecedor) {
                var pos = $scope.analiseDeMercadoID.idsFornecedores.indexOf(fornecedor._id);
                $scope.analiseDeMercadoID.idsFornecedores.splice(pos, 1);
                $scope.analiseDeMercado.removerFornecedor(fornecedor);
                console.log($scope.analiseDeMercadoID.idsFornecedores);
            };

            $scope.botaoEditarFornecedor = function (fornecedor) {
                $scope.fornecedor = fornecedor;
                $scope.editar = true;
                $scope.openFornecedores();
            };


            $scope.openFornecedores = function () {
                $scope.modalFornecedor.show();
                if (!$scope.editar) {
                    $scope.fornecedor = Fornecedor.novoFornecedor();
                }

            };

            $scope.excluirFornecedorPermanentemente = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Excluir?',
                    template: 'Deseja excluir permanentemente este item?',
                    cancelText: 'Não'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        excluirFornecedor($scope.fornecedor);
                        console.log("Excluído!");
                    } else {
                        console.log('Não Excluído!');
                    }
                });
            };


            $scope.back = function () {
                $ionicHistory.goBack();
            };

            $scope.mostrarReordemConcorrente = function () {
                $scope.reordenarConcorrente = !$scope.reordenarConcorrente;
            };

            $scope.moverConcorrente = function (item, fromIndex, toIndex) {
                $scope.analiseDeMercado.concorrentes.splice(fromIndex, 1);
                $scope.analiseDeMercado.concorrentes.splice(toIndex, 0, item);
                $scope.analiseDeMercadoID.idsConcorrentes.splice(fromIndex, 1);
                $scope.analiseDeMercadoID.idsConcorrentes.splice(toIndex, 0, item._id);
            };

            $scope.mostrarReordemFornecedor = function () {
                $scope.reordenarFornecedor = !$scope.reordenarFornecedor;
            };

            $scope.moverFornecedor = function (item, fromIndex, toIndex) {
                $scope.analiseDeMercado.fornecedores.splice(fromIndex, 1);
                $scope.analiseDeMercado.fornecedores.splice(toIndex, 0, item);
                $scope.analiseDeMercadoID.idsFornecedores.splice(fromIndex, 1);
                $scope.analiseDeMercadoID.idsFornecedores.splice(toIndex, 0, item._id);
            };

            $scope.salvar = function () {
                var caminho;
                var objeto;

                salvarCliente();
                $ionicLoading.show({
                    template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                    duration: 1000
                }).then(function () {
                    setTimeout(function () {

                        console.log($scope.analiseDeMercadoID.idsFornecedores);
                        console.log($scope.analiseDeMercadoID.idsConcorrentes);
                        console.log($scope.analiseDeMercadoID.idCliente);

                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/analiseMercado?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto = $scope.analiseDeMercadoID;
                        $scope.bancoDeDados.atualizar(caminho, objeto);

                    }, 1000);
                });

                $scope.hide = function () {
                    $ionicLoading.hide();
                };
            };



            function salvarFornecedor(fornecedor) {
                caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/fornecedores?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                $scope.bancoDeDados.salvar(caminho, fornecedor).then(function (dados) {
                    console.log(dados.data);
                    $scope.fornecedor._id = dados.data._id;
                    $scope.analiseDeMercadoID.idsFornecedores.push(dados.data._id);
                });

            }
            ;

            function atualizarFornecedor(fornecedor) {
                caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/fornecedores?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                $scope.bancoDeDados.atualizar(caminho, fornecedor).then(function (dados) {
                    console.log(dados.data);
                    //$scope.analiseDeMercadoID.idsConcorrentes.push(dados.data._id);
                });
            }

            function excluirFornecedor(fornecedor) {
                caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/fornecedores?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                $scope.bancoDeDados.remover(caminho, fornecedor).then(function (dados) {
                    console.log(dados.data);
                });
                $scope.botaoRemoverFornecedor(fornecedor);
                $scope.modalFornecedor.hide();
            }


            function salvarConcorrente(concorrente) {
                caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/concorrente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                $scope.bancoDeDados.salvar(caminho, concorrente).then(function (dados) {
                    console.log(dados.data);
                    $scope.concorrente._id = dados.data._id;
                    $scope.analiseDeMercadoID.idsConcorrentes.push(dados.data._id);
                });
            }
            ;

            function atualizarConcorrente(concorrente) {
                caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/concorrente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                $scope.bancoDeDados.atualizar(caminho, concorrente).then(function (dados) {
                    console.log(dados.data);
                    //$scope.analiseDeMercadoID.idsConcorrentes.push(dados.data._id);
                });
            }
            ;

            function excluirConcorrente(concorrente) {
                caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/concorrente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                $scope.bancoDeDados.remover(caminho, concorrente).then(function (dados) {
                    console.log(dados.data);
                });
                $scope.botaoRemoverConcorrente(concorrente);
                $scope.modalConcorrente.hide();
            }
            ;



            function salvarCliente() {
                caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/cliente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                objeto = $scope.analiseDeMercado.cliente;
                objeto.idUsuario = $rootScope.usuario._id;
                console.log(objeto);
                if ($scope.analiseDeMercado.cliente._id === undefined) {
                    $scope.bancoDeDados.salvar(caminho, objeto).then(function (dados) {
                        console.log(dados);
                        $scope.analiseDeMercadoID.idCliente = dados.data._id;
                    });
                } else {
                    $scope.bancoDeDados.atualizar(caminho, objeto);
                }

            }
            ;

            $scope.recuperarDadosFornecedores = function () {
                $ionicLoading.show({
                    template: 'Acessando Fornecedores... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                    duration: 1000
                }).then(function () {
                    $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/fornecedores?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function (dados) {
                        $scope.analiseDeMercado.fornecedores = dados.data;
                        $scope.analiseDeMercadoID.idsFornecedores = [];
                        dados.data.forEach(function (dado) {
                            $scope.analiseDeMercadoID.idsFornecedores.push(dado._id);
                        });
                        console.log($scope.analiseDeMercado.fornecedores);

                    });

                });
            };

            $scope.recuperarDadosConcorrentes = function () {
                $ionicLoading.show({
                    template: 'Acessando Concorrentes... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                    duration: 1000
                }).then(function () {
                    $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/concorrente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function (dados) {
                        $scope.analiseDeMercado.concorrentes = dados.data;
                        $scope.analiseDeMercadoID.idsConcorrentes = [];
                        dados.data.forEach(function (dado) {
                            $scope.analiseDeMercadoID.idsConcorrentes.push(dado._id);
                        });
                        console.log(dados);
                    });
                });
            };
        });
