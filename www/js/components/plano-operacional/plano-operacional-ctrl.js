/* global angular, err, Camera */

angular.module('starter.controllers.planoOperacional', ['starter.services.planoOperacional',
    'ionic', 'starter.services.utilitarios'])

        .controller('PlanoOperacionalCtrl', function ($scope, PlanoOperacional, Cargo, $ionicListDelegate,
                $ionicHistory, $ionicPopup, $ionicPopup, BancoDeDados, $ionicLoading, PlanoOperacionalID,
                Modal, $rootScope, $cordovaCamera, $q, RecuperarPartes) {
            $scope.planoOperacional = PlanoOperacional.getPlanoOperacional();
            
            ionic.on('$locationChangeStart', function () {
                $scope.init();
            });
            ionic.on('$locationChangeSuccess', function () {
                $scope.init();
            });

            $scope.init = function () {

                console.log($rootScope.planoDeNegocioMontado.planoOperacional);

                $scope.planoOperacional = PlanoOperacional.getPlanoOperacional();
                var planoOperacionalAux = RecuperarPartes.recuperarPlanoOperacional($rootScope.planoDeNegocioMontado.planoOperacional);
                $ionicLoading.show({
                    template: 'Carregando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                    duration: 1500
                }).then(function () {
                    setTimeout(function () {
                        $scope.planoOperacional._id = planoOperacionalAux._id;
                        $scope.planoOperacionalID._id = planoOperacionalAux._id;
                        $scope.planoOperacionalID.idImagem = planoOperacionalAux.idImagem;

                        $scope.planoOperacional.capacidadeProdutiva = planoOperacionalAux.capacidadeProdutiva;
                        $scope.planoOperacional.capacidadeComercial = planoOperacionalAux.capacidadeComercial;
                        $scope.planoOperacional.capacidadeProdutivaInicial = planoOperacionalAux.capacidadeProdutivaInicial;
                        $scope.planoOperacional.capacidadeComercialInicial = planoOperacionalAux.capacidadeComercialInicial;
                        $scope.planoOperacional.processosOperacionais = planoOperacionalAux.processosOperacionais;
                        
                        $scope.planoOperacional.layout = planoOperacionalAux.layout;
                        $scope.planoOperacional.cargos = planoOperacionalAux.cargos;
                        $scope.planoOperacionalID.idsCargos = planoOperacionalAux.idsCargos;
                        $scope.planoOperacionalID.idImagem = planoOperacionalAux.idImagem;

                    }, 1000);

                });

            };

            $scope.atualizarPagina = function () {
                $scope.planoOperacional._id = undefined;
                $scope.init();
                $scope.$broadcast('scroll.refreshComplete');
            };


            $scope.dadosImagem;
            $scope.urlImagem;
            $scope.imagemJSON;
            $scope.editar = PlanoOperacional.editar;
            $scope.planoOperacionalID = PlanoOperacionalID;
            $scope.bancoDeDados = BancoDeDados;
            Modal.init('js/components/plano-operacional/subitens/cargos.html', $scope).then(function (modal) {
                $scope.modalCargo = modal;
            });

            $scope.showConfirm = function () {
                $ionicPopup.confirm({
                    title: 'Plano Operacional',
                    template: 'É onde será informado o funcionamento de seu negócio.',
                    cancelText: 'Sair'
                });
            };

            var tipoDestinoCaminhoFoto;
            $scope.addCargo = function () {
                if (!$scope.editar) {
                    $scope.cargo.idUsuario = $rootScope.usuario._id;
                    salvarCargo($scope.cargo);
                    $scope.planoOperacional.addCargo($scope.cargo);
                } else {
                    $scope.planoOperacional.editarCargo($scope.cargo);
                    atualizarCargo($scope.cargo);
                    $scope.editar = false;
                    $ionicListDelegate.closeOptionButtons();
                }
                $scope.modalCargo.hide();
            };

            $scope.botaoRemoverCargo = function (cargo) {
                var pos = $scope.planoOperacionalID.idsCargos.indexOf(cargo._id);
                $scope.planoOperacionalID.idsCargos.splice(pos, 1);
                $scope.planoOperacional.removerCargo(cargo);
            };

            $scope.botaoEditarCargo = function (cargo) {
                $scope.cargo = cargo;
                $scope.editar = true;
                $scope.openCargos();
            };

            $scope.excluirCargoPermanentemente = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Excluir?',
                    template: 'Deseja excluir permanentemente este item?',
                    cancelText: 'Não'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        excluirCargo($scope.cargo);
                        console.log("Excluído!");
                    } else {
                        console.log('Não Excluído!');
                    }
                });
            };

            $scope.back = function () {
                $ionicHistory.goBack();
            };

            $scope.openCargos = function () {
                $scope.modalCargo.show();
                if (!$scope.editar) {
                    $scope.cargo = Cargo.novoCargo();
                }
            };

            function sucessoAoPegarFoto(imageData) {
                if (tipoDestinoCaminhoFoto === 1 || tipoDestinoCaminhoFoto === 2) {
                    $scope.planoOperacional.layout = imageData;
                } else {
                    $scope.planoOperacional.layout = "data:image/jpeg;base64," + imageData;
                }

            }

            function erroAoPegarFoto(erro) {
                console.log(err);
                $ionicPopup.alert({
                    title: 'Erro ao acessar recursos de Foto!',
                    template: 'Não foi possível acessar a câmera ou a biblioteca de imagens.'
                });
            }

            $scope.tirarFoto = function () {
                var imagemConfig = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    quality: 100,
                    targetWidth: 300,
                    targetHeight: 300,
                    saveToPhotoAlbum: true,
                    correctOrientation: true
                };

                $cordovaCamera.getPicture(imagemConfig).then(function (imageData) {
                    $scope.dadosImagem = imageData;
                    $scope.planoOperacional.layout = "data:image/jpeg;base64," + imageData;
                    $scope.imagemJSON = JSON.stringify({
                        imagem: $scope.planoOperacional.layout
                    });

                    var caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/imagem?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                    var objeto = $scope.imagemJSON;
                    if ($scope.planoOperacionalID.idImagem === undefined) {
                        $scope.bancoDeDados.salvar(caminho, objeto).then(function (response) {
                            $scope.planoOperacionalID.idImagem = response.data._id;
                            console.log(response);

                        });
                    } else {
                        $scope.bancoDeDados.atualizar(caminho, objeto);
                    }


                }, function (err) {
                    alert('Erro ao obter imagem!');
                });
            };


            $scope.pegarFoto = function () {
                var imagemGaleria = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    encodingType: Camera.EncodingType.JPEG,
                    quality: 100,
                    targetWidth: 300,
                    targetHeight: 300,
                    saveToPhotoAlbum: true,
                    correctOrientation: true
                };

                $cordovaCamera.getPicture(imagemGaleria).then(function (imageData) {
                    $scope.dadosImagem = imageData;
                    $scope.planoOperacional.layout = "data:image/jpeg;base64," + imageData;
                    $scope.imagemJSON = JSON.stringify({
                        imagem: $scope.planoOperacional.layout
                    });

                    var caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/imagem?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                    var objeto = $scope.imagemJSON;
                    if ($scope.planoOperacionalID.idImagem === undefined) {
                        $scope.bancoDeDados.salvar(caminho, objeto).then(function (response) {
                            $scope.planoOperacionalID.idImagem = response.data._id;
                            console.log(response);

                        });
                    } else {
                        $scope.bancoDeDados.atualizar(caminho, objeto);
                    }
                }, function (err) {
                    alert('Erro ao obter imagem!');
                });
            };


            $scope.mostrarReordem = function () {
                $scope.reordenar = !$scope.reordenar;
            };

            $scope.moverCargo = function (item, fromIndex, toIndex) {
                $scope.planoOperacional.cargos.splice(fromIndex, 1);
                $scope.planoOperacional.cargos.splice(toIndex, 0, item);
            };

            $scope.salvar = function () {
                var caminho;
                var objeto;

                $scope.planoOperacionalID.capacidadeComercial = $scope.planoOperacional.capacidadeComercial;
                $scope.planoOperacionalID.capacidadeProdutiva = $scope.planoOperacional.capacidadeProdutiva;
                $scope.planoOperacionalID.capacidadeComercialInicial = $scope.planoOperacional.capacidadeComercialInicial;
                $scope.planoOperacionalID.capacidadeProdutivaInicial = $scope.planoOperacional.capacidadeProdutivaInicial;
                $scope.planoOperacionalID.processosOperacionais = $scope.planoOperacional.processosOperacionais;

                $ionicLoading.show({
                    template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                    duration: 1000
                }).then(function () {
                    setTimeout(function () {
                        console.log($scope.planoOperacionalID.idsCargos);
                        console.log($scope.planoOperacionalID.idImagem);
                        console.log($scope.planoOperacionalID.capacidadeProdutiva);
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoOperacional?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto = $scope.planoOperacionalID;
                        $scope.bancoDeDados.atualizar(caminho, objeto);
                    }, 1000);
                });

                $scope.hide = function () {
                    $ionicLoading.hide().then(function () {
                        console.log("The loading indicator is now hidden");
                    });

                };
            };


            function salvarCargo(cargo) {
                caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/cargos?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                $scope.bancoDeDados.salvar(caminho, cargo).then(function (dados) {
                    console.log(dados.data);
                    $scope.cargo._id = dados.data._id;
                    $scope.planoOperacionalID.idsCargos.push(dados.data._id);
                });

            }
            ;

            function atualizarCargo(cargo) {
                caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/cargos?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                $scope.bancoDeDados.atualizar(caminho, cargo).then(function (dados) {
                    console.log(dados.data);
                });
            }

            function excluirCargo(cargo) {
                caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/cargos?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                $scope.bancoDeDados.remover(caminho, cargo).then(function (dados) {
                    console.log(dados.data);
                });
                $scope.botaoRemoverCargo(cargo);
                $scope.modalCargo.hide();
            }


            $scope.recuperarDadosCargos = function () {
                $ionicLoading.show({
                    template: 'Acessando Cargos... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                    duration: 1000
                }).then(function () {
                    $scope.bancoDeDados.recuperarComIdUsuario('https://api.mlab.com/api/1/databases/agroplan/collections/cargos?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', $rootScope.usuario).then(function (dados) {
                        $scope.planoOperacional.cargos = dados.data;
                        $scope.planoOperacionalID.idsCargos = [];
                        dados.data.forEach(function (dado) {
                            $scope.planoOperacionalID.idsCargos.push(dado._id);
                        });
                        console.log($scope.planoOperacional.cargos);
                    });
                });
            };
 

            $scope.removerImagem = function () {
                $scope.planoOperacionalID.idImagem = undefined;
                $scope.planoOperacional.layout = null;
            };

            $scope.opcoesDeSlideBox = {
                loop: false,
                effect: 'fade',
                speed: 500
            };
        });
