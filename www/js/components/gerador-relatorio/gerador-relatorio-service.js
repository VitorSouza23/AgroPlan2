angular.module('starter.services.gerador-relatorio', [])
.factory('GeradorDeRelatorio', function($cordovaPrinter){
  return{
    gerarRelatorio: function(){
      console.log($cordovaPrinter);
      if($cordovaPrinter.isAvailable()){
        $cordovaPrinter.print('js/components/gerador-relatorio/gerador-relatorio-tamplate.html', "Document.html");
      }
    }
  }

});
