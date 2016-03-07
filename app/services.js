
angular.module('starter.services', [])



/*.factory('DB', function($ionicPlatform, $cordovaSQLite){
  

  console.log("services");
    return {

      
      init: function(){

        window.plugins.sqlDB.copy("biogamdb",0, function(){
    
           db = $cordovaSQLite.openDB("biogamdb");

        }, function(error){
          
            db = $cordovaSQLite.openDB("biogamdb");
     
         });
          return db;
      }
    }
})*/
.factory('Temas', function($cordovaSQLite,$rootScope) {


  return {
    all: function() {


      var temas = [];
    
    var query ="SELECT name, id FROM tema";

    $cordovaSQLite.execute($rootScope.db, query).then(function(res){

        if(res.rows.length > 0){

          for(var i = 0; i<res.rows.length ; i++){
            temas.push({name: res.rows.item(i).name, id:res.rows.item(i).id });
          }

        }else{

           console.log("Not found results");
        }

    })


      return temas;
    
    },

     
      get: function(idTema){ //mirar la consola

        var nombreTema=[];

         var query ="SELECT name FROM tema where id = ?";

          $cordovaSQLite.execute($rootScope.db, query, [idTema]).then(function(res){

        if(res.rows.length > 0){

          
            nombreTema.push({name: res.rows.item.name});
     

        }else{

           console.log("Not found results");
        }

    })
      

          return nombreTema;

      }

  };
})

.factory('TeoriaPorTema', function($cordovaSQLite,$rootScope) {
  
      var capsTeoria = [];

  return {
    getTeoriaDeTema: function(idTema) {
    
    var query ="SELECT titulo, texto, id FROM teoria WHERE idTema=?";

    $cordovaSQLite.execute($rootScope.db, query, [idTema]).then(function(res){

        if(res.rows.length > 0){

          for(var i = 0; i<res.rows.length ; i++){
            capsTeoria.push({titulo: res.rows.item(i).titulo, texto:res.rows.item(i).texto, id:res.rows.item(i).id});
          }

        }else{

           console.log("Not found results");
        }

    })


      return capsTeoria;
    
    }
  };
})


.factory('Categorias', function($cordovaSQLite,$rootScope) {
 
  

  return {

      
    getCategoriasTema: function(idTema) {

      var categorias = [];

        var query ="SELECT name, id FROM categoria where temaId = ?";

     
    $cordovaSQLite.execute($rootScope.db, query, [idTema]).then(function(res){

        if(res.rows.length > 0){

          for(var i = 0; i<res.rows.length ; i++){
            categorias.push({titulo: res.rows.item(i).name, id: res.rows.item(i).id });
          }

        }else{ni

           console.log("Not found results");
        }

    })
      return categorias;
    }
  };
})

 .factory('NivelEjercicio', function($cordovaSQLite,$rootScope) {
  


  return {
    getTodosLosNiveles: function(temaId) {
    var niveles = [];
    var query ="SELECT DISTINCT nivel FROM ejercicio WHERE idTema = ?";
 
    $cordovaSQLite.execute($rootScope.db, query, [temaId]).then(function(res){

        if(res.rows.length > 0){

          for(var i = 0; i<res.rows.length ; i++){
            niveles.push({nivel: res.rows.item(i).nivel});
          }

        }else{

           console.log("Not found results");
        }

    })


      return niveles;
    
    },

    byTema: function(temaId, nivelId){

      var lista=[];

      var query ="SELECT id, enunciado FROM ejercicio WHERE idTema = ? and nivel = ?";

        $cordovaSQLite.execute($rootScope.db, query, [temaId, nivelId]).then(function(res){
        console.log(res.rows.length );
        if(res.rows.length > 0){

          for(var i = 0; i<res.rows.length ; i++){
            lista.push({ejerId: res.rows.item(i).id, enunciado: res.rows.item(i).enunciado });
          }

          

        }else{

           console.log("Not found results");
        }

    })

          return lista;

    }
  };
})

.factory('Test', function($cordovaSQLite,$rootScope) {
 
  

  return {

      
    getPreguntasTest: function(idTema) {

      var pregTest = [];

        var query ="SELECT enunciado, id, numero FROM test WHERE idTema = ? ORDER BY numero";

       
        
        $cordovaSQLite.execute($rootScope.db, query, [idTema]).then(function(res){
            
             console.log(res.rows.length);

        if(res.rows.length > 0){

          for(var i = 0; i<res.rows.length ; i++){
            pregTest.push({enunciado: res.rows.item(i).enunciado, id: res.rows.item(i).id, numero: res.rows.item(i).numero});
          }

        }else{

           console.log("Not found results");
        }

    })
      return pregTest;
    }, 
      
     getOpcionesTest: function(idTest) {

      var getOpsTest = [];

        var query ="SELECT esCorrecto, nombreOp, opcionestest.id FROM test, tieneopciones, opcionestest WHERE test.id = tieneopciones.idTest AND opcionestest.id = tieneopciones.idOpcionesTest AND test.id = ?";

     
        $cordovaSQLite.execute($rootScope.db, query, [idTest]).then(function(res){

        if(res.rows.length > 0){

          for(var i = 0; i<res.rows.length ; i++){
            getOpsTest.push({esCorrecto: res.rows.item(i).esCorrecto, nombreOp: res.rows.item(i).nombreOp, id: res.rows.item(i).id});
          }

        }else{

           console.log("Not found results");
        }

    })
      return getOpsTest;
    } 
      
  };
 })