
angular.module('starter.controllers', [])
 
.controller("ConfigCtrl", function($scope, $q, $state, DB,$timeout, User, $rootScope) {

    $rootScope.index = {test:0 , excercises:0, theory:0};
    $rootScope.results = {test:{aciertos:0, fallos:0} , excercises:{aciertos:0, fallos:0}, theory:0};

    var createBD = function(){
         var deferred = $q.defer();
         DB.create();
         deferred.resolve();
         return deferred.promise;
    };

    var loadUser = function(){
         var deferred = $q.defer();
         User.load();
         deferred.resolve();
         return deferred.promise;
    }


    createBD().then(loadUser).then(function(){
        
        var deferred = $q.defer();

        $timeout(function(){ if(angular.isUndefined($rootScope.user)){  
            $timeout(function(){ $state.go('register'); }, 1000);
        }else{
            $timeout(function(){ $state.go('home'); }, 1000);
        }; }, 1000);
       
        deferred.resolve();

         return deferred.promise;
    })

})

.controller("HomeCtrl", function($rootScope,$scope, Temas, Test, Theory, Exercises) {

     $scope.title = "Home";
     $scope.temas = Temas.all();


     $scope.getTemaId = function(obj){
      
      if($rootScope.temaId != obj){
        $rootScope.temaId = obj;
        $rootScope.test = Test.getPreguntasTest(obj);
        $rootScope.theory = Theory.getTeoriaDeTema(obj);
        $rootScope.excercises = Exercises.getTodosLosNiveles($rootScope.temaId)
     }
        Test.loadIndex(obj);
    }
})


.controller('CategoriesCtrl', function($rootScope, $timeout, $scope,$state,  Categorias, Temas, Test, Theory){
    /*
      1.-Theory
      2.-Exercises
      3.-Test
    */
    $scope.title = "Categories";
    $scope.nombreTema = Temas.get($rootScope.temaId);
    $scope.categorias = Categorias.getCategoriasTema($rootScope.temaId); 
    $scope.getCategoriaId = function(obj){
        
        $rootScope.categoriaId = obj;
        if(obj == 3){
         $rootScope.showTest = false; //muestra los test resueltos
            if($rootScope.index.test == $rootScope.test.length){
                Test.getAciertos($rootScope.temaId);
                Test.getFallos($rootScope.temaId);
                $timeout(function(){ $state.go('home.categories.3.test-results');}, 15);
                
            }else{ 

                 $scope.listaEjer = Exercises.by_tema_nivel($rootScope.temaId, $rootScope.nivelId);           
                 $timeout(function(){ $state.go('home.categories.3');}, 15);
            }
        }else if(obj == 2){
             $state.go('home.categories.2');
              $timeout(function(){$state.go('home.categories.2');}, 15);

        }else if(obj == 1){

              $timeout(function(){$state.go('home.categories.1');}, 15);

        }
    }

  
})
/***************************************TEORIA************************************************/
.controller('TheoryCtrl', function($scope, $rootScope){

    $scope.title = "Theory";
    $scope.listaTeoria = $rootScope.theory;

    $scope.getTheory = function(index){      
        $rootScope.chosenTheory = index;
        $rootScope.listaTeoria = $scope.listaTeoria
    }    
})

.controller('CompleteTheoryCtrl', function($scope, $rootScope,  $ionicSlideBoxDelegate){

    $scope.title = "Detail";
    var index = $rootScope.chosenTheory;
    $scope.indexSlide = function(){
         $ionicSlideBoxDelegate.slide(index)
    }
    $scope.listaTeoria = $rootScope.listaTeoria;
    
    })

/***************************************EXERCISES************************************************/

.controller('ExerCtrl', function($scope, $rootScope, Exercises, Score_exercises){
    
    $scope.title = "Exercises";
    var exercises = $rootScope.excercises;
    $scope.listaNiveles = Exercises.get_info_levels(exercises);
    /*definimos el score que tendra cada nivel */
    $scope.score= function(tam){
       return Score_exercises.define_tam(tam);
    }

    $scope.getNivelId = function(obj){
        $rootScope.nivelId = obj;
        $rootScope.nivelEjer = Exercises.by_tema_nivel($rootScope.temaId, obj);      
    }
})

.controller('ExerListCtrl', function($scope, $rootScope, Exercises, Score_exercises){
   
    $scope.title = "Level " + $rootScope.nivelId;
    $scope.listaEjer = Exercises.by_tema_nivel($rootScope.temaId, $rootScope.nivelId);
    $rootScope.getEjer = [];
    $scope.getEjer = function(obj){
        $rootScope.getEjer = obj;
               
    }
})

.controller('LevelCtrl', function($scope, $rootScope, $ionicSlideBoxDelegate, $window, $ionicPopup){
    
    
    var index = $rootScope.getEjer.ejerId;
    $scope.listaEjerPerTemaNivel =  $rootScope.nivelEjer;    
    $scope.title = "Level " + $rootScope.nivelId;
    $scope.estadoDeJuego = {idEjer: index, numIntentos: 0 ,numFallos: 0};

     $scope.initSlide = function () 
    {
        $ionicSlideBoxDelegate.slide(index-1);
    }

    $scope.index = function(){

        index = $ionicSlideBoxDelegate.currentIndex()+1;

        return index;
    }

    $scope.boxShowAaxaa = false;
    $scope.boxShowAaxAa = false;
    $scope.boxShowLethalgenes = false;
    $scope.boxShowA1A2xA1A2 = false;
    $scope.boxShowA1A2xA1A3 = false;
    $scope.boxShowA1A2xA3A4 = false;

    $scope.buttonStyle = "button-outline";

    $scope.showBoxAaxaa = function () {
        $scope.buttonStyle = "button-pressed";
        $scope.agree = " ";
        $scope.boxShowAaxaa = !$scope.boxShowAaxaa;
        $scope.boxShowAaxAa = false;
        $scope.boxShowLethalgenes = false;
        $scope.boxShowA1A2xA1A2 = false;
        $scope.boxShowA1A2xA1A3 = false;
        $scope.boxShowA1A2xA3A4 = false;

    }
    $scope.showBoxAaxAa = function () {
        $scope.agree = " ";
        $scope.boxShowAaxAa = !$scope.boxShowAaxAa;
        $scope.boxShowAaxaa = false;
        $scope.boxShowLethalgenes = false;
        $scope.boxShowA1A2xA1A2 = false;
        $scope.boxShowA1A2xA1A3 = false;
        $scope.boxShowA1A2xA3A4 = false;
    }
    $scope.showBoxLethalgenes = function () {
        $scope.agree = " ";
        $scope.boxShowLethalgenes = !$scope.boxShowLethalgenes;
        $scope.boxShowAaxaa = false;
        $scope.boxShowAaxAa = false;
        $scope.boxShowA1A2xA1A2 = false;
        $scope.boxShowA1A2xA1A3 = false;
        $scope.boxShowA1A2xA3A4 = false;
    }
    $scope.showBoxA1A2xA1A2 = function () {
        $scope.agree = " ";
        $scope.boxShowA1A2xA1A2 = !$scope.boxShowA1A2xA1A2;
        $scope.boxShowAaxaa = false;
        $scope.boxShowAaxAa = false;
        $scope.boxShowLethalgenes = false;
        $scope.boxShowA1A2xA1A3 = false;
        $scope.boxShowA1A2xA3A4 = false;
    }
    $scope.showBoxA1A2xA1A3 = function () {
        $scope.agree = " ";
        $scope.boxShowA1A2xA1A3 = !$scope.boxShowA1A2xA1A3;
        $scope.boxShowAaxaa = false;
        $scope.boxShowAaxAa = false;
        $scope.boxShowLethalgenes = false;
        $scope.boxShowA1A2xA1A2 = false;
        $scope.boxShowA1A2xA3A4 = false;
    }
    $scope.showBoxA1A2xA3A4 = function () {
        $scope.agree = " ";
        $scope.boxShowA1A2xA3A4 = !$scope.boxShowA1A2xA3A4;
        $scope.boxShowAaxaa = false;
        $scope.boxShowAaxAa = false;
        $scope.boxShowLethalgenes = false;
        $scope.boxShowA1A2xA1A2 = false;
        $scope.boxShowA1A2xA1A3 = false;
    }

        
        $scope.chiA = 0;
        $scope.total = 0;

        $scope.AaValue = {value:0};
        $scope.aaValue = {value:0};
        $scope.AAValue = {value:0};
        $scope.A1A1Value = {value:0};
        $scope.A1A3Value = {value:0};
        $scope.A1A2Value = {value:0};
        $scope.A2A3Value = {value:0};
        $scope.A2A4Value = {value:0};

  


        /* Aa x aa */
    $scope.calculateTestCross = function($window){

       $scope.estadoDeJuego.numIntentos = $scope.estadoDeJuego.numIntentos + 1;
       $scope.Math = Math;

        if($scope.AaValue.value > 5000 || $scope.aaValue.value > 5000){
           $scope.alertPopup = $ionicPopup.alert({
                title: '¡Cuidado!',
                template: 'Los valores tienen que ser menores de 5000.'
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
             });
            //mensaje de error, el valor tiene que ser menor de 5000
        }else{
            $scope.total = $scope.AaValue.value + $scope.aaValue.value;
            $scope.exp_A = $scope.total / 2;
            $scope.exp_a = $scope.total / 2;
            if($scope.exp_A > 10 || $scope.exp_a > 10){
                $scope.opExpA = $scope.Math.pow(($scope.AaValue.value - $scope.exp_A), 2) / $scope.exp_A;
                $scope.opExpa = $scope.Math.pow(($scope.aaValue.value - $scope.exp_a), 2) / $scope.exp_a;
                $scope.chiA = $scope.opExpA + $scope.opExpa;
            }else if($scope.exp_A < 5 || $scope.exp_a < 5){
                // Hay que mostrar mensaje de que: an expected value is less than 5
            }else if(($scope.exp_A >= 5 && $scope.exp_A <= 10) 
                        || ($scope.exp_a >= 5 && $scope.exp_a <= 10)){
                $scope.operation_A = ($scope.AaValue.value - $scope.exp_A) - 0.5;
                $scope.operation_a = ($scope.aaValue.value - $scope.exp_a) - 0.5;
                $scope.opExpA = pow(($scope.operation_A), 2) / $scope.exp_A;
                $scope.opExpa = pow(($scope.operation_a), 2) / $scope.exp_a;
                $scope.chiA = $scope.opExpA + $scope.opExpa;
            }
            if($scope.chiA >= 3.841){
                $scope.estadoDeJuego.numFallos = $scope.estadoDeJuego.numFallos + 1;
                $scope.agree = "NO";
                $scope.result = "This locus is not segregating correctly";                  
            }else{
                $scope.agree = "YES";
                $scope.result = "This locus is segregating correctly";
            }
        }
    }

    /* Aa x Aa */
    $scope.calculateF2Dominance = function(){
        $scope.estadoDeJuego.numIntentos = $scope.estadoDeJuego.numIntentos + 1;
        $scope.Math = Math;
        
        if(AaValue.value > 5000 || aaValue.value > 5000){
            $scope.alertPopup = $ionicPopup.alert({
                title: '¡Cuidado!',
                template: 'Los valores tienen que ser menores de 5000.'
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
             });
        }else{
            $scope.total = $scope.AaValue.value + $scope.aaValue.value;
            $scope.exp_A = ($scope.total * 3) / 4;
            $scope.exp_a = $scope.total / 4;
            if($scope.exp_A > 10 || $scope.exp_a > 10){
                $scope.opExpA = $scope.Math.pow(($scope.AaValue.value - $scope.exp_A), 2) / $scope.exp_A;
                $scope.opExpa = $scope.Math.pow(($scope.aaValue.value - $scope.exp_a), 2) / $scope.exp_a;
                $scope.chiA = $scope.opExpA + $scope.opExpa;
            }else if($scope.exp_A < 5 || $scope.exp_a < 5){
                // Hay que mostrar mensaje de que: an expected value is less than 5
            }else if(($scope.exp_A >= 5 && $scope.exp_A <= 10) 
                        || ($scope.exp_a >= 5 && $scope.exp_a <= 10)){
                $scope.operation_A = ($scope.value_A - $scope.exp_A) - 0.5;
                $scope.operation_a = ($scope.value_a - $scope.exp_a) - 0.5;
                $scope.opExpA = pow(($scope.operation_A), 2) / $scope.exp_A;
                $scope.opExpa = pow(($scope.operation_a), 2) / $scope.exp_a;
                $scope.chiA = $scope.opExpA + $scope.opExpa;
            }
            if($scope.chiA >= 3.841){
                $scope.estadoDeJuego.numFallos = $scope.estadoDeJuego.numFallos + 1;
                $scope.agree = "NO";
                $scope.result = "This locus is not segregating correctly";                  
            }else{
                $scope.agree = "YES";
                $scope.result = "This locus is segregating correctly";
            }
        }
    } 

        /* A1A2 x A1A2 */
    $scope.calculateF2Codominance = function(){
        $scope.estadoDeJuego.numIntentos = $scope.estadoDeJuego.numIntentos + 1;
        $scope.Math = Math;

        if(AAValue.value > 5000 || AaValue.value > 5000 || aaValue.value > 5000){
               $scope.alertPopup = $ionicPopup.alert({
                title: '¡Cuidado!',
                template: 'Los valores tienen que ser menores de 5000.'
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
             });
        }else{
            $scope.total = AAValue.value + AaValue.value + aaValue.value;
            $scope.exp_AA = $scope.total / 4;
            $scope.exp_Aa = $scope.total / 2;
            $scope.exp_aa = $scope.total / 4;
            if($scope.exp_AA > 10 || $scope.exp_Aa > 10 || $scope.exp_aa > 10){
                $scope.opExpAA = pow((AAValue.value - $scope.exp_A), 2) / $scope.exp_AA;
                $scope.opExpAa = pow((AaValue.value - $scope.exp_Aa), 2) / $scope.exp_Aa;
                $scope.opExpaa = pow((aaValue.value - $scope.exp_aa), 2) / $scope.exp_aa;
                $scope.chiA = $scope.opExpA + $scope.opExpa;
            }else if($scope.exp_A < 5 || $scope.exp_a < 5){
                // Hay que mostrar mensaje de que: an expected value is less than 5
            }else if(($scope.exp_AA >= 5 && $scope.exp_AA <= 10) 
                        || ($scope.exp_Aa >= 5 && $scope.exp_Aa <= 10)
                        || ($scope.exp_aa >= 5 && $scope.exp_aa <= 10)){
                $scope.operation_AA = (AAValue.value - $scope.exp_AA) - 0.5;
                $scope.operation_Aa = (AaValue.value - $scope.exp_Aa) - 0.5;
                $scope.operation_aa = (aaValue.value - $scope.exp_aa) - 0.5;

                $scope.opExpAA = pow(($scope.operation_AA), 2) / $scope.exp_AA;
                $scope.opExpAa = pow(($scope.operation_Aa), 2) / $scope.exp_Aa;
                $scope.opExpaa = pow(($scope.operation_aa), 2) / $scope.exp_aa;

                $scope.chiA = $scope.opExpAA + $scope.opExpAa + $scope.opExpaa;
            }
            if($scope.chiA >= 5.991){
                $scope.estadoDeJuego.numFallos = $scope.estadoDeJuego.numFallos + 1;
                $scope.agree = "NO";
                $scope.result = "This locus is not segregating correctly";                  
            }else{
                $scope.agree = "YES";
                $scope.result = "This locus is segregating correctly";
            }
        }
    }

        /* A1A2 x A1A3 */
    $scope.calculateCodominance3Alleles = function(){
        $scope.estadoDeJuego.numIntentos = $scope.estadoDeJuego.numIntentos + 1;

        if(A1A1Value.value > 5000 || A1A3Value.value > 5000 || A1A2Value.value > 5000 || A2A3Value.value > 5000){
              $scope.alertPopup = $ionicPopup.alert({
                title: '¡Cuidado!',
                template: 'Los valores tienen que ser menores de 5000.'
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
             });
        }else{
            $scope.total = A1A1Value.value + A1A3Value.value3 + A1A2Value.value + A2A3Value.value;
            $scope.exp_A1A1 = $scope.total / 4;
            $scope.exp_A1A3 = $scope.total / 4;
            $scope.exp_A1A2 = $scope.total / 4;
            $scope.exp_A2A3 = $scope.total / 4;
            if($scope.exp_A1A1 > 10 || $scope.exp_A1A3 > 10 || $scope.exp_A1A2 > 10 || $scope.exp_A2A3 > 10){
                $scope.opExpA1A1 = pow((A1A1Value.value - $scope.exp_A1A1), 2) / $scope.exp_A1A1;
                $scope.opExpA1A3 = pow((A1A3Value.value - $scope.exp_A1A3), 2) / $scope.exp_A1A3;
                $scope.opExpA1A2 = pow((A1A2Value.value - $scope.exp_A1A2), 2) / $scope.exp_A1A2; 
                $scope.opExpA2A3 = pow((A2A3Value.value - $scope.exp_A2A3), 2) / $scope.exp_A2A3; 
                $scope.chiA = $scope.opExpA1A1 + $scope.opExpA1A3 + $scope.opExpA1A2 + $scope.opExpA2A3;
            }else if($scope.exp_A1A1 < 5 || $scope.exp_A1A3 < 5 || $scope.exp_A1A2 < 5 || $scope.exp_A2A3 < 5){
                // Hay que mostrar mensaje de que: an expected value is less than 5
            }else if(($scope.exp_A1A1 >= 5 && $scope.exp_A1A1 <= 10) 
                        || ($scope.exp_A1A3 >= 5 && $scope.exp_A1A3 <= 10)
                        || ($scope.exp_A1A2 >= 5 && $scope.exp_A1A2 <= 10)
                        || ($scope.exp_A2A3 >= 5 && $scope.exp_A2A3 <= 10)){

                $scope.operation_A1A1 = (A1A1Value.value - $scope.exp_A1A1) - 0.5;
                $scope.operation_A1A3 = (A1A3Value.value - $scope.exp_A1A3) - 0.5;
                $scope.operation_A1A2 = (A1A2Value.value - $scope.exp_A1A2) - 0.5;
                $scope.opertaion_A2A3 = (A2A3Value.value - $scope.exp_A2A3) - 0.5;
                
                $scope.opExpA1A1 = pow(($scope.operation_A1A1), 2) / $scope.exp_A1A1;
                $scope.opExpA1A3 = pow(($scope.operation_A1A3), 2) / $scope.exp_A1A3;
                $scope.opExpA1A2 = pow(($scope.operation_A1A2), 2) / $scope.exp_A1A2;
                $scope.opExpA2A3 = pow(($scope.operation_A2A3), 2) / $scope.exp_A2A3;
                
                $scope.chiA = $scope.opExpA1A1 + $scope.opExpA1A3 + $scope.opExpA1A2 + $scope.opExpA2A3;
            }
            if($scope.chiA >= 7.815){
                $scope.estadoDeJuego.numFallos = $scope.estadoDeJuego.numFallos + 1;
                $scope.agree = "NO";
                $scope.result = "This locus is not segregating correctly";                  
            }else{
                $scope.agree = "YES";
                $scope.result = "This locus is segregating correctly";
            }
        }
    }

        /* A1A2 x A3A4 */
        $scope.calculateCodominance4Alleles = function(){
            $scope.estadoDeJuego.numIntentos = $scope.estadoDeJuego.numIntentos + 1;
            $scope.Math = Math;

            if(A1A3Value.value > 5000 || A1A4Value.value > 5000 || A2A3Value.value > 5000 || A2A4Value.value > 5000){
                  $scope.alertPopup = $ionicPopup.alert({
                title: '¡Cuidado!',
                template: 'Los valores tienen que ser menores de 5000.'
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
             });
            }else{
                $scope.total = A1A3Value.value + A1A4Value.value + A2A3Value.value + A2A4Value.value;
                $scope.exp_A1A3 = $scope.total / 4;
                $scope.exp_A1A4 = $scope.total / 4;
                $scope.exp_A2A3 = $scope.total / 4;
                $scope.exp_A2A4 = $scope.total / 4;
                if($scope.exp_A1A3 > 10 || $scope.exp_A1A4 > 10 || $scope.exp_A2A3 > 10 || $scope.exp_A2A4 > 10){

                }else if($scope.exp_A1A3 < 5 || $scope.exp_A1A4 < 5 || $scope.exp_A2A3 < 5|| $scope.exp_A2A4 < 5){

                }else if(($scope.exp_A1A3 >= 5 && $scope.exp_A1A3 <= 10) 
                            || ($scope.exp_A1A4 >= 5 && $scope.exp_A1A4 <= 10)
                            || ($scope.exp_A2A3 >= 5 && $scope.exp_A2A3 <= 10)
                            || ($scope.exp_A2A4 >= 5 && $scope.exp_A2A4 <= 10)){

                    $scope.operation_A1A3 = (A1A3Value.value - $scope.exp_A1A3) - 0.5;
                    $scope.operation_A1A4 = (A1A4Value.value - $scope.exp_A1A4) - 0.5;
                    $scope.operation_A2A3 = (A2A3Value.value - $scope.exp_A2A3) - 0.5;
                    $scope.opertaion_A2A4 = (A2A4Value.value - $scope.exp_A2A4) - 0.5;
                    
                    $scope.opExpA1A3 = pow(($scope.operation_A1A3), 2) / $scope.exp_A1A3;
                    $scope.opExpA1A4 = pow(($scope.operation_A1A4), 2) / $scope.exp_A1A4;
                    $scope.opExpA2A3 = pow(($scope.operation_A2A3), 2) / $scope.exp_A2A3;
                    $scope.opExpA2A4 = pow(($scope.operation_A2A4), 2) / $scope.exp_A2A4;

                    $scope.chiA = $scope.opExpA1A3 + $scope.opExpA1A4 + $scope.opExpA2A3 + $scope.opExpA2A4;

                }
                if($scope.chiA >= 7.815){
                    $scope.estadoDeJuego.numFallos = $scope.estadoDeJuego.numFallos + 1;
                    $scope.agree = "NO";
                    $scope.result = "This locus is not segregating correctly";                  
                }else{
                    $scope.agree = "YES";
                    $scope.result = "This locus is segregating correctly";
                }
            }

        }


        /* Lethal Genes */
        $scope.calculateLethalGenes = function(){
            $scope.estadoDeJuego.numIntentos = $scope.estadoDeJuego.numIntentos + 1;
            $scope.Math = Math;

            if(AAValue.value > 5000 || AaValue.value > 5000){
                $scope.alertPopup = $ionicPopup.alert({
                title: '¡Cuidado!',
                template: 'Los valores tienen que ser menores de 5000.'
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
             });
            }else{
                $scope.total = AAValue.value + AaValue.value;
                $scope.exp_AA = $scope.total / 3;
                $scope.exp_Aa = (2 * $scope.total) / 3;

                if($scope.exp_AA > 10 || $scope.exp_Aa > 10){
                    $scope.opExpAA = pow((AAValue.value - $scope.exp_AA), 2) / $scope.exp_AA;
                    $scope.opExpAa = pow((AaValue.value - $scope.exp_Aa), 2) / $scope.exp_Aa;
                    $scope.chiA = $scope.opExpAA + $scope.opExpAa;
                }else if($scope.exp_AA < 5 || $scope.exp_Aa < 5){
                    // Hay que mostrar mensaje de que: an expected value is less than 5
                }else if(($scope.exp_AA >= 5 && $scope.exp_AA <= 10) 
                            || ($scope.exp_Aa >= 5 && $scope.exp_Aa <= 10)){
                    $scope.operation_AA = (AAValue.value - $scope.exp_AA) - 0.5;
                    $scope.operation_Aa = (AaValue.value - $scope.exp_Aa) - 0.5;
                    $scope.opExpAA = pow(($scope.operation_AA), 2) / $scope.exp_AA;
                    $scope.opExpAa = pow(($scope.operation_Aa), 2) / $scope.exp_Aa;
                    $scope.chiA = $scope.opExpAA + $scope.opExpAa;
                }
                if($scope.chiA >= 3.841){
                    $scope.estadoDeJuego.numFallos = $scope.estadoDeJuego.numFallos + 1;
                    $scope.agree = "NO";
                    $scope.result = "This locus is not segregating correctly";                  
                }else{
                    $scope.agree = "YES";
                    $scope.result = "This locus is segregating correctly";
                }
            }

        }

        /*Hay que pensar si vamos a inicializar todas las variables que se usan en los métodos */
        $scope.clean = function(){
            $scope.AaValue = {value:0};
            $scope.aaValue = {value:0};
            $scope.AAValue = {value:0};
            $scope.A1A1Value = {value:0};
            $scope.A1A3Value = {value:0};
            $scope.A1A2Value = {value:0};
            $scope.A2A3Value = {value:0};
            $scope.A2A4Value = {value:0};
            $scope.chiA = 0;
            $scope.total = 0;
            $scope.agree = " ";

        }
})

/***************************************TEST************************************************/

.controller('TestCtrl', function($scope, $state, $q,$rootScope,$state, Test, $ionicSlideBoxDelegate)
{   
    var aciertos=0;
    var fallos=0;
    var opEsCorrecto;
    var estadoDeTest;

    if($rootScope.showTest){
         $scope.index = 0;
    }else{
        $scope.index = $rootScope.index.test;
    } 
 
    $scope.lockSlide = function () 
    {
        $ionicSlideBoxDelegate.enableSlide( false );
    }

     var carga = function()
     {
         var deferred = $q.defer();
         $scope.listaPreguntas = $rootScope.test;
         deferred.resolve();

         return deferred.promise;
    }

    carga().then(function(){
        
         $scope.title = "Test";
         $scope.used=false; 
         $scope.listaOpcionesPregunta = Test.getOpcionesTest($scope.listaPreguntas[$scope.index].id);
  
    $scope.nextSlide = function()
    {
        estadoDeTest = {idTest: $scope.listaPreguntas[$scope.index].id, esCorrecto: opEsCorrecto}; 
        Test.storePregTest(estadoDeTest);  
        $scope.used=false;
        
        if($scope.index<$scope.listaPreguntas.length-1)
        {
            $scope.index = $scope.index+ 1;
            $scope.listaOpcionesPregunta = Test.getOpcionesTest($scope.listaPreguntas[$scope.index].id);
        }else{

            $rootScope.results.test.aciertos=aciertos;
            $rootScope.results.test.fallos=fallos;
            $state.go('home.categories.3.test-results');         
        }
    $ionicSlideBoxDelegate.next();

  }

    $scope.plot = function(state)
    {
    
        if(!$scope.used){


            return true;
        
        }else{

            return !state;
        }

    }

      $scope.checked = function(state){
    
        if(!$scope.used){


            return false;
        
            }else{
                
                return !state;
        }

    }
   
    $scope.resolve = function(optionEsCorrecto){
        
        if(optionEsCorrecto==1) {

            aciertos=aciertos+1;
        }else{
            fallos=fallos+1;
        }
        opEsCorrecto = optionEsCorrecto; 
        $scope.used = !$scope.used;   

    } 
    });
})
.controller("ScoreTestCtrl", function($rootScope, $scope, $state) {
    $scope.title = "Score";
    $scope.aciertos = $rootScope.results.test.aciertos ;
    $scope.fallos = $rootScope.results.test.fallos;
 
     $scope.showTest = function(){        
        $rootScope.showTest = true;
    }
    
})

/***************************************REGISTER************************************************/

.controller("RegisterCtrl", function($rootScope,$scope, Register) {

    $scope.title = "Sign up";
    var user = [];
    
    $scope.getUserFields = function(nameU, nickU, passU){        
        $rootScope.user = nickU;
        
        Register.signUpUser(nameU, nickU, passU);
            
    }

})