
var db = null;

angular.module('starter.services', ['starter.initDB'])

.factory('DB', function($cordovaSQLite, InitDB) {

  return{

    init: function(){
     db=null;

     db = $cordovaSQLite.openDB("biogam2db");

     db =   InitDB.allTransactions(db);

     return db;
     }/*,


    open: function(){
     db=null;
     db = $cordovaSQLite.openDB("biogam2db");
    
     return db;
     }*/
  };
})

.factory('Temas', function($cordovaSQLite ) {


  return {
    all: function() {


      var temas = [];
    
    var query ="SELECT name, id FROM tema";

    $cordovaSQLite.execute(db, query).then(function(res){

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

          $cordovaSQLite.execute(db, query, [idTema]).then(function(res){

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

.factory('TeoriaPorTema', function($cordovaSQLite ) {
  
      var capsTeoria = [];

  return {
    getTeoriaDeTema: function(idTema) {
    
    var query ="SELECT titulo, texto, id FROM teoria WHERE idTema=?";

    $cordovaSQLite.execute(db, query, [idTema]).then(function(res){

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


.factory('Categorias', function($cordovaSQLite ) {
 
  

  return {

      
    getCategoriasTema: function(idTema) {

        var categorias = [];

        var queryTeoria ="SELECT * FROM teoria where idTema = ?";
        var queryEjer ="SELECT * FROM ejercicio where idTema = ?";
        var queryTest ="SELECT * FROM test where idTema = ?";
     
        $cordovaSQLite.execute(db, queryTeoria, [idTema]).then(function(res){

            if(res.rows.length > 0){

                categorias.push({id: 1, titulo: "Teoria"});
              

            }else{

               console.log("Not found results");
            }

        })
        
        $cordovaSQLite.execute(db, queryEjer, [idTema]).then(function(res){

            if(res.rows.length > 0){

                categorias.push({id: 2, titulo: "Ejercicio"});
              

            }else{

               console.log("Not found results");
            }

        })
        
        $cordovaSQLite.execute(db, queryTeoria, [idTema]).then(function(res){

            if(res.rows.length > 0){

                categorias.push({id: 3, titulo: "Test"});
              

            }else{

               console.log("Not found results");
            }

        })
        
      return categorias;
    }
  };
})

 .factory('NivelEjercicio', function($cordovaSQLite ) {
  


  return {
    getTodosLosNiveles: function(temaId) {
    var niveles = [];
    var query ="SELECT DISTINCT nivel FROM ejercicio WHERE idTema = ?";
 
    $cordovaSQLite.execute(db, query, [temaId]).then(function(res){

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

        $cordovaSQLite.execute(db, query, [temaId, nivelId]).then(function(res){
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

    },

    storeEjercicio: function(estado){

      

      var query ="INSERT INTO 'hace-ejer' VALUES('pepito', ?, ?, ?)";

        $cordovaSQLite.execute(db, query, [estado.idEjer, estado.numIntentos, estado.numFallos]).then(function(res){
       
        })

          return true;

    }

  };
})

.factory('Test', function($cordovaSQLite ) {
 
  

  return {

      
    getPreguntasTest: function(idTema) {

      var pregTest = [];

        var query1 ="SELECT enunciado, id, numero FROM test WHERE idTema = ? ORDER BY numero";

               
        $cordovaSQLite.execute(db, query1, [idTema]).then(function(res){
            
        
        if(res.rows.length > 0){

           for(var i = 0; i<res.rows.length ; i++){

            pregTest.push({enunciado: res.rows.item(i).enunciado, id: res.rows.item(i).id, numero: res.rows.item(i).numero});
         
          
         }

          

        }else{

           console.log("Not found results");
        }

    })

     /* var getOpsTest = [];

        var query ="SELECT esCorrecto, nombreOp, opcionestest.id FROM test, tieneopciones, opcionestest WHERE test.id = tieneopciones.idTest AND opcionestest.id = tieneopciones.idOpcionesTest AND test.id = ?";
        console.log( pregTest[0].id);
     
        $cordovaSQLite.execute(db, query, ["1"]).then(function(res){

          for(var i = 0; i<res.rows.length ; i++){
        
            getOpsTest.push({esCorrecto: res.rows.item(i).esCorrecto, nombreOp: res.rows.item(i).nombreOp, id: res.rows.item(i).id});
          }

       })*/

      
      return pregTest;
    }, 
      




     getOpcionesTest: function(idTest) {

      var getOpsTest = [];

        var query ="SELECT esCorrecto, nombreOp, opcionestest.id FROM test, tieneopciones, opcionestest WHERE test.id = tieneopciones.idTest AND opcionestest.id = tieneopciones.idOpcionesTest AND test.id = ?";

     
        $cordovaSQLite.execute(db, query, [idTest]).then(function(res){

       
            if(res.rows.length > 0){

                for(var i = 0; i<res.rows.length ; i++){
                    getOpsTest.push({esCorrecto: res.rows.item(i).esCorrecto, nombreOp: res.rows.item(i).nombreOp, id: res.rows.item(i).id});
                }

            }else{

                console.log("Not found results");
            }

        })
        return getOpsTest;

    },
    
     storePregTest: function(estado){

<<<<<<< HEAD
      var lists = [];
=======
         var lists = [];
         var checking = [];
         
         var query2 = "SELECT * FROM 'resuelve-test' WHERE nickUsuario = ? AND idTest = ?"
         var query = "INSERT INTO 'resuelve-test'(nickUsuario, idTest, esAcierto) VALUES('pepito', ?, ?)";
         $cordovaSQLite.execute(db, query2, ["pepito", estado.idTest]).then(function(res){ //cambiar lo del usuario pepito
            console.log("pepito" + " " + estado.idTest);
            if(res.rows.length > 0){
>>>>>>> origin

                console.log("Este test ya ha sido realizado por el alumno");

            }else{
                console.log("No hecho");
               
                $cordovaSQLite.execute(db, query, [estado.idTest, estado.esCorrecto]).then(function(res){
                    lists.push({nickUsuario: "pepito", idTest: estado.idTest, esAcierto: estado.esCorrecto});
                })
         
                return true;
            }

        })
         
         
        /* 
         var query ="INSERT INTO 'resuelve-test'(nickUsuario, idTest, esAcierto) VALUES('pepito', ?, ?)";

         $cordovaSQLite.execute(db, query, [estado.idTest, estado.esCorrecto]).then(function(res){
            lists.push({nickUsuario: "pepito", idTest: estado.idTest, esAcierto: estado.esCorrecto});
         })
         
         return true;
         */

     }
      
  };
 })


.factory('Register', function($cordovaSQLite){


  return {
    signUpUser: function(name, nick, pass) { 
       
        var lists = [];
        var checking = [];

        var query2 = "SELECT * FROM usuario WHERE nick = ?"
        var query = "INSERT INTO usuario(nick, nombre, pass) VALUES(?, ?, ?)";
        $cordovaSQLite.execute(db, query2, [nick]).then(function(res){ 
            if(res.rows.length > 0){

                console.log("El usuario ya existe");

            }else{
                console.log("Registrado!");

                $cordovaSQLite.execute(db, query, [nick, name, pass]).then(function(res){
                    lists.push({nick: nick, nombre: name, pass: pass});
                })

                return true;
            }

        })

    }
  };
})
