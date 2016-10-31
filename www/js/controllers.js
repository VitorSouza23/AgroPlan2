angular.module('starter.controllers', ['starter.services','starter.controllers.sumarioExecutivo','starter.controllers.analiseDeMercado', 'starter.controllers.planoFinanceiro', 'starter.controllers.planoDeMarketing', 'starter.controllers.planoOperacional', 'starter.controllers.construcaoDeCenario', 'starter.controllers.avaliacaoEstrategica','starter.controllers.roteiroParaColeta', 'starter.controllers.avaliacaoDoPlano'])


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
<<<<<<< HEAD


=======
>>>>>>> 404bee94a93b31a8408be9d9ae85e13ef839fe6a
});
