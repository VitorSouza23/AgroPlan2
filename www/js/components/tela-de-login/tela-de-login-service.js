/* global angular */

angular.module('starter.services.login', ['starter.services.utilitarios'])

        .service('ServicoLogin', function ($q, BancoDeDados) {
            return {
                fazerLogin: function (usuario) {
                    deffered = $q.defer();
                    var caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/usuario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                    BancoDeDados.pesquisarUsuario(caminho, usuario).then(function (dados) {
                        dados.data;
                        console.log(dados);
                        usuarioAutenticado = dados.data;
                        if (usuarioAutenticado.cpf === usuario.cpf && usuarioAutenticado.senha === usuario.senha) {
                            console.log(usuario);
                            deffered.resolve(usuarioAutenticado);
                        }
                    }, function (erro) {
                        console.log("Erro: " + erro);
                    });
                    return deffered.promise;
                },
                cadastrarUsuario: function (novoUsuario) {
                    deffered = $q.defer();
                    var caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/usuario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                    BancoDeDados.salvar(caminho, novoUsuario).then(function (dados) {
                        //console.log(dados);
                        deffered.resolve(dados);
                    }, function (erro) {
                        console.log(erro);
                    });
                    return deffered.promise;
                },
                verificarCPFJaCadastrado: function (usuario) {
                    deffered = $q.defer();
                    var caminho = 'https://api.mlab.com/api/1/databases/agroplan/collections/usuario?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff';
                    BancoDeDados.pesquisarCPFCadastrado(caminho, usuario).then(function (dados) {
                        deffered.resolve(dados);
                    }, function (erro) {
                        deffered.reject(erro);
                    });

                    return deffered.promise;
                }
            };
        });
