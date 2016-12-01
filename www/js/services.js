angular.module('starter.services', [])

.service('ServicoLogin', function($q) {
    return {
        fazerLogin: function(cpf, senha) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (cpf == 1 && senha == 'aluno') {
                deferred.resolve('CPF: ' + cpf);
            } else {
                deferred.reject('Erro de Autenticação.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});
