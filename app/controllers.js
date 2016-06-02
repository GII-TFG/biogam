
angular.module('starter.controllers', [])
 
.controller("welcomeCtrl", function($scope, $q, $state, DB,$timeout, User, $rootScope, $ionicHistory) {
    $scope.title = "Welcome";
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

        $timeout(function(){ 

           $ionicHistory.nextViewOptions({
               disableBack: true
            });
             $timeout(function(){ $state.go('home'); }, 100);
            
        }, 1000);
       
        deferred.resolve();

         return deferred.promise;
    });

})

.controller("HomeCtrl", function($rootScope,$scope, Temas, Test, Theory, Exercises) {

     $scope.title = "Home";
     $scope.temas = Temas.all();


     $scope.getTemaId = function(obj){
      
      if($rootScope.temaId != obj){
		$rootScope.imagePath=obj;
        $rootScope.temaId = obj;
        $rootScope.test = Test.getPreguntasTest(obj);
        $rootScope.theory = Theory.getTeoriaDeTema(obj);
        $rootScope.excercises = Exercises.getTodosLosNiveles($rootScope.temaId)
     }
        Test.loadIndex(obj);
    }
})


.controller('CategoriesCtrl', function($rootScope, $timeout, $scope,$state,  Categorias, Temas, Test, Theory, Exercises){
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
                $rootScope.show_test = true;
                $timeout(function(){ $state.go('home.categories.3.test-results');}, 15);
                
            }else{ 
                 $rootScope.show_test = false;
                 $timeout(function(){ $state.go('home.categories.3');}, 15);
            }
        }else if(obj == 2){
             
              $timeout(function(){$state.go('home.categories.2');}, 15);

        }else if(obj == 1){

              $timeout(function(){$state.go('home.categories.1');}, 15);

        }
    }

  
})
/***************************************TEORIA************************************************/
.controller('TheoryCtrl', function($scope, $rootScope, Theory){

    $scope.title = "Theory";
    $scope.listaTeoria = $rootScope.theory;

	for(var i=0; i<$rootScope.theory.length; i++){

        Theory.getImg($rootScope.theory[i].idImg,i);
    }
	
    $scope.getTheory = function(index){      
        $rootScope.index.theory = index;
        $rootScope.listaTeoria = $scope.listaTeoria
    }    
})

.controller('CompleteTheoryCtrl', function($scope, $rootScope, Theory,  $ionicSlideBoxDelegate){
       console.log($rootScope.theory[0].imagenes.length);

     $scope.path=$rootScope.imagePath;
    var cargaImg = function(id){
         var deferred = $q.defer();
         Theory.getImg(id);
         deferred.resolve();
         return deferred.promise;
    };
    $scope.title = "Detail";
    var index = $rootScope.index.theory;
    $scope.indexSlide = function(){
         $ionicSlideBoxDelegate.slide(index)
    }
     $scope.listaTeoria = $rootScope.theory;
    
    })

/***************************************EXERCISES************************************************/

.controller('ExerCtrl', function($scope, $rootScope, Exercises, Score_exercises){
    
    $scope.title = "Exercises";
    $rootScope.list_balls = [];
    var exercises = $rootScope.excercises;
   
    /*tenemos los ejercicios y a partir de ellos obtenemos la info necesaria para representar los niveles*/
    $rootScope.listaNiveles = Exercises.get_info_levels(exercises);
    $scope.listaNiveles = $rootScope.listaNiveles;
    /*definimos el score que tendra cada nivel */
    $scope.score= function(nivel){

       var balls = Score_exercises.define_tam(nivel);
       $rootScope.list_balls.push({level: nivel, balls: balls});
       return  balls;
    }

    $scope.active_button = function(nivel, index){
       

        if(nivel.level == 1){
         
         return false;
        }else{

         var ok =false;;
         for(var i=0; i <  $scope.listaNiveles[index-1].size; i++){

            if($scope.listaNiveles[index-1].list_exer[i].attempts<=0){
                ok = true;
            }

         }

         return ok;
        }

    }

    $scope.getNivelId = function(obj){
        $rootScope.nivel = obj;
        $rootScope.nivelEjer = Exercises.by_tema_nivel($rootScope.temaId, obj.level);      
    }   
})

.controller('ExerListCtrl', function($scope, $rootScope, Exercises, Score_exercises){
   
    $scope.title = "Level " + $rootScope.nivel.level;
    $scope.listaEjer = $rootScope.nivelEjer;
    $rootScope.info_exercises_level=Exercises.get_exercises_level($rootScope.nivel.level, $rootScope.listaNiveles);
    $rootScope.getEjer = [];

    $scope.getEjer = function(obj, index){
        $rootScope.getEjer = obj;
        $rootScope.index.exercises = index;               
    }
})

.controller('LevelCtrl', function($scope, $rootScope, $ionicSlideBoxDelegate, $window, $ionicPopup,  $templateCache, Exercises){
    
    index =  $rootScope.index.exercises;
    var state_exercise = $rootScope.info_exercises_level[index];
    $scope.score = function(){

        return  $rootScope.list_balls[$rootScope.nivel.level-1].balls;
    }

    $scope.listaEjerPerTemaNivel =  $rootScope.nivelEjer;    
    $scope.title = "Level " + $rootScope.nivelId;
    
    

     $scope.initSlide = function () 
    {
        $ionicSlideBoxDelegate.slide(index);
    }

    $scope.slideHasChanged = function(i) 
    {   
        console.log(i);
        state_exercise = $rootScope.info_exercises_level[i];
    }

    $scope.calculate = function(balls, exer, i){

       state_exercise.attempts++;
       $rootScope.info_exercises_level[i]=state_exercise;
       Exercises.store($rootScope.info_exercises_level);
       balls[i]=1;
      }


    $scope.boxShowAaxaa = false;
    $scope.boxShowAaxAa = false;
    $scope.boxShowLethalgenes = false;
    $scope.boxShowA1A2xA1A2 = false;
    $scope.boxShowA1A2xA1A3 = false;
    $scope.boxShowA1A2xA3A4 = false;

    
    $scope.buttonStyleAaxaa = "button-pressed";
    $scope.buttonStyleAaxAa = "button-pressed";
    $scope.buttonStyleLGenes = "button-pressed";
    $scope.buttonStyleA1A2xA1A2 = "button-pressed";
    $scope.buttonStyleA1A2xA1A3 = "button-pressed";
    $scope.buttonStyleA1A2xA3A4 = "button-pressed";
   

    $scope.showBoxAaxaa = function () {
        $scope.buttonStyleAaxaa = "button-outline";
        $scope.buttonStyleAaxAa = "button-pressed";
        $scope.buttonStyleLGenes = "button-pressed";
        $scope.buttonStyleA1A2xA1A2 = "button-pressed";
        $scope.buttonStyleA1A2xA1A3 = "button-pressed";
        $scope.buttonStyleA1A2xA3A4 = "button-pressed";
        $scope.agree = " ";
        $scope.boxShowAaxaa = !$scope.boxShowAaxaa;
        $scope.boxShowAaxAa = false;
        $scope.boxShowLethalgenes = false;
        $scope.boxShowA1A2xA1A2 = false;
        $scope.boxShowA1A2xA1A3 = false;
        $scope.boxShowA1A2xA3A4 = false;

    }
    $scope.showBoxAaxAa = function () {
        $scope.buttonStyleAaxaa = "button-pressed";
        $scope.buttonStyleAaxAa = "button-outline";
        $scope.buttonStyleLGenes = "button-pressed";
        $scope.buttonStyleA1A2xA1A2 = "button-pressed";
        $scope.buttonStyleA1A2xA1A3 = "button-pressed";
        $scope.buttonStyleA1A2xA3A4 = "button-pressed";
        $scope.agree = " ";
        $scope.boxShowAaxAa = !$scope.boxShowAaxAa;
        $scope.boxShowAaxaa = false;
        $scope.boxShowLethalgenes = false;
        $scope.boxShowA1A2xA1A2 = false;
        $scope.boxShowA1A2xA1A3 = false;
        $scope.boxShowA1A2xA3A4 = false;
    }
    $scope.showBoxLethalgenes = function () {
        $scope.buttonStyleAaxaa = "button-pressed";
        $scope.buttonStyleAaxAa = "button-pressed";
        $scope.buttonStyleLGenes = "button-outline";
        $scope.buttonStyleA1A2xA1A2 = "button-pressed";
        $scope.buttonStyleA1A2xA1A3 = "button-pressed";
        $scope.buttonStyleA1A2xA3A4 = "button-pressed";
        $scope.agree = " ";
        $scope.boxShowLethalgenes = !$scope.boxShowLethalgenes;
        $scope.boxShowAaxaa = false;
        $scope.boxShowAaxAa = false;
        $scope.boxShowA1A2xA1A2 = false;
        $scope.boxShowA1A2xA1A3 = false;
        $scope.boxShowA1A2xA3A4 = false;
    }
    $scope.showBoxA1A2xA1A2 = function () {
        $scope.buttonStyleAaxaa = "button-pressed";
        $scope.buttonStyleAaxAa = "button-pressed";
        $scope.buttonStyleLGenes = "button-pressed";
        $scope.buttonStyleA1A2xA1A2 = "button-outline";
        $scope.buttonStyleA1A2xA1A3 = "button-pressed";
        $scope.buttonStyleA1A2xA3A4 = "button-pressed";

        $scope.agree = " ";
        $scope.boxShowA1A2xA1A2 = !$scope.boxShowA1A2xA1A2;
        $scope.boxShowAaxaa = false;
        $scope.boxShowAaxAa = false;
        $scope.boxShowLethalgenes = false;
        $scope.boxShowA1A2xA1A3 = false;
        $scope.boxShowA1A2xA3A4 = false;
    }
    $scope.showBoxA1A2xA1A3 = function () {
        $scope.buttonStyleAaxaa = "button-pressed";
        $scope.buttonStyleAaxAa = "button-pressed";
        $scope.buttonStyleLGenes = "button-pressed";
        $scope.buttonStyleA1A2xA1A2 = "button-pressed";
        $scope.buttonStyleA1A2xA1A3 = "button-outline";
        $scope.buttonStyleA1A2xA3A4 = "button-pressed";        $scope.agree = " ";
        $scope.boxShowA1A2xA1A3 = !$scope.boxShowA1A2xA1A3;
        $scope.boxShowAaxaa = false;
        $scope.boxShowAaxAa = false;
        $scope.boxShowLethalgenes = false;
        $scope.boxShowA1A2xA1A2 = false;
        $scope.boxShowA1A2xA3A4 = false;
    }
    $scope.showBoxA1A2xA3A4 = function () {
        $scope.buttonStyleAaxaa = "button-pressed";
        $scope.buttonStyleAaxAa = "button-pressed";
        $scope.buttonStyleLGenes = "button-pressed";
        $scope.buttonStyleA1A2xA1A2 = "button-pressed";
        $scope.buttonStyleA1A2xA1A3 = "button-pressed";
        $scope.buttonStyleA1A2xA3A4 = "button-outline"; 
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
                state_exercise.fails = state_exercise.fails + 1;
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
                state_exercise.fails = state_exercise.fails + 1;
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
               state_exercise.fails = state_exercise.fails + 1;
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
                state_exercise.fails = state_exercise.fails + 1;
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
                    state_exercise.fails = state_exercise.fails + 1;
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
                    state_exercise.fails = state_exercise.fails + 1;
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
    $scope.show = $rootScope.show_test;

    if($scope.show){
         $scope.index = 0;
    }else{
        $scope.index = $rootScope.index.test;
    } 
 
    $scope.lockSlide = function () 
    {
      if($scope.show){
         $ionicSlideBoxDelegate.enableSlide( true );
      }else{
        $ionicSlideBoxDelegate.enableSlide( false );
      } 
        
    }

  $scope.slideHasChanged = function (index) 
    {
      $scope.index = index;
      $scope.listaOpcionesPregunta = Test.getOpcionesTest($scope.listaPreguntas[$scope.index].id);
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
        if($scope.show){

            return !$scope.show;

        }else{
    
        if(!$scope.used){


            return true;
        
        }else{

            return !state;
        }}

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
.controller("ScoreTestCtrl", function($rootScope, $scope, $state,  $timeout) {
    $scope.title = "Score";
    $scope.aciertos = $rootScope.results.test.aciertos ;
    $scope.fallos = $rootScope.results.test.fallos;
 
     $scope.showTest = function(){        
         $timeout(function(){ $state.go('home.categories.3');}, 15)
    }
    
})

/***************************************REGISTER************************************************/

.controller("RegisterCtrl", function($rootScope, $state, $http, $scope, Register, Post_Dates,$ionicHistory) {

    $scope.title = "Sign up";     
    $scope.message;
    $scope.show_spin=false;
    var message;
    var ok = false;
    var name;
    var check_credentials = function (name, email, pass) {

        request = Post_Dates.register(name, email, pass);
        request.success(function (data) {
        console.log(data.answer)
        if(data.answer=="failed"){
             message = "Your data is incorrect ";
        }else{
              ok = true;
              message = "You have registered successfully with your email ";  
        }  
        
    })

     .finally(function () {
                 
             $scope.show_spin=false;
             $scope.message = message;
              if(ok){
               $rootScope.user=email;
               $rootScope.name=name;  
               $rootScope.pass=pass;
           
              if(ok){
                 
                Register.signUpUser($scope.authorization.name,$scope.authorization.nick,$scope.authorization.pass);
                } 
              
              $ionicHistory.nextViewOptions({disableBack: true});
              $ionicHistory.clearCache().then(function(){ $state.go('home') })
        }
    });
   
    }
   


     $scope.authorization = {
        name: '',
        nick: '',
        pass: ''   
     };
    
    $scope.signIn = function(form) {
      
        if(form.$valid) {
             check_credentials($scope.authorization.name,$scope.authorization.nick,$scope.authorization.pass);
             $scope.show_spin=true;
        }
             
        };

         
   

})

.controller("LoginCtrl", function($rootScope, $state, Post_Dates, $scope, Register, $ionicHistory) {

    $scope.title = "Log In";
    $scope.show_form = angular.isUndefined($rootScope.user);        
    $scope.myform;
    $scope.message;
    $scope.show_spin=false;
    var message;
    var ok = false;
    var name;
    var check_credentials = function (email, pass) {

        request = Post_Dates.login(email, pass);
        request.success(function (data) {
        console.log(data)
        if(data.answer=="failed"){
             message = "Your login is incorrect ";
        }else{
              ok = true;
              name = data.answer;
              message = "You have login successfully with email ";  
        }  
        
    })

     .finally(function () {
                 
             $scope.show_spin=false;
             $scope.message = message;
              if(ok){
               $rootScope.user=email;
               $rootScope.name=name;  
               $rootScope.pass=pass;
                    if($scope.show_form){
                    Register.signUpUser($rootScope.name, $rootScope.user, $rootScope.pass);
                  }
              $ionicHistory.nextViewOptions({disableBack: true});
              $ionicHistory.clearCache().then(function(){ $state.go('home') })
        }
    });
   
    }
   
    if(!$scope.show_form){

        console.log($rootScope.pass);

        check_credentials($rootScope.user, $rootScope.pass);

    }else{

        $scope.authorization = {
            name: '',
            nick: '',
            pass: ''   
        };
    
    $scope.logIn = function(form) {
      
        if(form.$valid) {
                
             check_credentials($scope.authorization.nick,$scope.authorization.pass);
             $scope.show_spin=true;
        }
             
        };

    }      
})

.controller("BackCtrl", function($scope, $ionicHistory, $state) {
    $scope.showHomeButton = false;
    if(!$state.is('home-tab')) {
        $scope.showHomeButton = true;
    }

    $scope.myGoBack = function() {
        $ionicHistory.goBack();
    
    }
    $scope.goHome = function(){

        $state.go('home');
    }
})