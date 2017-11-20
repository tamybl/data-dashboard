// Detectar sede seleccionada
// Variables Globales: sede, generacion, generaciones en arreglo y numero de generaciones.
var sede = '';
var sedeFullname = '';
var generationSelected = '';
var arrayGen = [];
var number = '';
var times = 0;
var newGen = '';

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
	menuGeneration.innerHTML = '<h1>'+sedeFullname + '</h1> <a href="#" id="overviewlink">OVERVIEW</a> <a href="#" id="studentslink">STUDENTS</a> <a href="#" id="teacherslink">TEACHERS</a>';
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
	for (var k = 0; k < data[sede][generationSelected].students.length; k++) {
		if(data[sede][generationSelected].students[k].active == false) {
			contDropout++;
		}
		if(data[sede][generationSelected].students[k].active == true) {
			for (var l = 0; l < data[sede][generationSelected].students[k].sprints.length; l++) {
				if (data[sede][generationSelected].students[k].sprints[l].score.hse > 840 && data[sede][generationSelected].students[k].sprints[l].score.tech > 1260) {
						contAchievement++; 
				}
			}
		} 
	}
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
		/*totalSupera += data[sede][generationSelected].ratings[m].student.supera;
		totalCumple += data[sede][generationSelected].ratings[m].student.cumple; */
	}
	var detractors = ((totalDetractors/data[sede][generationSelected].ratings.length)/100 * 100).toFixed(1); 
	var passive = ((totalPassive/data[sede][generationSelected].ratings.length)/100 * 100).toFixed(1);
	var promoters = ((totalPromoters/data[sede][generationSelected].ratings.length)/100 * 100).toFixed(1);
	var cumulativeNps = promoters - detractors;
	var promedioSupera = parseInt((totalSupera/data[sede][generationSelected].ratings.length)/100 * 100);
	// El % que cumple lo objetivos = supera + cumple
	
	statsSection.innerHTML = '<p>Dropout = ' + dropout + '% del total</p>'+'<p>El numero de inscritas es: ' + data[sede][generationSelected].students.length + '</p>' + 'El numero de estudiantes que supera el 70% es ' + contAchievement + ', que corresponde a un ' + achievement + '% del total</p>' + detractors + ' ' + cumulativeNps;
	mainSection.appendChild(statsSection);



	// SECCION ESTUDIANTES
	var studentSection = document.createElement('div');
	studentSection.setAttribute('id', 'students');
	studentSection.setAttribute('class', 'principal');
	mainSection.appendChild(studentSection);
	for (var i = 0; i < data[sede][generationSelected].students.length; i++) {
		studentSection.innerHTML += '<div>Nombre: ' + data[sede][generationSelected].students[i].name + ' foto: ' + '<img src="'+data[sede][generationSelected].students[i].photo+'" alt="'+data[sede][generationSelected].students[i].name+'" />' + '</div>';
	}
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


