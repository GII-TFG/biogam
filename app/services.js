
var db = null;

angular.module('starter.services',[])

.factory('DB', function($cordovaSQLite) {

  return{

    create: function(){
   
     db = $cordovaSQLite.openDB("biogam2db");

      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `usuario` (`nick`  TEXT NOT NULL,`nombre`  TEXT NOT NULL,`pass`  TEXT NOT NULL, `foto`  BLOB, PRIMARY KEY(nick));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `tieneopciones` (`idTest`  INTEGER NOT NULL, `idOpcionesTest`  INTEGER NOT NULL, `esCorrecto`  INTEGER NOT NULL, PRIMARY KEY(idTest,idOpcionesTest), FOREIGN KEY(`idTest`) REFERENCES test(id), FOREIGN KEY(`idOpcionesTest`) REFERENCES opcionesest(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS 'test' (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`enunciado` TEXT NOT NULL,`numero`  INTEGER NOT NULL,`idTema`  INTEGER NOT NULL, FOREIGN KEY(`idTema`) REFERENCES `tema`(`id`));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS'teoria' (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`titulo`  TEXT NOT NULL,`texto` TEXT NOT NULL,`idTema`  INTEGER NOT NULL, FOREIGN KEY(`idTema`) REFERENCES tema(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`resuelve-test` (`nickUsuario` INTEGER NOT NULL,`idTest`  INTEGER NOT NULL,`esAcierto` INTEGER NOT NULL, PRIMARY KEY(nickUsuario,idTest),FOREIGN KEY(`nickUsuario`) REFERENCES usuario(nick), FOREIGN KEY(`idTest`) REFERENCES test(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`opcionestest` (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nombreOp`  TEXT NOT NULL);");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`nivel` (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nNivel`  INTEGER NOT NULL);");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`img-test` (`idImg` INTEGER NOT NULL,`idTest`  INTEGER,PRIMARY KEY(idImg),FOREIGN KEY(`idImg`) REFERENCES imagen(id),FOREIGN KEY(`idTest`) REFERENCES test(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`img-teoria` (`idImg` INTEGER NOT NULL,`idTeoria`  INTEGER NOT NULL,PRIMARY KEY(idImg,idTeoria),FOREIGN KEY(`idImg`) REFERENCES imagen(id),FOREIGN KEY(`idTeoria`) REFERENCES teoria(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`img-ejer` (`idImg` INTEGER NOT NULL,`idEj`  INTEGER NOT NULL,PRIMARY KEY(idImg,idEj),FOREIGN KEY(`idImg`) REFERENCES imagen(id),FOREIGN KEY(`idEj`) REFERENCES ejercicio(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`imagen` (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`imagen`  BLOB);");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS'hace-ejer' (`nickUsuario` TEXT NOT NULL,`idEjer` INTEGER NOT NULL,`numIntentos` INTEGER,`numFallos` INTEGER, PRIMARY KEY(nickUsuario,idEjer),FOREIGN KEY(`nickUsuario`) REFERENCES usuario(nick),FOREIGN KEY(`idEjer`) REFERENCES ejercicio(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS'ejercicio' (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`enunciado` TEXT NOT NULL,`nivel` INTEGER NOT NULL,`idTema`  INTEGER,FOREIGN KEY(`nivel`) REFERENCES nivel(id),FOREIGN KEY(`idTema`) REFERENCES `tema`(`id`));");
      
     return db;
     },

     insert_default_values: function(){
   
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (1,3,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (1,2,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (1,1,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (2,4,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (2,5,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (2,6,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (3,1,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (3,4,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (3,5,1);");

      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (1,'Prueba 1',1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (2,'Prueba 2',2,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (3,'Prueba 3',1,2);");

      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (1,'1Op1');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (2,'1Op2 - Correcta');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (3,'1Op3');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (4,'2Op1 - Correcta');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (5,'2Op2');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (6,'2Op3');");

      $cordovaSQLite.execute(db, "INSERT INTO `nivel` VALUES (1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `nivel` VALUES (2,2)");
      $cordovaSQLite.execute(db, "INSERT INTO `nivel` VALUES (3,3);");

      $cordovaSQLite.execute(db, "INSERT INTO `ejercicio` VALUES (1,'One trait is controlled by only one locus. In a cross beteen a homygote plant and another herterozygote plant, 142 heterozygotes and 121 homozygote plants wew obtained. Is the segregation observed in agreement with expected segregation?',1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `ejercicio` VALUES (2,'The white coat color is controlled by one locus in an animal species. An animal with white coat was crossed by another with black coat and 57 black and 25 white individuals were obtained. Are the two alleles of this locus segregating correctly?',1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `ejercicio` VALUES (3,'One trait is controlled by one locus. The hybrid plants (F1) between two different pure lines were crossed and 325 dominant and 95 recessive plants were obtained. Is the segregation observed in agreement with expected segregation?',1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `ejercicio` VALUES (4,'Two heterozygote black guinea pigs were mated and produced 60 black and 11 white offspring. Are the alleles of this locus segregating correctly?',1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `ejercicio` VALUES (5,'A pure line of plant with disk shaped fruits was crossed with a pure line with long fruits. The F1 had sphere fruits and the F2 showed 124 disk, 260 sphere and 131 long fruits. Ara the alleles of this locus segregation correctly?',1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `ejercicio` VALUES (6,'Two heterozygotes plants with pink petals were crossed and 84 plants with red petals, 200 with pink petals and 60 with white petals were obtained. Are the alleles of this locus segregation correctly?',2,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `ejercicio` VALUES (7,'Four different codominan alleles have been observed at the same locus in different individuals of the same population of an animal species. In the cross os two animals heterozygotes por different alleles 20, 23, 51 and 56 individuals heterozygotes for different alleles were observed. Is the segregation ibserved in this cross in agreement with expected segregation?',2,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `ejercicio` VALUES (8,'Two heterozygotes plants were crossed and 36, 40, 42 and 38 heterozygotes for different alleles were obtained. Is the segregation observed in this cross in agreement with the expected segregation?',2,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `ejercicio` VALUES (9,'In an animal species the blood group RSV is controlled by a locus with three codominant alleles (R, S and V). An animal RS was crossed by another animal RV and 23 RR, 26 RV, 21 SR and 25 SV animals were obtained. Are the alleles R, S and V segregating correctly in this cross?',3,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `ejercicio` VALUES (10,'A plant heterozygote for the alleles C1 and C2 was crossed with another plant heterozygote for the alleles C2 and C3. In this cross 36 C1C2, 11C1C3, 44 C2C2 and 15 C2C3 plants were obtained. Is the segregation observed in this croos in agreement with the expected segregation?',3,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `ejercicio` VALUES (11,'On a ranch in Cazorla, a mutation that gave a platinum coat color was observed in a rabbit. Every time two platinums were crossed, some normal rabbits appeared in the progeny. The repeat matings of the same pair of platinums produced 104 platinum and 48 normal progeny. Sate a hypothesis that accounts from these results',3,1);");
  


     return db;
     }
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
      }else{ console.log("Not found results"); }
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

         var lists = [];
         var checking = [];
         
         var query2 = "SELECT * FROM 'resuelve-test' WHERE nickUsuario = ? AND idTest = ?"
         var query = "INSERT INTO 'resuelve-test'(nickUsuario, idTest, esAcierto) VALUES('pepito', ?, ?)";
         $cordovaSQLite.execute(db, query2, ["pepito", estado.idTest]).then(function(res){ //cambiar lo del usuario pepito
            console.log("pepito" + " " + estado.idTest);
            if(res.rows.length > 0){
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
