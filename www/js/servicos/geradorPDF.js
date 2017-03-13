angular.module('starter.services.geradorPDF', [])

.factory('GeradorPDF', function(){
  var doc = new jsPDF();
  return{
    criarPDF: function(){
      doc.text('Hello world!', 10, 10);
      doc.save('a4.pdf');
    }
  }
});
