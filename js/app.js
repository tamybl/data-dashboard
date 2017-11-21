// Detectar sede seleccionada
// Variables Globales: sede, generacion, generaciones en arreglo y numero de generaciones.
var sede = '';
var sedeFullname = '';
var generationSelected = '';
var arrayGen = [];
var number = '';
var times = 0;
var newGen = '';
var photo = [];

// Funcion retorna value de la opcion y lo almacena como sede
function country (optionSelected) {
	sede = optionSelected;
	if (sede == "AQP") {
		sedeFullname = 'AREQUIPA';
	}
	if (sede == "LIM") {
		sedeFullname = 'LIMA PERÚ';
	}
	if (sede == "SCL") {
		sedeFullname = 'SANTIAGO DE CHILE';
	}
	if (sede == "CDMX") {
		sedeFullname = 'DISTRITO FEDERAL DE MÉXICO';
	}
	stats(sede);
}

function stats () {
	document.getElementById('home').style.display = 'none';
	// BUSCAR ULTIMA GENERACION: Obtiene los nombres de las generaciones en un arreglo y toma la ultima (mas reciente)
	// Si es la primera vez que ejecuta stats
	if (times == 0) {
	arrayGen = Object.keys(data[sede]);
	number = arrayGen.length - 1;
	generationSelected = arrayGen[number];
	}
	else { // De la segunda en adelante
		generationSelected = newGen;
	}
	times++;
	// 	MENU LOCAL
	var boxTitle = document.getElementById('box-title');
	boxTitle.removeChild(document.getElementById('welcome'));
	var menuGeneration = document.createElement('div');
	menuGeneration.setAttribute('id', 'welcome');
	menuGeneration.setAttribute('class', 'welcome');
	menuGeneration.innerHTML = '<h1>'+sedeFullname + ' | ' + generationSelected + '</h1> <a href="#" id="overviewlink">OVERVIEW</a> <a href="#" id="studentslink">STUDENTS</a> <a href="#" id="teacherslink">TEACHERS</a>';
	boxTitle.appendChild(menuGeneration);

	// SELECCION DE GENERACIONES
	var selectGen = document.createElement('select');
	selectGen.setAttribute('id', 'new-result');
	selectGen.setAttribute('onchange', 'newResult(this.value)');
	var optionGen = document.createElement('option');
	optionGen.setAttribute('value', '0');
	var text = document.createTextNode('Selecciona otra generación');
	optionGen.appendChild(text);
	selectGen.appendChild(optionGen);
	for (var j = 0; j < arrayGen.length; j++) {
		optionGen = document.createElement('option');
		optionGen.setAttribute('value', arrayGen[j]);
		text = document.createTextNode(sedeFullname + ' ' + arrayGen[j]);
		optionGen.appendChild(text);
		selectGen.appendChild(optionGen);
	}
	menuGeneration.appendChild(selectGen); 


	// SECCION ESTADISTICAS 
	var statsSection = document.createElement('div');
	statsSection.setAttribute('id', 'stats');
	statsSection.setAttribute('class', 'principal');
	var contDropout = 0;
	var contAchievement = 0;
	//var alumnsActive = 0;
	var contTech = 0;
	var contHse = 0;
	var promTech = [];
	var promHse = [];
	var a = 0;
	for (var k = 0; k < data[sede][generationSelected].students.length; k++) {
		if(data[sede][generationSelected].students[k].active == false) {
			contDropout++;
		}
		if(data[sede][generationSelected].students[k].active == true) {
			var sumTech = 0;
			var sumHse = 0;
			for (var l = 0; l < data[sede][generationSelected].students[k].sprints.length; l++) { // Ciclo suma puntaje total sprints alumna en tech y hse
				sumTech += data[sede][generationSelected].students[k].sprints[l].score.tech;
				sumHse += data[sede][generationSelected].students[k].sprints[l].score.hse;
				
			}
			// Se calcula promedio
			promTech[a] = sumTech/data[sede][generationSelected].students[k].sprints.length;
			promHse[a] = sumHse/data[sede][generationSelected].students[k].sprints.length;
			// Se comprueba si alumna comple condiciones promedio
			if (promHse[a] >= 840 && promTech[a] >= 1260) {
						contAchievement++; 
				}
			if (promTech[a] >= 1260) {
						contTech++;
						
				}
			if (promHse[a] >= 840) {
						contHse++;
			}
			a++;
		}
	}
	console.log(promHse);
	var dropout = ((contDropout/data[sede][generationSelected].students.length)*100).toFixed(1);
	var achievement = ((contAchievement/data[sede][generationSelected].students.length)*100).toFixed(1);
	// Net Promoter Score
	var totalDetractors = 0;
	var totalPassive = 0;
	var totalPromoters = 0;
	var totalSupera = 0;
	var totalCumple = 0;
	for (var m = 0; m < data[sede][generationSelected].ratings.length; m++) {
		totalDetractors += data[sede][generationSelected].ratings[m].nps.detractors; 
		totalPassive += data[sede][generationSelected].ratings[m].nps.passive;
		totalPromoters += data[sede][generationSelected].ratings[m].nps.promoters;
		// Supera la meta
		// * Ver como generar options y desplegar toda la info modificando display
		/* totalSupera += data[sede][generationSelected].ratings[m].student.supera;
		totalCumple += data[sede][generationSelected].ratings[m].student.cumple; */
	}
	var detractors = ((totalDetractors/data[sede][generationSelected].ratings.length)/100 * 100).toFixed(1); 
	var passive = ((totalPassive/data[sede][generationSelected].ratings.length)/100 * 100).toFixed(1);
	var promoters = ((totalPromoters/data[sede][generationSelected].ratings.length)/100 * 100).toFixed(1);
	var cumulativeNps = promoters - detractors;
	var promedioSupera = parseInt((totalSupera/data[sede][generationSelected].ratings.length)/100 * 100);

	// Grafico 4 Skills Tech
	//var supera = ((totalSupera/data[sede][generationSelected.ratings.length]))
	// El % que cumple lo objetivos = supera + cumple
	var active = (data[sede][generationSelected].students.filter((student)=>{return student.active})).length; 
	var techSkills = ((contTech/active)*100).toFixed(1);
	var hseSkills = ((contHse/active)*100).toFixed(1);

	// Grafico Teacher Rating 
	var sumTeacher = 0;
	for (var i = 0; i < data[sede][generationSelected].ratings.length; i++) {
		sumTeacher += data[sede][generationSelected].ratings[i].teacher;
	}
	var promTeacher = (sumTeacher/data[sede][generationSelected].ratings.length).toFixed(1);

	// Grafico Jedi Master Rating
	var sumJedi = 0;
	for (var i = 0; i < data[sede][generationSelected].ratings.length; i++) {
		sumJedi += data[sede][generationSelected].ratings[i].jedi;
	}
	var promJedi = (sumJedi/data[sede][generationSelected].ratings.length).toFixed(1);

	statsSection.innerHTML = '<div class="grid"><h2>Enrollment</h2><div class="box-number"><h4>' + data[sede][generationSelected].students.length + '</h4><p># Students currently enrolled</p></div><div class="box-percent"><h4 class="red">' + dropout + '%</h4><p>% Dropout</p></div><div class="graphic"><img src="assets/images/bar-graph.png" alt="" /></div></div>                                                  <div class="grid"><h2>achievement</h2><div class="box-number"><h4>' + contAchievement + '</h4><p># Students that meet the target</p></div><div class="box-percent"><h4>' + achievement + '%</h4><p>% of total (' + data[sede][generationSelected].students.length + ') </p></div><div class="graphic"><img src="assets/images/graph.png" alt="" /></div></div>                                                                   <div class="grid"><h2>Net Promoter score</h2><div class="box-number"><p>' + promoters + '% Promoters</p> <p>' + passive + '% Passive</p> <p>' + detractors + '% Detractors</p></div><div class="box-percent"><h4>' + cumulativeNps + '%</h4><p>% cumulative NPS</p></div><div class="graphic"><img src="assets/images/graph.png" alt="" /></div></div>                                                                   <div class="full"><div class="grid-skills"><h2>Tech Skills</h2><div class="box-number"><h4>' + contTech + '</h4><p># Students that meet the target</p></div><div class="box-percent"><h4>' + techSkills + '%</h4><p>% of total (' + active + ') </p></div> <div class="graphic"><img src="assets/images/rectangular-graphic.png" alt="" /></div></div> <div class="grid-cake"><img src="assets/images/circle-graphic-full.PNG" alt="" /></div></div>                                                                    <div class="full"><div class="grid-skills"><h2>Hse Skills</h2><div class="box-number"><h4>' + contHse + '</h4><p># Students that meet the target</p></div><div class="box-percent"><h4>' + hseSkills + '%</h4><p>% of total (' + active + ') </p></div> <div class="graphic"><img src="assets/images/rectangular-graphic.png" alt="" /></div></div> <div class="grid-cake"><img src="assets/images/circle-graphic-full.PNG" alt="" /></div></div>                                                                   <div class="grid"><h2>student satisfaction</h2><div class="box-number"><h1>' + ' 140 ' + '</h1><p>% Meeting or exceeding expectations (cumulative)</p></div><div class="graphic"><img src="assets/images/bar-graph.png" alt="" /></div></div>                                   <div class="grid"><h2>teacher rating</h2><div class="box-number"><h1>' + promTeacher + '</h1><p>Overall teacher rating (cumulative)</p></div><div class="graphic"><img src="assets/images/bar-graph.png" alt="" /></div></div>                                                  <div class="grid"><h2>Jedi master rating</h2><div class="box-number"><h1>' + promJedi + '</h1><p>% Meeting or exceeding expectations (cumulative)</p></div><div class="graphic"><img src="assets/images/bar-graph.png" alt="" /></div></div>';
	mainSection.appendChild(statsSection);


	// SECCION ESTUDIANTES
	var studentSection = document.createElement('div');
	studentSection.setAttribute('id', 'students');
	studentSection.setAttribute('class', 'principal');
	mainSection.appendChild(studentSection);
	studentSection.innerHTML = '<div class="specialization"><h2>Specialization</h2><form action=""><input type="checkbox" name="specialization" value="javascript">Javascript<br><input type="checkbox" name="specialization" value="Ux Design">Ux Design<br><input type="checkbox" name="specialization" value="Ux Design">Front end Designer<br></form></div>';
	var column = document.createElement('div');
	column.setAttribute('class', 'column');
	for (var i = 0; i < data[sede][generationSelected].students.length; i++) {
		column.innerHTML += '<div class="student"><div class="photo"><img src="'+data[sede][generationSelected].students[i].photo+'" alt=""></div><h4>'+data[sede][generationSelected].students[i].name+'</h4><p>Especializacion</p><button>Ver Perfil</button></div>';
	}
	studentSection.appendChild(column);
	// Por defecto, seccion de estudiantes esta oculta
	studentSection.style.display = 'none';

	// SECCION PROFESORES
	var teachersSection = document.createElement('div');
	teachersSection.setAttribute('id', 'teacher');
	teachersSection.setAttribute('class', 'principal');
	for (var i = 0; i < data[sede][generationSelected].ratings.length; i++) {
		teachersSection.innerHTML += '<p>El profesor Nro ' + [i+1] + ' tuvo un promedio de: ' + data[sede][generationSelected].ratings[i].teacher + '</p>';
	}
	mainSection.appendChild(teachersSection);
	teachersSection.style.display = 'none';
	
	// MENU LOCAL (Pestañas)
	// Estudiantes
	var studentShow = document.getElementById('studentslink');
	studentShow.addEventListener ('click', function() {
		studentSection.style.display = null;
		statsSection.style.display = 'none';
		teachersSection.style.display = 'none';
	})
	// Estadisticas
	var statsShow = document.getElementById('overviewlink');
	statsShow.addEventListener ('click', function() {
		studentSection.style.display = 'none';
		statsSection.style.display = null;
		teachersSection.style.display = 'none';
	})
	// Profesores
	var teachersShow = document.getElementById('teacherslink');
	teachersShow.addEventListener ('click', function() {
		studentSection.style.display = 'none';
		statsSection.style.display = 'none';
		teachersSection.style.display = null;
	})

}

function newResult(value) {
	newGen = value;
	// Eliminar elementos para reiniciar la funcion stats
	document.getElementById('mainSection').removeChild(document.getElementById('students'));
	document.getElementById('mainSection').removeChild(document.getElementById('stats'));
	document.getElementById('mainSection').removeChild(document.getElementById('teacher'));
	// Volver a ejecutar la function con generacion seleccionada
	stats();
}

/*function collectionPhoto () {
	if (sede == "AQP") {
		if (generationSelected == '2017-1') {
			photo = []
		}
	}
	if (sede == "LIM") {
		generationsedeFullname = 'LIMA PERÚ';
	}
	if (sede == "SCL") {
		sedeFullname = 'SANTIAGO DE CHILE';
	}
	if (sede == "CDMX") {
		sedeFullname = 'DISTRITO FEDERAL DE MÉXICO';
	}
}*/

