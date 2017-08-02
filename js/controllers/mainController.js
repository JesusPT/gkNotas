app.controller('mainController',['$scope','$mdDialog',function($scope,$mdDialog){
  var colors = ["#e7ff1d","#3fe6c6","#7b239c","#e49359","#eb66ac"];
  $scope.contN = "";
  $scope.tituloN = "";
  $scope.clave = "";
  $scope.tEditable = "";
  $scope.cEditable = "";
  $scope.nT = "";

  $scope.notas = [
    // {
    //   titulo: "Mi Nota",
    //   contenido: "Lorem ipsum dolor sit amet, consectetur adipisicing",
    //   check: false,
    //   color: "#e7ff1d"
    // }

  ];
  $scope.nuevaNota = function(){
    nueva.contenidoNota.$valid;
    if ($scope.contN != "") {
      $scope.notas.push({
        titulo: $scope.tituloN,
        contenido: $scope.contN,
        check: false,
        color: colors[0]
      });
      $scope.tituloN = ""
      $scope.contN = ""
    }else{
      $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('body')))
        .clickOutsideToClose(true)
        .title('Contenido vacio')
        .textContent('No se puede agregar una nota sin contenido')
        .ariaLabel('')
        .ok('OK')
    );
    }
  //  console.log($scope.notas[$scope.notas.length-1]);
  };

  $scope.eliminar = function(i){
    index = $scope.notas.indexOf(i);
    if (index >= 0) {
      $scope.notas.splice(index,1);
    }
  };

  $scope.checked = function(i){
    index = $scope.notas.indexOf(i);
    if (index >= 0) {
      $scope.notas[index].check = !$scope.notas[index].check;
    }
  };

  $scope.editarTitle = function(ikey,data){
    for (var i = 0; i < $scope.notas.length; i++) {
      if($scope.notas[i].$$hashKey == ikey.$$hashKey){
        $scope.notas[i].titulo = data;
        break;
      }
    }
  };

  $scope.editarCont = function(ikey,data){
    for (var i = 0; i < $scope.notas.length; i++) {
      if($scope.notas[i].$$hashKey == ikey.$$hashKey){
        $scope.notas[i].contenido = data;
        break;
      }
    }
  };

  $scope.color = function(i){
    // console.log(i.$$hashKey);
    index = $scope.notas.indexOf(i);
    if (index >= 0) {
      iC = colors.indexOf($scope.notas[index].color);
      if (iC < 4) {
        iC++
      }else{
        iC = 0;
      }
      $scope.notas[index].color = colors[iC];
    }
  };

  $scope.showPrompt = function(e,nota) {
    var ventana = $mdDialog.prompt()
      .title('Cambiar titulo de la nota')
      .textContent('')
      .placeholder('Titulo')
      .initialValue('')
      .targetEvent(e)
      .ok('Listo')
      .cancel('Cancelar');

    $mdDialog.show(ventana).then(function(res) {
      $scope.editarTitle(nota,res);
    }, function() {
      $scope.nT = 'rt';
    });

  };

  $scope.showPromptC = function(e,nota) {
    var ventana = $mdDialog.prompt()
      .title('Cambiar contenido de la nota')
      .textContent('')
      .placeholder('Contenido')
      .initialValue('')
      .targetEvent(e)
      .ok('Listo')
      .cancel('Cancelar');

    $mdDialog.show(ventana).then(function(res) {
      $scope.editarCont(nota,res);
    }, function() {
      $scope.nT = 'rt';
    });

  };

}
]);
