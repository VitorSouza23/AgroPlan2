/* global angular */

angular.module('starter.controllers.login', ['starter.services', 'starter.services.utilitarios', 'starter.services.login'])

        .controller('LoginCtrl', function ($scope, ServicoLogin, $ionicPopup, $state, $rootScope) {
            $scope.usuario = {};
            $scope.init = function () {
                $scope.usuario = {};
                $rootScope.usuario = null;
                $rootScope.isLogin = false;
            };
            $scope.enter = function (evt) {
                if (evt.which === 13) {
                    $scope.login();
                }
            };
            $scope.mensagemDeErroLogin = {
                cpfVazio: false,
                senhaVazia: false,
                camposIncorretos: false
            };
            $scope.login = function () {
                $scope.mensagemDeErroLogin.cpfVazio = false;
                $scope.mensagemDeErroLogin.senhaVazia = false;
                $scope.camposIncorretos = false;
                if (!angular.equals($scope.usuario, {})) {
                    ServicoLogin.fazerLogin($scope.usuario).then(function (dados) {
                        //console.log(dados);
                        usuario = dados.data[0];
                        //console.log(usuario);
                        $rootScope.usuario = null;
                        if (usuario !== null) {
                            $rootScope.usuario = usuario;
                            $rootScope.isLogin = true;
                        }

                        if ($rootScope.usuario !== null) {
                            $state.go('planoDeNegocio');
                        } else {
                            $ionicPopup.alert({
                                title: 'Falha no Login!',
                                template: 'O CPF ou Senha incorretos!'
                            });
                            $scope.mensagemDeErroLogin.camposIncorretos = true;
                        }
                    }, function (erro) {
                        $ionicPopup.alert({
                            title: 'Falha no Login!',
                            template: 'Não foi possível estabelecer conexão com o Servidor!\
                                           Verifique sua conexão ou tente mais tarde.'
                        });
                    });
                } else {
                    if ($scope.usuario.cpf === undefined) {
                        $scope.mensagemDeErroLogin.cpfVazio = true;
                    }
                    if ($scope.usuario.senha === undefined) {
                        $scope.mensagemDeErroLogin.senhaVazia = true;
                    }
                    $ionicPopup.alert({
                        title: 'Falha no Login! (Campos Vazios)',
                        template: 'Por favor, corrija os campos vazios!'
                    });
                }

            };
        })


        .controller('CadastroCtrl', function ($scope, Modal, ServicoLogin, $ionicPopup) {
            $scope.novoUsuario = {};
            $scope.senhaAConfirmar = {};
            Modal.init('js/components/tela-de-login/subitens/cadastro.html', $scope).then(function (modal) {
                $scope.modalCadastro = modal;
                console.log($scope.modalCadastro);
            });
            $scope.abrirTela = function () {
                $scope.modalCadastro.show();
            };
            $scope.cpfExistente = false;
            $scope.cadastrarUsuario = function () {

                //console.log($scope.novoUsuario.senha);
                //console.log($scope.senhaAConfirmar.senha);

                console.log($scope.cpfExistente);
                if (!angular.equals($scope.novoUsuario.senha, $scope.senhaAConfirmar.senha)) {
                    $ionicPopup.alert({
                        title: 'As senhas não são iguais!',
                        template: 'Por favor, corrija sua senha.'
                    });
                } else if ($scope.cpfExistente) {
                    $ionicPopup.alert({
                        title: 'Este CPF já está cadastrado no sisitema!',
                        template: 'Por favor, coloque outro CPF.'
                    });
                } else if (validarCPFReceitaFederal($scope.novoUsuario.cpf) === false) {
                    console.log($scope.novoUsuario.cpf);
                    $ionicPopup.alert({
                        title: 'Este CPF não é valido pela Recieta Federal!',
                        template: 'Por favor, corrija o campo "CPF".'
                    });
                } else {
                    $scope.novoUsuario.planosDeNegocio = [];
                    ServicoLogin.cadastrarUsuario($scope.novoUsuario).then(function (dados) {
                        $scope.modalCadastro.hide();
                        $scope.novoUsuario = {};
                        $scope.senhaAConfirmar = {};
                        console.log(dados.data);
                        $ionicPopup.alert({
                            title: 'Novo Usuário Cadastrado!',
                            template: 'Seja bem vindo ' + dados.data.nome + "! \n" + 'CPF: ' + dados.data.cpf
                        });
                    }, function (erro) {
                        $ionicPopup.alert({
                            title: 'Falha no Cadastro!',
                            template: 'Não foi possível estabelecer conexão com o Servidor!\
                                           Verifique sua conexão ou tente mais tarde.'
                        });
                    });
                }

            };
            $scope.verificarCPF = function () {
                ServicoLogin.verificarCPFJaCadastrado($scope.novoUsuario).then(function (dados) {
                    //console.log(dados.data);
                    if (dados.data.length > 0) {
                        $scope.cpfExistente = true;
                    } else {
                        $scope.cpfExistente = false;
                    }
                });
                //console.log($scope.cpfExistente);
            };
            validarCPFReceitaFederal = function (cpfAux) {
                var cpf = cpfAux.replace(/[^\d]+/g, '');
                var Soma;
                var Resto;
                Soma = 0;
                
                if (cpf.length !== 11 ||
                        cpf === "00000000000" ||
                        cpf === "11111111111" ||
                        cpf === "22222222222" ||
                        cpf === "33333333333" ||
                        cpf === "44444444444" ||
                        cpf === "55555555555" ||
                        cpf === "66666666666" ||
                        cpf === "77777777777" ||
                        cpf === "88888888888" ||
                        cpf === "99999999999") {
                    return false;
                }

                for (i = 1; i <= 9; i++)
                    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
                Resto = (Soma * 10) % 11;
                if ((Resto == 10) || (Resto == 11))
                    Resto = 0;
                if (Resto != parseInt(cpf.substring(9, 10)))
                    return false;
                Soma = 0;
                for (i = 1; i <= 10; i++)
                    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
                Resto = (Soma * 10) % 11;
                if ((Resto == 10) || (Resto == 11))
                    Resto = 0;
                if (Resto != parseInt(cpf.substring(10, 11)))
                    return false;
                return true;
            };

        });
