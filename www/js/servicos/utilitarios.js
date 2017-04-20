/* global angular */

angular.module('starter.services.utilitarios', [])

        .factory('BancoDeDados', function ($http, $q, $ionicPopup) {

            var salvar = function (caminho, objeto) {
                deffered = $q.defer();
                $http.post(caminho, objeto)
                        .then(function (dados) {
                            deffered.resolve(dados);
                        }
                        , function (dados) {
                            deffered.reject(dados + "erro!");
                            mostrarMensagemDeErro();
                        });

                return deffered.promise;
            };

            var salvarArray = function (caminho, array) {
                var promessas = [];
                var promessa;

                array.forEach(function (objeto) {
                    promessa = $http.post(caminho, objeto);
                    promessas.push(promessa);
                });

                return $q.all(promessas);
            };

            var recuperar = function (caminho) {
                deffered = $q.defer();
                $http.get(caminho, {cache: true}).then(function (dados) {
                    deffered.resolve(dados);
                }), function (dados) {
                    deffered.reject(dados + "erro!");
                    mostrarMensagemDeErro()
                };
                return deffered.promise;
            };

            var atualizar = function (caminho, objeto) {
                deffered = $q.defer();
                jsonString = JSON.stringify({_id: objeto._id});
                console.log(caminho + "&q=" + jsonString);
                $http.put(caminho + "&q=" + jsonString, objeto).then(function (dados) {
                    deffered.resolve(dados);
                }), function (dados) {
                    deffered.reject(dados + "erro!");
                    mostrarMensagemDeErro();
                };
                return deffered.promise;
            };

            var remover = function (caminho, objeto) {
                objeto.desativado = true;
                deffered = $q.defer();
                jsonString = JSON.stringify({_id: objeto._id});
                console.log(caminho + "&q=" + jsonString);
                $http.put(caminho + "&q=" + jsonString, objeto).then(function (dados) {
                    deffered.resolve(dados);
                }), function (dados) {
                    deffered.reject(dados + "erro!");
                    mostrarMensagemDeErro();
                };
                return deffered.promise;
            };

            var pesquisarUsuario = function (caminho, usuario) {
                deffered = $q.defer();
                jsonString = JSON.stringify({cpf: usuario.cpf, senha: usuario.senha});
                //console.log(usuario);
                //console.log(jsonString);
                //$http.get(caminho, {cache : false, params: {cpf:usuario.cpf, senha:usuario.senha}}).then(function(dados){
                $http({
                    method: 'GET',
                    url: caminho + "&q=" + jsonString,
                    cache: false
                }).then(function (dados) {
                    console.log(dados);
                    deffered.resolve(dados);
                }, function (dados) {
                    deffered.reject(dados + "erro!");
                    mostrarMensagemDeErro();
                });
                return deffered.promise;
            };

            var pesquisarCPFCadastrado = function (caminho, usuario) {
                //console.log(usuario);
                deffered = $q.defer();
                jsonString = JSON.stringify({cpf: usuario.cpf});
                $http({
                    method: 'GET',
                    url: caminho + "&q=" + jsonString,
                    cache: false
                }).then(function (dados) {
                    deffered.resolve(dados);
                    //console.log(dados);

                }, function (dados) {
                    deffered.reject(dados + "erro!");
                    mostrarMensagemDeErro();
                });
                return deffered.promise;
            };

            var recuperarComIdUsuario = function (caminho, usuario) {
                deffered = $q.defer();
                jsonString = JSON.stringify({idUsuario: usuario._id, desativado: false});
                console.log(caminho + "&q=" + jsonString);
                $http.get(caminho + "&q=" + jsonString, {cache: false}).then(function (dados) {
                    deffered.resolve(dados);
                }), function (dados) {
                    deffered.reject(dados + "erro!");
                    mostrarMensagemDeErro();
                };
                return deffered.promise;
            };


            var recuperarComId = function (caminho, objeto) {
                console.log(objeto);
                jsonString = JSON.stringify({_id: objeto._id});
                console.log(caminho + "&q=" + jsonString);
                return $http.get(caminho + "&q=" + jsonString, {cache: false});
            };

            var salvarPromessa = function (caminho, objeto) {
                return $http.post(caminho, objeto);
            };

            var mostrarMensagemDeErro = function () {
                $ionicPopup.alert({
                    title: 'Problemas de conexão',
                    template: 'Não foi possível estabelecer conexão com o Servidor!\
                                           Verifique sua conexão ou tente mais tarde.'
                });
            };

            return{
                salvar: salvar,
                salvarArray: salvarArray,
                recuperar: recuperar,
                atualizar: atualizar,
                remover: remover,
                pesquisarUsuario: pesquisarUsuario,
                pesquisarCPFCadastrado: pesquisarCPFCadastrado,
                recuperarComIdUsuario: recuperarComIdUsuario,
                recuperarComId: recuperarComId,
                salvarPromessa: salvarPromessa,
                mostrarMensagemDeErro: mostrarMensagemDeErro
            };

        })

        .factory('Modal', function ($ionicModal, $rootScope) {
            var init = function (caminho, $scope) {
                $scope = $scope || $rootScope.$new();
                var promise = $ionicModal.fromTemplateUrl(caminho, {
                    scope: $scope
                }).then(function (resposta) {
                    $scope.modal = resposta;
                    return resposta;
                });

                return promise;
            };


            return{
                init: init
            };
        })

        .factory('Menu', function ($ionicActionSheet, $timeout, $state, $rootScope, $window,
                ServicoPlanoDeNegocio, $ionicLoading) {
            var show = function () {

                // Show the action sheet
                var menu = $ionicActionSheet.show({
                    buttons: [
                        {text: 'Sobre o projeto'},
                        {text: 'Configurações'},
                        {text: 'Sair'},
                        {text: 'Salvar e Voltar'}
                    ],
                    titleText: 'Opções',
                    cancelText: 'Cancelar',
                    cancel: function () {

                    },
                    buttonClicked: function (index) {
                        if (index === 0) {
                            $state.go('sobreProjeto', {}, {reload: true,
                                inherit: false,
                                notify: true});
                        } else if (index === 2) {
                            if ($rootScope.usuario !== undefined) {
                                ServicoPlanoDeNegocio.atualizarPlanoDeNegocio($rootScope.planoDeNegocio);
                                $ionicLoading.show({
                                    template: 'Saindo... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                                    duration: 1000
                                });
                            }
                            $rootScope.usuario = undefined;
                            $rootScope.isLogin = false;
                            $state.go('login', {}, {reload: true,
                                inherit: false,
                                notify: true});
                        } else if (index === 3) {
                            ServicoPlanoDeNegocio.atualizarPlanoDeNegocio($rootScope.planoDeNegocio);
                            $ionicLoading.show({
                                template: 'Salvando... <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>',
                                duration: 1000
                            });
                            $state.go('planoDeNegocio', {}, {reload: true,
                                inherit: false,
                                notify: true});
                        }
                        return true;
                    }
                });


                // For example's sake, hide the sheet after two seconds
                $timeout(function () {
                    menu();
                }, 10000000);

            };



            return{
                show: show
            };
        })

        .factory('RecuperarPartes', function ($q, BancoDeDados) {

            recuperarAnaliseDeMercado = function (analiseDeMercado) {
                console.log(analiseDeMercado);
                var arrayPromessasFronecedores = [];
                var arrayPromessasConcorrentes = [];

                recuperarFornecedores = function () {
                    arrayPromessasFronecedores = [];
                    analiseDeMercado.fornecedores = [];
                    //analiseDeMercadoID.idsFornecedores = [];
                    var objeto = {};
                    analiseDeMercado.idsFornecedores.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/fornecedores?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasFronecedores.push(BancoDeDados.recuperarComId(caminho, objeto));
                    });
                    qAllFornecedor();
                };


                recuperarConcorrentes = function () {
                    arrayPromessasConcorrentes = [];
                    analiseDeMercado.concorrentes = [];
                    //$scope.analiseDeMercadoID.idsConcorrentes = [];
                    var objeto = {};
                    analiseDeMercado.idsConcorrentes.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/concorrente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasConcorrentes.push(BancoDeDados.recuperarComId(caminho, objeto));

                    });
                    qAllConcorrente();
                };


                recuperarCliente = function () {
                    var objeto = {};
                    caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/cliente?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                    objeto._id = analiseDeMercado.idCliente;
                    if (analiseDeMercado.idCliente !== undefined) {
                        BancoDeDados.recuperarComId(caminho, objeto).then(function (dados) {
                            console.log(dados);
                            analiseDeMercado.cliente = dados.data[0];
                            //$scope.analiseDeMercadoID.idCliente = dados.data[0]._id;
                        });
                    }
                };

                qAllFornecedor = function () {
                    $q.all(arrayPromessasFronecedores).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            analiseDeMercado.fornecedores.push(dado.data[0]);
                            //$scope.analiseDeMercadoID.idsFornecedores.push(dado.data[0]._id);
                        });
                    });
                };

                qAllConcorrente = function () {
                    $q.all(arrayPromessasConcorrentes).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            analiseDeMercado.concorrentes.push(dado.data[0]);
                            //$scope.analiseDeMercadoID.idsConcorrentes.push(dado.data[0]._id);
                        });
                    });
                };

                recuperarSubitens = function () {
                    if (analiseDeMercado.idCliente !== undefined) {
                        recuperarCliente();
                    }
                    if (analiseDeMercado.idsConcorrentes !== undefined) {
                        recuperarConcorrentes();
                    }
                    if (analiseDeMercado.idsFornecedores !== undefined) {
                        recuperarFornecedores();
                    }
                };
                recuperarSubitens();
                return analiseDeMercado;
            };

            recuperarPlanoDeMarketing = function (planoDeMarketing) {
                var arrayPromessasProdutos = [];

                recuperarPordutos = function () {
                    arrayPromessasProdutos = [];
                    planoDeMarketing.produtos = [];
                    var objeto = {};
                    planoDeMarketing.idsProdutos.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/produto?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasProdutos.push(BancoDeDados.recuperarComId(caminho, objeto));
                    });
                    qAllProduto();
                };

                qAllProduto = function () {
                    $q.all(arrayPromessasProdutos).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            planoDeMarketing.produtos.push(dado.data[0]);
                        });
                    });
                };

                recuperarLocalizacao = function () {

                    var objeto = {};
                    caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/localizacao?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                    objeto._id = planoDeMarketing.idLocalizacao;
                    BancoDeDados.recuperarComId(caminho, objeto).then(function (dados) {
                        console.log(dados);
                        planoDeMarketing.localizacaoDoNegocio = dados.data[0];
                    });

                };

                recuperarSubitens = function () {
                    if (planoDeMarketing.idsProdutos !== undefined) {
                        recuperarPordutos();
                    }
                    if (planoDeMarketing.idLocalizacao !== undefined) {
                        recuperarLocalizacao();
                    }
                };
                recuperarSubitens();
                return planoDeMarketing;
            };

            recuperarPlanoFinanceiro = function (planoFinanceiro) {
                var arrayPromessasEquipamentos = [];
                var arrayPromessasMaquinas = [];
                var arrayPromessasMoveis = [];
                var arrayPromessasUtensilios = [];
                var arrayPromessasVeiculos = [];
                var arrayPromessasVendas = [];
                var arrayPromessasCompras = [];

                planoFinanceiro.estoqueInicial = {
                    equipamentos: [],
                    maquinas: [],
                    moveis: [],
                    utensilios: [],
                    veiculos: [],
                    vendas: [],
                    compras: []
                };

                recuperarEquipamentos = function () {
                    arrayPromessasEquipamentos = [];
                    planoFinanceiro.equipamentos = [];
                    var objeto = {};
                    planoFinanceiro.idsEquipamentos.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/equipamento?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasEquipamentos.push(BancoDeDados.recuperarComId(caminho, objeto));
                    });
                    qAllEquipamento();
                };

                qAllEquipamento = function () {
                    $q.all(arrayPromessasEquipamentos).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            planoFinanceiro.estoqueInicial.equipamentos.push(dado.data[0]);
                        });
                    });
                };

                recuperarMaquinas = function () {
                    arrayPromessasMaquinas = [];
                    planoFinanceiro.maquinas = [];
                    var objeto = {};
                    planoFinanceiro.idsMaquinas.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/maquina?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasMaquinas.push(BancoDeDados.recuperarComId(caminho, objeto));
                    });
                    qAllMaquina();
                };

                qAllMaquina = function () {
                    $q.all(arrayPromessasMaquinas).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            planoFinanceiro.estoqueInicial.maquinas.push(dado.data[0]);
                        });
                    });
                };

                recuperarMoveis = function () {
                    arrayPromessasMoveis = [];
                    planoFinanceiro.moveis = [];
                    var objeto = {};
                    planoFinanceiro.idsMoveis.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/movel?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasMoveis.push(BancoDeDados.recuperarComId(caminho, objeto));
                    });
                    qAllMovel();
                };

                qAllMovel = function () {
                    $q.all(arrayPromessasMoveis).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            planoFinanceiro.estoqueInicial.moveis.push(dado.data[0]);
                        });
                    });
                };

                recuperarUtensilios = function () {
                    arrayPromessasUtensilios = [];
                    planoFinanceiro.utensilios = [];
                    var objeto = {};
                    planoFinanceiro.idsUtensilios.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/utensilio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasUtensilios.push(BancoDeDados.recuperarComId(caminho, objeto));
                    });
                    qAllUtensilio();
                };

                qAllUtensilio = function () {
                    $q.all(arrayPromessasUtensilios).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            planoFinanceiro.estoqueInicial.utensilios.push(dado.data[0]);
                        });
                    });
                };

                recuperarVeiculos = function () {
                    arrayPromessasVeiculos = [];
                    planoFinanceiro.veiculos = [];
                    var objeto = {};
                    planoFinanceiro.idsVeiculos.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/veiculo?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasVeiculos.push(BancoDeDados.recuperarComId(caminho, objeto));
                    });
                    qAllVeiculo();
                };

                qAllVeiculo = function () {
                    $q.all(arrayPromessasVeiculos).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            planoFinanceiro.estoqueInicial.veiculos.push(dado.data[0]);
                        });
                    });
                };

                recuperarVendas = function () {
                    arrayPromessasVendas = [];
                    planoFinanceiro.vendas = [];
                    var objeto = {};
                    planoFinanceiro.idsVendas.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/venda?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasVendas.push(BancoDeDados.recuperarComId(caminho, objeto));
                    });
                    qAllVenda();
                };

                qAllVenda = function () {
                    $q.all(arrayPromessasVendas).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            planoFinanceiro.vendas.push(dado.data[0]);
                        });
                    });
                };

                recuperarCompras = function () {
                    arrayPromessasCompras = [];
                    planoFinanceiro.compras = [];
                    var objeto = {};
                    planoFinanceiro.idsCompras.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/compra?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasCompras.push(BancoDeDados.recuperarComId(caminho, objeto));
                    });
                    qAllCompra();
                };

                qAllCompra = function () {
                    $q.all(arrayPromessasCompras).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            planoFinanceiro.compras.push(dado.data[0]);
                        });
                    });
                };


                recuperarSubitens = function () {
                    if (planoFinanceiro.idsEquipamentos !== undefined) {
                        recuperarEquipamentos();
                    }
                    if (planoFinanceiro.idsMaquinas !== undefined) {
                        recuperarMaquinas();
                    }
                    if (planoFinanceiro.idsMoveis !== undefined) {
                        recuperarMoveis();
                    }
                    if (planoFinanceiro.idsUtensilios !== undefined) {
                        recuperarUtensilios();
                    }
                    if (planoFinanceiro.idsVeiculos !== undefined) {
                        recuperarVeiculos();
                    }
                    if (planoFinanceiro.idsVendas !== undefined) {
                        recuperarVendas();
                    }
                    if (planoFinanceiro.idsCompras !== undefined) {
                        recuperarCompras();
                    }

                };
                recuperarSubitens();
                return planoFinanceiro;
            };

            recuperarPlanoOperacional = function (planoOperacional) {
                var arrayPromessasCargos = [];

                recuperarCargos = function () {
                    arrayPromessasCargos = [];
                    planoOperacional.cargos = [];
                    var objeto = {};
                    planoOperacional.idsCargos.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/cargos?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasCargos.push(BancoDeDados.recuperarComId(caminho, objeto));
                    });
                    qAllCargo();
                };


                recuperarLayout = function () {

                    var objeto = {};
                    caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/imagem?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                    objeto._id = planoOperacional.idImagem;
                    if (planoOperacional.idImagem !== undefined) {
                        BancoDeDados.recuperarComId(caminho, objeto).then(function (dados) {
                            console.log(dados);
                            planoOperacional.layout = dados.data[0].imagem;
                        });
                    }
                };

                qAllCargo = function () {
                    $q.all(arrayPromessasCargos).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            console.log(dado.data[0]);
                            planoOperacional.cargos.push(dado.data[0]);
                        });
                    });
                };

                recuperarSubitens = function () {
                    if (planoOperacional.idImagem !== undefined) {
                        recuperarLayout();
                    }
                    if (planoOperacional.idsCargos !== undefined) {
                        recuperarCargos();
                    }
                };
                recuperarSubitens();
                return planoOperacional;
            };

            recuperarSumarioExecutivo = function (sumarioExecutivo) {
                var arrayPromessasSocios = [];

                recuperarSocios = function () {
                    arrayPromessasSocios = [];
                    sumarioExecutivo.socios = [];
                    var objeto = {};
                    sumarioExecutivo.idsSocios.forEach(function (dadoId) {
                        caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/socio?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                        objeto._id = dadoId;
                        arrayPromessasSocios.push(BancoDeDados.recuperarComId(caminho, objeto));
                    });
                    qAllSocio();
                };


                qAllSocio = function () {
                    $q.all(arrayPromessasSocios).then(function (dados) {
                        console.log(dados);
                        dados.forEach(function (dado) {
                            console.log(dado.data[0]);
                            sumarioExecutivo.socios.push(dado.data[0]);
                        });
                    });
                };

                recuperarSubitens = function () {
                    if (sumarioExecutivo.idsSocios !== undefined) {
                        recuperarSocios();
                    }
                };

                recuperarSubitens();
                return sumarioExecutivo;
            };




            return{
                recuperarAnaliseDeMercado: recuperarAnaliseDeMercado,
                recuperarPlanoDeMarketing: recuperarPlanoDeMarketing,
                recuperarPlanoFinanceiro: recuperarPlanoFinanceiro,
                recuperarPlanoOperacional: recuperarPlanoOperacional,
                recuperarSumarioExecutivo: recuperarSumarioExecutivo
            };

        });
