angular.module('starter.services.geradorPDF', [])

.factory('GeradorPDF', function($cordovaFile){
  var doc = new jsPDF();

  return{
    criarPDF: function(nomeDoArquivo){
      doc.text('Hello world!', 10, 10);
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(navigator.userAgent)){
          var pdfOutput = doc.output();
          $cordovaFile.writeFile(cordova.file.dataDirectory, nomeDoArquivo, pdfOutput, true)
          .then(function (success) {
            alert("cordova.file.externalRootDirectory");
          }, function (error) {
            console.log("error");
          });
        }
        doc.save(nomeDoArquivo + '.pdf');
      },
    }
  });
