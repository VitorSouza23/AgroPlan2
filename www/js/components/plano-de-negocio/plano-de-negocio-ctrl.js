/* global angular */

angular.module('starter.controllers.planoDeNegocio', ['starter.services',
    'starter.services.plano-de-negocios', 'starter.services.gerador-relatorio'])

        .controller('PlanoDeNegocioCtrl', function ($scope, $state, $rootScope, ServicoPlanoDeNegocio, Modal,
                BancoDeDados, $window, $ionicPopup, $ionicLoading, GeradorDeRelatorio, $ionicPopover) {
            $scope.usuario = $rootScope.usuario;
            $scope.planoDeNegocio;
            $scope.planosDeNegocio = [];
            $scope.editar = false;

            //alterar conta
            $scope.nome = {};
            $scope.senhaAConfirmar = {};
            $scope.novaSenha = {};
            $scope.senha = {};

            ionic.on('$locationChangeStart', function () {
                $scope.init();
            });
            $scope.init = function () {
                //$rootScope.verificarSeUsuarioEstaLogado();
                $scope.recuperTodosOsPlanosPorIdUsuario();
                setTimeout(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            };
            Modal.init('js/components/plano-de-negocio/subitens/criar-novo-plano.html', $scope).then(function (modal) {
                $scope.modalNovoPlanoDeNegocio = modal;
            });
            Modal.init('js/components/plano-de-negocio/subitens/menu-de-opcoes.html', $scope).then(function (modal) {
                $scope.modalMenuPlanoDeNegocio = modal;
            });
            Modal.init('js/components/plano-de-negocio/subitens/atualizar-conta.html', $scope).then(function (modal) {
                $scope.modalAtaulizarConta = modal;
            });
            $scope.novoPlanoDeNegocio = function () {
                $scope.planoDeNegocio = ServicoPlanoDeNegocio.novoPlanoDeNegocio();
                $scope.modalNovoPlanoDeNegocio.show();
            };
            $scope.criarNovoPlano = function () {
                if ($scope.editar) {
                    var pos = $scope.planosDeNegocio.indexOf($scope.planoDeNegocio);
                    $scope.planosDeNegocio[pos] = $scope.planoDeNegocio;
                    ServicoPlanoDeNegocio.atualizarPlanoDeNegocio($scope.planoDeNegocio);
                    $scope.modalNovoPlanoDeNegocio.hide();
                    $scope.editar = false;
                } else {
                    console.log($scope.planoDeNegocio);
                    $scope.planoDeNegocio.desativado = false;
                    esperaParaCriarERecuperarNovoPlano();
                    $scope.modalNovoPlanoDeNegocio.hide();
                }

            };
            $scope.editarPlano = function (planoDeNegocio) {
                console.log(planoDeNegocio);
                $rootScope.planoDeNegocio = planoDeNegocio;
                ServicoPlanoDeNegocio.remontarPlanoDeNegocio(planoDeNegocio);
                console.log($rootScope.planoDeNegocioMontado);
                $ionicLoading.show({
                    template: 'Recuperando Dados... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                    duration: 5000
                }).then(function () {
                    setTimeout(function () {
                        console.log($rootScope.planoDeNegocio);
                        $scope.fecharMenuDeOpcoesDoPlano();
                        $state.go('tab.sumarioExecutivo');
                    }, 5000);
                });
            };
            $scope.abrirMenuDeOpcoesDoPlano = function (planoDeNegocio) {
                $scope.planoDeNegocio = planoDeNegocio;
                $scope.modalMenuPlanoDeNegocio.show();
            };
            $scope.fecharMenuDeOpcoesDoPlano = function () {
                $scope.modalMenuPlanoDeNegocio.hide();
            };
            $scope.excluirPlanoDeNegocio = function (planoDeNegocio) {
                showConfirm(planoDeNegocio);
            };
            showConfirm = function (planoDeNegocio) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Excluir Plano de Negócio',
                    template: 'Você tem certeza de que deseja excluir permanentemente este Plano de Negócio?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        ServicoPlanoDeNegocio.excluirPlanoDeNegocio(planoDeNegocio);
                        $scope.planosDeNegocio.splice($scope.planosDeNegocio.indexOf(planoDeNegocio), 1);
                        $scope.modalMenuPlanoDeNegocio.hide();
                    }
                });
            };
            $scope.alterarNomeDoPlanoDeNegocio = function (planoDeNegocio) {
                $scope.planoDeNegocio = planoDeNegocio;
                $scope.modalNovoPlanoDeNegocio.show();
                $scope.modalMenuPlanoDeNegocio.hide();
                $scope.editar = true;
            };
            $scope.recuperTodosOsPlanosPorIdUsuario = function () {
                caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/planoDeNegocio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                BancoDeDados.recuperarComIdUsuario(caminho, $rootScope.usuario).then(function (dados) {
                    console.log(dados.data);
                    $scope.planosDeNegocio = dados.data;
                });
            };
            esperaParaCriarERecuperarNovoPlano = function () {
                $ionicLoading.show({
                    template: 'Criando Novo Plano... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                    duration: 3000
                }).then(function () {
                    setTimeout(function () {
                        var novoPlano = new PlanoDeNegocio();
                        novoPlano.idUsuario = $rootScope.usuario._id;
                        novoPlano.nome = $scope.planoDeNegocio.nome;
                        ServicoPlanoDeNegocio.salvarPlanoDeNegocio(novoPlano);
                    }, 2000);
                    setTimeout(function () {
                        $scope.recuperTodosOsPlanosPorIdUsuario();
                    }, 1000);
                });
                $scope.hide = function () {
                    $ionicLoading.hide();
                };
            };
            $scope.sair = function () {
                $rootScope.usuario = null;
                $rootScope.isLogin = false;
                $window.location.reload(true);
                $state.go('login', {}, {reload: true,
                    inherit: false,
                    notify: true});
            };
            $scope.gerarRelatorio = function (planoDeNegocio) {
                //GeradorDeRelatorio.gerarRelatorio();
                GeradorDeRelatorio.gerarRelatorioPDF(planoDeNegocio);
            };
            //opções da conta

            var templatePopover = '<ion-popover-view ><ion-header-bar><h1 class="title">Opções</h1></ion-header-bar><ion-content><ion-list><ion-item ng-click="abrirAlterarConta()">Alterar Conta</ion-item></ion-list> </ion-content></ion-popover-view>';
            $scope.popover = $ionicPopover.fromTemplate(templatePopover, {
                scope: $scope
            });
            $scope.openPopover = function (e) {
                $scope.popover.show(e);
            };
            $scope.closePopover = function () {
                $scope.popover.hide();
            };
            //Cleanup the popover when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.popover.remove();
            });
            // Execute action on hidden popover
            $scope.$on('popover.hidden', function () {
                // Execute action
            });
            // Execute action on remove popover
            $scope.$on('popover.removed', function () {
                // Execute action
            });
            $scope.abrirAlterarConta = function () {
                $scope.closePopover();
                $scope.senha.data = "";
                $scope.nome.data = $scope.usuario.nome;
                $scope.senhaAConfirmar.data = "";
                $scope.novaSenha.data = "";
                $scope.modalAtaulizarConta.show();
            };
            $scope.alterarConta = function () {
                if ($scope.novaSenha.data !== $scope.senhaAConfirmar.data) {
                    $ionicPopup.alert({
                        title: 'Senhas diferentes!',
                        template: 'A senha do campo de Confirmação não é a mesma do compo Nova Senha!'
                    });
                } else {
                    $scope.confirmarMudanca();
                }
            };

            $scope.confirmarMudanca = function () {
                $ionicPopup.show({
                    template: '<label class="item item-input"><input type="password" ng-model="senha.data"></label>',
                    title: 'Confirmar Alterações',
                    subTitle: 'Por favor, insira sua senha atual:',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancelar'},
                        {
                            text: '<b>Confirmar</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                console.log($scope.senha);
                                console.log($scope.usuario.senha);
                                if ($scope.senha.data === $scope.usuario.senha) {
                                    $scope.usuario.nome = $scope.nome.data;
                                    $scope.usuario.senha = $scope.novaSenha.data;
                                    var caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/usuario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                                    var objeto = $scope.usuario;
                                    BancoDeDados.atualizar(caminho, objeto).then(function (dados) {
                                        $rootScope.usuario = $scope.usuario;
                                        $scope.senha.data = "";
                                        $scope.modalAtaulizarConta.hide();
                                    }, function (erro) {
                                        $ionicPopup.alert({
                                            title: 'Erro de conexão!',
                                            template: 'Não foi possível se conectar ao servidor! Por favor, tente mais tarde.'
                                        });
                                    });

                                } else {
                                    $ionicPopup.alert({
                                        title: 'Senha Incorreta!',
                                        template: 'Por favor, corrija a senha.'
                                    });
                                }
                            }
                        }
                    ]
                });
            };

        });
