
var db = null;

angular.module('starter.services',[])

.factory('DB', function($cordovaSQLite, INFO_DB, $q) {
 
  db = $cordovaSQLite.openDB(INFO_DB.NAME);
 
  var create = function(){
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `info-db` ('id' TEXT NOT NULL, 'version'INTEGER NOT NULL,PRIMARY KEY(id));)");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `usuario` (`nick`  TEXT NOT NULL,`nombre`  TEXT NOT NULL,`pass`  TEXT NOT NULL, `foto`  BLOB, PRIMARY KEY(nick));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `tieneopciones` (`idTest`  INTEGER NOT NULL, `idOpcionesTest`  INTEGER NOT NULL, `esCorrecto`  INTEGER NOT NULL, PRIMARY KEY(idTest,idOpcionesTest), FOREIGN KEY(`idTest`) REFERENCES test(id), FOREIGN KEY(`idOpcionesTest`) REFERENCES opcionesest(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS 'test' (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`enunciado` TEXT NOT NULL,`numero`  INTEGER NOT NULL,`idTema`  INTEGER NOT NULL, FOREIGN KEY(`idTema`) REFERENCES `tema`(`id`));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS'teoria' (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`titulo`  TEXT NOT NULL,`texto` TEXT NOT NULL,`idTema`  INTEGER NOT NULL, FOREIGN KEY(`idTema`) REFERENCES tema(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS'tema' (`id`  INTEGER NOT NULL,`name`  TEXT,  PRIMARY KEY(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`resuelve-test` (`nickUsuario` INTEGER NOT NULL,`idTest`  TEXT  NOT NULL,`esAcierto` INTEGER NOT NULL, PRIMARY KEY(nickUsuario,idTest),FOREIGN KEY(`nickUsuario`) REFERENCES usuario(nick), FOREIGN KEY(`idTest`) REFERENCES test(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`opcionestest` (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nombreOp`  TEXT NOT NULL);");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`nivel` (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nNivel`  INTEGER NOT NULL);");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`img-test` (`idImg` INTEGER NOT NULL,`idTest`  INTEGER,PRIMARY KEY(idImg),FOREIGN KEY(`idImg`) REFERENCES imagen(id),FOREIGN KEY(`idTest`) REFERENCES test(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`img-teoria` (`idImg` INTEGER NOT NULL,`idTeoria`  INTEGER NOT NULL,PRIMARY KEY(idImg,idTeoria),FOREIGN KEY(`idImg`) REFERENCES imagen(id),FOREIGN KEY(`idTeoria`) REFERENCES teoria(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`img-ejer` (`idImg` INTEGER NOT NULL,`idEj`  INTEGER NOT NULL,PRIMARY KEY(idImg,idEj),FOREIGN KEY(`idImg`) REFERENCES imagen(id),FOREIGN KEY(`idEj`) REFERENCES ejercicio(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`imagen` (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`imagen`  BLOB);");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS'hace-ejer' (`nickUsuario` TEXT NOT NULL,`idEjer` INTEGER NOT NULL,`numIntentos` INTEGER,`numFallos` INTEGER, PRIMARY KEY(nickUsuario,idEjer),FOREIGN KEY(`nickUsuario`) REFERENCES usuario(nick),FOREIGN KEY(`idEjer`) REFERENCES ejercicio(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS'ejercicio' (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`enunciado` TEXT NOT NULL,`nivel` INTEGER NOT NULL,`idTema`  INTEGER,FOREIGN KEY(`nivel`) REFERENCES nivel(id),FOREIGN KEY(`idTema`) REFERENCES `tema`(`id`));");
      
  };

  var insert = function(){
      
       $cordovaSQLite.execute(db, "INSERT INTO 'info-db' VALUES(?, ?)", [INFO_DB.NAME, INFO_DB.VERSION]);

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

      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (1,'Pure line','A pure line is populations that show no variation in the character or trait studied. All offspring produced slfing a individual or crossing individuals of the same pure line show the same form of the character or trait studied',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (2,'Variability','Different pure lines can show different forms of the same character or trait. If we studied the colour of the flower, one pure line can has purple flowers and other pure line can has white. The different character forms or different character variants are also called Phenotypes.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (3,'Locus/Loci','A locus is a specific place of a chromosome. Each gene is located in a specific locus. Different genes are situated in different loci or different places of the chromosomes. In a diploid specie with two genomen, one genome from the paternal parental and other from the maternal parental, all the genes are in two copies, one copy came from the father and the other copy from the mother.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (4,'Phenotype','The phenotype is the form showed by a character or a trait in a individual. The phenotype is also the detectable expression or manifestation of a genotype in a specific environment. All the individuals of a pure line have the same phenotype.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (5,'Gene','A segment of DNA or DNA sequence with information for oe or various polypeptides or for one or several RNAs or with a regulatory function. A gene is the fundamental unit of heredity, is the functional unit of heredity. The genes carry the information from one generation to the next.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (6,'Allele','The different forms of a gene observed at a single locus. Gene and allele are synonymous terms. The alleles are the different DNA sequences observed at a single locus. The two alleles observed in the same place or locus in the two homologous chromosomes are identical in a homozygote (AA or aa). However, in a heterozygote (Aa) the alleles observed in the same locus in both homologous chromosomes are different.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (7,'Genotype','The genetic composition of a individual or a cell.  The genetic composition is determined by the allelic constitution for a gene or set of genes. The homozygotes (AA or aa) have two identical alleles in the same locus in both homologous chromosomes, whereas the heterozygotes (Aa) have two different alleles in the same locus in both homologous chromosomes. All the individuals of a pure line are homozygotes at the locus that control the character studied.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (8,'Mendel''s First Law','Law of Uniformity: The individuals of the first filial generation (F1) or hybrids (Aa) between two pure lines (AA x aa) that are different for one character are uniform and showed the same phenotype. The phenotype observed in F1 plants is the same obseved in a parental line (pure line) and is named the dominant phenotype. The phenotype of the other pure line (other parental), not observed in F1 plants, is named the recessive phenotype.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (9,'Interaction between alleles of the same locus','The interactions between the alleles of the same locus can be of different types: Complete dominance, Incomplete Dominance, Codominance and New Character. The type of interaction is established taking into account the phenotype of the heterozygotes (Aa) or the hybrids (F1) in comparison with the phenotypes of the parental lines (pure lines). All the characters analyzed by Mendel showed Complete Dominance.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (10,'Complete Dominance','The phenotype of the heterozygote is the same of a parental line or pure line. If a parental has purple flowers and the other parental has white flowers, the hybrid or F1 has purple flowers. The purple color is dominant.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (11,'Incomplete Dominance','The phenotype of the heterozygote (F1) is intermediate between the phenotypes of the parental pure lines. One parental line has red flowers, other parental lines has white flowers and the heterozygote has rose flowers',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (12,'Codominance','The two alleles of the heterozygote or hybrid (F1) between two pure lines are expressed simultaneously.  The human ABO blood group alleles show multiple allelism. The alleles A and B are codominants and they are expressed simultaneously in the persons of blood group AB. The persons AB have the antigens A and B in the surface of the red cell membrane. ',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (13,'New character','The phenotype of the heterozygote (Aa) or hybrid (F1) between two pure lines is not intermediate between the phenotypes of the parental lines and is not coincident with the phenotypes of the parental lines. The phenotype of the heterozygote (Aa) is new.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (14,'Mendel''s Second Law','Law of Segregation: When a heterozygote (Aa) produces their gametes the two members of a gene pair (the two alleles) segregate from each other. Therefore, half the gametes (1/2) carry the allele A and the other half of the gametes (1/2) carry the allele a.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (15,'F1 generation','The first filial generation, obtained by crossing two parental pure lines.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (16,'F2 generation','The second filial generation, obtained by selfing the F1 or hybrid between two pure lines or intercrossing the F1.',1);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (17,'Testcross','A cross of an individual of unknown genotype or a heterozygote (or a multiple heterozygote) to an individual homozygote recessive or a tester individual. Also is the offspring of a cross of the F1 between two pure lines and the recessive parental pure line.',1);");

      $cordovaSQLite.execute(db, "INSERT INTO `tema` VALUES (1,'One Locus');");
      $cordovaSQLite.execute(db, "INSERT INTO `tema` VALUES (2,'Two Loci');");

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
      
  };


 return{
   
   
    create: function(){

    var ok=false;
    $cordovaSQLite.execute(db, "SELECT * FROM 'info-db' where version =?", [INFO_DB.VERSION]).then(function(res){
    if(res.rows.length > 0){ console.log("solo insertamos");insert();}},
    function (err) {
      //si no exite creamos
      console.log("creamos e insertamos");
      create();
      insert();
    });
    
     return ok;
     }

  };
})
.factory('User', function($cordovaSQLite, $rootScope) {

   return {
    /*Precondicion: en cada dispostivo hay un solo usuario*/
    load: function(){

    $cordovaSQLite.execute(db, "SELECT nick FROM 'usuario'", []).then(function(res){
    if(res.rows.length > 0)
    {
      $rootScope.user=res.rows.item(0).nick  
      console.log($rootScope.user); 
    }});
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

 .factory('NivelEjercicio', function($cordovaSQLite, $rootScope ) {
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

      

    var query ="INSERT INTO 'hace-ejer' VALUES(?, ?, ?, ?)";
    $cordovaSQLite.execute(db, query, [$rootScope.user, estado.idEjer, estado.numIntentos, estado.numFallos]);
    return true;

    }

  };
})
.factory('Test', function($cordovaSQLite, $rootScope ) {
 
  

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

         var query = "INSERT INTO 'resuelve-test'(nickUsuario, idTest, esAcierto) VALUES(?, ?, ?)";
         $cordovaSQLite.execute(db, query, [$rootScope.user, estado.idTest, estado.esCorrecto]);

          return true;
        
     },
     
     loadIndex: function(idTema){
         var i;
         var query = "SELECT max(numero) as maxi FROM test, 'resuelve-test' WHERE idTest = id AND test.idTema = ?"
         $cordovaSQLite.execute(db, query, [idTema]).then(function(res){ //cambiar lo del usuario pepito
           i = res.rows.item(0).maxi;
        if(i != null){
        
         $rootScope.index = i;
       }else{

          $rootScope.index = 0;
         }
        })
            return true;        
    },

      getAciertos: function(idTema) {


        var score = [];

        var queryAciertos ="SELECT count (idTest) As aciertos FROM test, 'resuelve-test'  WHERE idTest = id AND esAcierto = 1 AND idTema = ?";

        $cordovaSQLite.execute(db, queryAciertos, [idTema]).then(function(res){

       
            if(res.rows.length > 0){

                for(var i = 0; i<res.rows.length ; i++){
                    score.push({ac: res.rows.item(i).aciertos});
                }

            }else{
                score.push({ac:0});

                  //  console.log(res.rows.item(i).aciertos);
                    score.push({aciertos: res.rows.item(i).aciertos});
                }

        })

        console.log("aciertos: " + score);
        return score;

    },
      
    getFallos: function(idTema) {

        var score = [];
        var queryFallos ="SELECT count (idTest) As fallos FROM test, 'resuelve-test'  WHERE idTest = id AND esAcierto = 0 AND idTema = ?";
     
        $cordovaSQLite.execute(db, queryFallos, [idTema]).then(function(res){
       
            if(res.rows.length > 0){

                for(var i = 0; i<res.rows.length ; i++){
                    score.push({fa: res.rows.item(i).fallos});
                    
                }

            }else{
                score = 0;
                //console.log("Not found results");
            }

        })        
        console.log("fallos: " + score);
        return score;

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