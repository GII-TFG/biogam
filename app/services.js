var db = null;

angular.module('starter.services',[])

.factory('DB', function($cordovaSQLite, INFO_DB, $q) {
 
  db = $cordovaSQLite.openDB(INFO_DB.NAME, 0);
 
  var create = function(){
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `info-db` ('id' TEXT NOT NULL, 'version'INTEGER NOT NULL,PRIMARY KEY(id));)");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `usuario` (`nick`  TEXT NOT NULL,`nombre`  TEXT NOT NULL,`pass`  TEXT NOT NULL, `foto`  TEXT, PRIMARY KEY(nick));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `tieneopciones` (`idTest`  INTEGER NOT NULL, `idOpcionesTest`  INTEGER NOT NULL, `esCorrecto`  INTEGER NOT NULL, PRIMARY KEY(idTest,idOpcionesTest), FOREIGN KEY(`idTest`) REFERENCES test(id), FOREIGN KEY(`idOpcionesTest`) REFERENCES opcionesest(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS 'test' (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`enunciado` TEXT NOT NULL,`numero`  INTEGER NOT NULL,`idTema`  INTEGER NOT NULL, FOREIGN KEY(`idTema`) REFERENCES `tema`(`id`));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS'teoria' (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`titulo`  TEXT NOT NULL,`texto` TEXT NOT NULL,`idTema`  INTEGER NOT NULL, FOREIGN KEY(`idTema`) REFERENCES tema(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS'tema' (`id`  INTEGER NOT NULL,`name`  TEXT,  PRIMARY KEY(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`info-test` (`nickUsuario` INTEGER NOT NULL,`idTest`  TEXT  NOT NULL,`esAcierto` INTEGER NOT NULL, PRIMARY KEY(nickUsuario,idTest),FOREIGN KEY(`nickUsuario`) REFERENCES usuario(nick), FOREIGN KEY(`idTest`) REFERENCES test(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`opcionestest` (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nombreOp`  TEXT NOT NULL);");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`nivel` (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`nNivel`  INTEGER NOT NULL);");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`img-test` (`idImg` INTEGER NOT NULL,`idTest`  INTEGER,PRIMARY KEY(idImg),FOREIGN KEY(`idImg`) REFERENCES imagen(id),FOREIGN KEY(`idTest`) REFERENCES test(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`img-teoria` (`idImg` INTEGER NOT NULL,`idTeoria`  INTEGER NOT NULL,PRIMARY KEY(idImg,idTeoria),FOREIGN KEY(`idImg`) REFERENCES imagen(id),FOREIGN KEY(`idTeoria`) REFERENCES teoria(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`img-ejer` (`idImg` INTEGER NOT NULL,`idEj`  INTEGER NOT NULL,PRIMARY KEY(idImg,idEj),FOREIGN KEY(`idImg`) REFERENCES imagen(id),FOREIGN KEY(`idEj`) REFERENCES ejercicio(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS`imagen` (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`imagen`  TEXT NOT NULL);");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS'info-ejer' (`nickUsuario` TEXT NOT NULL,`idEjer` INTEGER NOT NULL,`numIntentos` INTEGER,`numFallos` INTEGER, PRIMARY KEY(nickUsuario,idEjer),FOREIGN KEY(`nickUsuario`) REFERENCES usuario(nick),FOREIGN KEY(`idEjer`) REFERENCES ejercicio(id));");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS'ejercicio' (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`enunciado` TEXT NOT NULL,`nivel` INTEGER NOT NULL,`idTema`  INTEGER,FOREIGN KEY(`nivel`) REFERENCES nivel(id),FOREIGN KEY(`idTema`) REFERENCES `tema`(`id`));");
      
  };

  var insert = function(){
      
       $cordovaSQLite.execute(db, "INSERT INTO `info-db` VALUES(?, ?)", [INFO_DB.NAME, INFO_DB.VERSION]);
      
      /**Quitar cuando funcione el server**/
      $cordovaSQLite.execute(db, "INSERT INTO `usuario` VALUES ('biogam1@ucm.es', 'biogam1', 'biogam1', '0');");
      /************************************/      
      
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (1,1,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (1,2,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (2,1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (2,2,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (3,1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (3,2,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (4,1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (4,2,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (5,1,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (5,2,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (6,1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (6,2,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (7,1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (7,2,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (8,1,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (8,2,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (9,1,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (9,2,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (10,1,0);");
      $cordovaSQLite.execute(db, "INSERT INTO `tieneopciones` VALUES (10,2,1);");

       /*One Locus*/
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (1,'The expected phenotypic  segregation in the cross Aa x aa is 3/4 A :1/4 a.',1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (2,'The expected genotypic segrgation in the cross Aa x Aa is 1/4 AA : 1/2 Aa : 1/4 aa.',2,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (3,'The alleles A1 and A2 are codominant. The expected phenotypic segregation in a cross A1A2 x A1A2 is 1/4 A1A1 : 1/2 A1A2 : 1/4 A2A2.',3,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (4,'The allele A is dominant and the allele a is recessive (A>a). The expected phenotypic segregation in a cross Aa x Aa is 3/4 A : 1/4 a. ',4,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (5,'In the cross A1A2 x A1A3 the observed segregation was 1/4 A1A1 : 1/4 A1A3 : 1/4 A1A2 : 1/4 A2A3. Therefore the alleles A1 and A2 are codominant and the A3 is recessive.',5,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (6,'In the cross A1A2 x A3A4 the observed segregation was 1/4 A1A3 : 1/4 A2A3 : 1/4 A1A4 : 1/4 A2A4. Therefore, the four different alleles involved in this cross are codominant.',6,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (7,'If A1>A2 , A1>A3 and A2 and A3 are codominant. The expected phenotypic segregation in the cross A1A2 x A1A3 is 3/4 A1 : 1/4 A2A3. ',7,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (8,'The segregation observed in the cross A1A2 x A3A4 was 45 A1A3, 50 A1A4, 47 A2A3 and 51 A2A4. The expected values are 45 A1A3, 50 A1A4, 45 A2A3 and 50 A2A4.',8,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (9,'A pure line with purple flowers is crossed by a pure line with white flowers. The hybrid of F1 had purple flowers, and in the F2 93 purple and 28 white plants were observed. Therefore, white flower is dominant and purple flower is recessive.',9,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (10,'If the genotype of the F1 between two pure lines is identical to the genotype of one parental, there exist dominance of one allele.',10,1);");


      /*Mitosis*/

      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (1,'The expected phenotypic  segregation in the cross Aa x aa is 3/4 A :1/4 a.',1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (2,'The expected genotypic segrgation in the cross Aa x Aa is 1/4 AA : 1/2 Aa : 1/4 aa.',2,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (3,'The alleles A1 and A2 are codominant. The expected phenotypic segregation in a cross A1A2 x A1A2 is 1/4 A1A1 : 1/2 A1A2 : 1/4 A2A2.',3,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (4,'The allele A is dominant and the allele a is recessive (A>a). The expected phenotypic segregation in a cross Aa x Aa is 3/4 A : 1/4 a. ',4,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (5,'In the cross A1A2 x A1A3 the observed segregation was 1/4 A1A1 : 1/4 A1A3 : 1/4 A1A2 : 1/4 A2A3. Therefore the alleles A1 and A2 are codominant and the A3 is recessive.',5,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (6,'In the cross A1A2 x A3A4 the observed segregation was 1/4 A1A3 : 1/4 A2A3 : 1/4 A1A4 : 1/4 A2A4. Therefore, the four different alleles involved in this cross are codominant.',6,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (7,'If A1>A2 , A1>A3 and A2 and A3 are codominant. The expected phenotypic segregation in the cross A1A2 x A1A3 is 3/4 A1 : 1/4 A2A3. ',7,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (8,'The segregation observed in the cross A1A2 x A3A4 was 45 A1A3, 50 A1A4, 47 A2A3 and 51 A2A4. The expected values are 45 A1A3, 50 A1A4, 45 A2A3 and 50 A2A4.',8,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (9,'A pure line with purple flowers is crossed by a pure line with white flowers. The hybrid of F1 had purple flowers, and in the F2 93 purple and 28 white plants were observed. Therefore, white flower is dominant and purple flower is recessive.',9,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `test` VALUES (10,'If the genotype of the F1 between two pure lines is identical to the genotype of one parental, there exist dominance of one allele.',10,1);");


      /*One Locus*/
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

/*Mitosis"*/
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (18,'Ciclo celular','La característica más destacada de las células es su habilidad para reproducirse y dar lugar a otras células.\n Los sucesos que tienen lugar desde el inicio de una división celular hasta el inicio de la siguiente dividsión se conocen con el nombre de Ciclo de división celular o Ciclo celular.',2);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (19,'Fases del ciclo celular','En el Ciclo celular se distinguen habitualmente dos fases, Interfase y Mitosis. A su vez la Interfase se divide en tres períodos: G1, S y G2. Durante el Período S de síntesis se replica el DNA. Cuando una célula se divide da lugar a dos células hijas idénticas que poseen la misma información genética. Para ello la célula madre tiene que repartir de forma equitativa su información genética (sus cromosomas) entre las dos células hijas. Este reparto de cromosomas se lleva a cabo durante la mitosis o cariocinesis. Una vez terminada la mitosis se inicia el reparto del citoplasma, la citocinesis.',2);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (20,'Citocinesis','CITOCINESIS: reparto del citoplasma con sus orgánulos. En vegetales se forma el Fragmoplasto, de dentro hacia afuera. En animales se realiza por estrangulamiento, de fuera hacia dentro.',2);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (21,'Variación en el contenido del ADN','Valor C: es la cantidad de DNA de un gameto. Un gameto tiene un contenido 1C. En un especie como la humana, con dos juegos de cromosomas (diploide), una célula somática posee un juego de cromosomas aportado por el óvulo materno y otro juego aportado por el espermatozoide paterno. Por tanto, las células somáticas, en fase G1, antes de pasar por el período S de síntesis de DNA, tienen 2n cromosomas, un contenido 2C, pero después de S tienen un contenido 4C. Antes de pasar por el período S, los cromosomas están en estado de un sólo cromatidio (o cromátida). Después de pasar por S, los cromosomas se replican y están constituidos por dos cromatidios. Estos dos cromatidios son idénticos y se denominan cromatidios hermanos. Cada cromatidio es una doble hélice de DNA. Antes de pasar por el período S, los cromosomas están en estado de un sólo cromatidio (o cromátida). Después de pasar por S, los cromosomas se replican y están constituidos por dos cromatidios. Estos dos cromatidios son idénticos y se denominan cromatidios hermanos. Cada cromatidio es una doble hélice de DNA. \n Una vez replicados los cromosomas (en el período S), la célula tiene un contenido 4C y entra en Mitosis. Durante Profase (P) y Metafase (M) se mantiene el contenido 4C, pero en Anafase (A) los cromatidios hermanos se separan a polos opuestos, yendo a cada polo 2n cromatidios. Cada polo afanáis tiene un contenido 2C de DNA. Por tanto, en Telofase (T), cada núcleo telofásico tiene un contenido 2C y así permanece la célula hasta el final de la Mitosis y durante la fase G1.',2);");
      $cordovaSQLite.execute(db, "INSERT INTO `teoria` VALUES (22,'Fases de la Mitosis','PROFASE: los cromosomas van compactándose, pasan de estar desespirilizados a condensados. Al final desaparecen la membrana nuclear y el nucleólo.\n PROMETAFASE: comienza la formación del huso acromático, los cromosomas se compactan más, sus centrómeros interaccionan con las fibras del huso y acuden (congresion) a la placa ecuatorial.\n METAFASE: los cromosomas alcanzan la máxima contracción, se sitúan en la placa ecuatorial con los centrómeros orientados y unidos a las fibras del huso.\n ANAFASE TEMPRANA: los cromatidios hermanos inician su separación a polos opuestos.  El aparato mitótico consta del aster que rodea al centriolo (cuando está presente) y del huso.\n ANAFASE: los cromatidos hermanos continúan su separación a polos opuestos gracias a su interacción con las fibras del huso acromático.\n TELOFASE: los cromatidios hermanos alcanzan los polos opuestos, comienzan a descontraerse y se reconstruyen la membrana nuclear y el nucleólo.',2);");
      

      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (1,1);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (2,2);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (3,3);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (4,8);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (5,10);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (6,11);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (7,12);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (8,13);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (9,14);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (10,14);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (11,16);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (14,19);");
     // $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (15,19);");
     // $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (16,19);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (17,21);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (18,21);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (19,22);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (20,22);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (21,22);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (22,22);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (23,22);");
      $cordovaSQLite.execute(db, "INSERT INTO `img-teoria` VALUES (24,22);");


      $cordovaSQLite.execute(db, "INSERT INTO `tema` VALUES (1,'One Locus');");
      $cordovaSQLite.execute(db, "INSERT INTO `tema` VALUES (2,'Mitosis');");

      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (1,'Yes');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (2,'No');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (3,'Interphase');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (4,'Prophase');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (5,'Prometaphase');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (6,'Metaphase');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (7,'Anaphase');");
      $cordovaSQLite.execute(db, "INSERT INTO `opcionestest` VALUES (8,'Telophase');");

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
      
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (1,'lineapura.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (2,'tulipanes1.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (3,'Locus.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (4,'Uniform.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (5,'Dominant.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (6,'RojoRosaBlanco.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (7,'F2codominance.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (8,'CaracterNuevo.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (9,'Segregation.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (10,'Segregation2.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (11,'Fdos.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (12,'CHINormal.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (13,'CHIYates.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (14,'Ciclo.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (15,'Citocinesis1.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (16,'Doscelulas.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (17,'ValorCMitosis.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (18,'CromatidioS2.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (19,'Profase.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (20,'Prometafase.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (21,'Metafase.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (22,'AnafaseTemprana.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (23,'Anafase.png');");
       $cordovaSQLite.execute(db, "INSERT INTO `imagen` VALUES (24,'Telofase.png');");

  };


 return{
   
   
    create: function(){

    var ok=false;
    $cordovaSQLite.execute(db, "SELECT * FROM `info-db` where version =?", [INFO_DB.VERSION]).then(function(res){
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

    $cordovaSQLite.execute(db, "SELECT nick, nombre, pass FROM usuario", []).then(function(res){
    if(res.rows.length > 0)
    {
      $rootScope.user=res.rows.item(0).nick;
       $rootScope.name=res.rows.item(0).nombre;  
        $rootScope.pass=res.rows.item(0).pass;  
    }});
   }
   };
})

.factory('Score_exercises', function() {

   return {
    define_tam: function(nivel){

      var lista = [];

      for(var i =0; i < nivel.size; i++){

        lista.push(nivel.list_exer[i].attempts);
      }

      return lista;   
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

.factory('Theory', function($cordovaSQLite, $rootScope ) {
  
    

  return {
    getTeoriaDeTema: function(idTema) {
    var capsTeoria = [];

    var query ="select titulo, texto , id, idImg from teoria left join 'img-teoria' on teoria.id = 'img-teoria'.idTeoria where idTema=?  UNION ALL select titulo, texto , id, idImg from 'img-teoria' left join teoria on teoria.id = 'img-teoria'.idTeoria where 'img-teoria'.idTeoria is NULL";

    $cordovaSQLite.execute(db, query, [idTema]).then(function(res){

        if(res.rows.length > 0){

          for(var i = 0; i<res.rows.length ; i++){
            capsTeoria.push({titulo: res.rows.item(i).titulo, texto:res.rows.item(i).texto, id:res.rows.item(i).id, idImg:res.rows.item(i).idImg, imagenes: []});
          }

        }else{

           console.log("Not found results");
        }

    })
      return capsTeoria;
    
    },

    getImg: function(idImg,j) {
    
    $rootScope.theory[j].imagenes=[];

    var query ="select imagen from imagen where id =?";

    $cordovaSQLite.execute(db, query, [idImg]).then(function(res){

        if(res.rows.length > 0){

          for(var i = 0; i<res.rows.length ; i++){

            $rootScope.theory[j].imagenes.push({nombre: res.rows.item(i).imagen});
          }

        }else{

          // console.log("Not found results");
        }

    })
      return true;
    
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

 .factory('Exercises', function($cordovaSQLite, $rootScope ) {
  return {
    getTodosLosNiveles: function(temaId) {
    var niveles = [];
    var query ="select nivel, id,numIntentos, numFallos from ejercicio left join 'info-ejer' on ejercicio.id = 'info-ejer'.idEjer where idTema=?  UNION ALL select nivel, id, numIntentos, numFallos from 'info-ejer' left join ejercicio on ejercicio.id = 'info-ejer'.idEjer where 'info-ejer'.idEjer is NULL";
 
    $cordovaSQLite.execute(db, query, [temaId]).then(function(res){

        if(res.rows.length > 0){

          for(var i = 0; i<res.rows.length ; i++){
            niveles.push({level: res.rows.item(i).nivel, id: res.rows.item(i).id,  attempts: res.rows.item(i).numIntentos, fails: res.rows.item(i).numFallos });
            if(niveles[i].attempts==null){
              niveles[i].attempts=0;
            }

            if(niveles[i].fails==null){
              niveles[i].fails=0;
            }
          }

        }else{

           console.log("Not found results");
        }

    })


      return niveles;
    
    },


    get_info_levels: function(exercises) {
      var info=[];
      var list=[];
      var level;
      var j=0;
      var k=0;
      var aux;
      for(var i=0; i<exercises.length; i++){

        if(level != exercises[i].level){ 
          aux =level;      
          level = exercises[i].level
          list.push(exercises[i]);
          
         if(k>0){
          j++;
          info.push({level: aux, size:j, list_exer: list });
          list = [];
          j = 0;

         } 
          k++;


        }else{
          j++;
          list.push(exercises[i]);
          
        }

        if(i == exercises.length-1){

           j++
            list.push(exercises[i]);
            info.push({level: exercises[exercises.length-1].level, size:j, list_exer: list });
        }       
          
     }   

      return info

    },

    by_tema_nivel: function(temaId, nivelId){

      var lista=[];

      var query ="SELECT id, enunciado FROM ejercicio WHERE idTema = ? and nivel = ? ORDER BY id";

        $cordovaSQLite.execute(db, query, [temaId, nivelId]).then(function(res){
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

    store: function(estados){

      if(estados!=null){

        for(var i=0; i<estados.length; i++){
        var lista = []
        console.log("guardamos e inseramos");
        var query ="INSERT OR REPLACE INTO 'info-ejer' VALUES(?, ?, ?, ?)";
        $cordovaSQLite.execute(db, query, [$rootScope.user, estados[i].id, estados[i].attempts, estados[i].fails]);

      }}
    return true;

    },

    get_exercises_level: function(level, lista_exercises_nivel){
    
    var find = false;
    var i=0;

    while((i< lista_exercises_nivel.length) && (find==false)){

      if(lista_exercises_nivel[i].level == level){
        find = true;
      }else{
        i++;
      }
    }

    return lista_exercises_nivel[i].list_exer;

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

         var query = "INSERT INTO 'info-test'(nickUsuario, idTest, esAcierto) VALUES(?, ?, ?)";
         $cordovaSQLite.execute(db, query, [$rootScope.user, estado.idTest, estado.esCorrecto]);

          return true;
        
     },
     
     loadIndex: function(idTema){
         var i;
         var query = "SELECT max(numero) as maxi FROM test, 'info-test' WHERE idTest = id AND test.idTema = ?"
         $cordovaSQLite.execute(db, query, [idTema]).then(function(res){ //cambiar lo del usuario pepito
           i = res.rows.item(0).maxi;
           console.log(i);
        if(i != null){
        
         $rootScope.index.test = i;
       }else{

          $rootScope.index.test = 0;
         }
        })  
    },

      getAciertos: function(idTema) {


        var queryAciertos ="SELECT count (idTest) As aciertos FROM test, 'info-test'  WHERE idTest = id AND esAcierto = 1 AND idTema = ?";

        $cordovaSQLite.execute(db, queryAciertos, [idTema]).then(function(res){

              $rootScope.results.test.aciertos = res.rows.item(0).aciertos;
              console.log("aciertos: " + $rootScope.results.test.aciertos);
             
        })
        return true; 
       },
      
    getFallos: function(idTema) {

        var queryFallos ="SELECT count (idTest) As fallos FROM test, 'info-test'  WHERE idTest = id AND esAcierto = 0 AND idTema = ?";
     
        $cordovaSQLite.execute(db, queryFallos, [idTema]).then(function(res){
          $rootScope.results.test.fallos = res.rows.item(0).fallos;
          console.log("fallos: " + $rootScope.results.test.fallos);
        }) 
        return true;      
    }
      
  };
 })


.factory('Register', function($cordovaSQLite){


  return {
    signUpUser: function(name, nick, pass) { 
       
  
        var query = "INSERT OR REPLACE INTO usuario(nick, nombre, pass) VALUES(?, ?, ?)";
        $cordovaSQLite.execute(db, query, [nick, name, pass]);
        return true;
        }
    };})

.factory('Post_Dates', function($http,$rootScope, CONFIG){


  return {
    login: function(email, pass) { 

        var request = $http({
        method: "post",
        url:   CONFIG.URL+"/dash/index.php/Login/check",
        data: {
            email: email,
            pass:  pass
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

            console.log(request);

    /* Check whether the HTTP Request is successful or not. */
    return request;

    },

     register: function(name, email, pass) { 

        var request = $http({
        method: "post",
        url:  CONFIG.URL+"/dash/index.php/Register",
        data: {
            name: name,
            email: email,
            pass:  pass
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    /* Check whether the HTTP Request is successful or not. */
    return request;

    }
  };
})