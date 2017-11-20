/*
 * Funcionalidad de tu proyecto
 */

(function() { 
	setTimeout(function() {
    document.getElementById("porDefecto").click();
  }, 300);
})();

////////////INICIO MENU DESPLEGABLE//////////////
function mostrarMenu() {
  document.getElementById("menuDesplegable").classList.toggle("show");
}
function mostrarMenuTs() {
  document.getElementById("menuDesplegableTs").classList.toggle("show");
}
function mostrarMenuLs() {
  document.getElementById("menuDesplegableLs").classList.toggle("show");
}
window.onclick = function(event) {
  if (!event.target.matches('.botonDesplegable')) {
    var desplegables = document.getElementsByClassName("desplegable-contenido");
    var i;
    for (i = 0; i < desplegables.length; i++) {
      var visualizarMenu = desplegables[i];
      if (visualizarMenu.classList.contains('show')) {
        visualizarMenu.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('.botonDesplegableTs')) {
    var desplegables = document.getElementsByClassName("desplegable-contenidoTs");
    var i;
    for (i = 0; i < desplegables.length; i++) {
      var visualizarMenu = desplegables[i];
      if (visualizarMenu.classList.contains('show')) {
        visualizarMenu.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('.botonDesplegableLs')) {
    var desplegables = document.getElementsByClassName("desplegable-contenidoLs");
    var i;
    for (i = 0; i < desplegables.length; i++) {
      var visualizarMenu = desplegables[i];
      if (visualizarMenu.classList.contains('show')) {
        visualizarMenu.classList.remove('show');
      }
    }
  }
}
/////////////FIN MENU DESPLEGABLE////////////////

//////////////INICIO MENU TABS///////////////////
function cambiaTabs(event, seccion) {
  var contenido = document.getElementsByClassName("contenido");
  for (var i = 0; i < contenido.length; i++) {
    contenido[i].style.display = "none";
  }

  var enlaces = document.getElementsByClassName("enlace");
  for (var i = 0; i < enlaces.length; i++) {
    enlaces[i].className = enlaces[i].className.replace(" activo", "");
  }

  document.getElementById(seccion).style.display = "block";
  event.currentTarget.className += " activo";
}
//////////////FIN MENU TABS///////////////////

//////////////INCIO DE GRAFICAS///////////////////
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(enrollmentChart);
google.charts.setOnLoadCallback(archievementChart);
google.charts.setOnLoadCallback(promoterChart);
google.charts.setOnLoadCallback(techChart);
google.charts.setOnLoadCallback(skillsChart);

function enrollmentChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', ''],
    ['S1', 18],
    ['S2', 17],
    ['S3', 15],
    ['S4', 15]
  ]);
  var chart = new google.visualization.ColumnChart(document.getElementById('epiechart'));
  chart.draw(data);
}

function archievementChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', ''],
    ['S1', 18],
    ['S2', 7],
    ['S3', 15],
    ['S4', 19]
  ]);
  var chart = new google.visualization.LineChart(document.getElementById('apiechart'));
  chart.draw(data);
  var chart = new google.visualization.LineChart(document.getElementById('sspiechart'));
  chart.draw(data);
  var chart = new google.visualization.LineChart(document.getElementById('trpiechart'));
  chart.draw(data);
}

function promoterChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', ''],
    ['S1', 15],
    ['S2', 8],
    ['S3', 13],
    ['S4', 17]
  ]);
  var chart = new google.visualization.LineChart(document.getElementById('npiechart'));
  chart.draw(data);
  var chart = new google.visualization.LineChart(document.getElementById('jmpiechart'));
  chart.draw(data);
}

function techChart() {
  var data = google.visualization.arrayToDataTable([
  ['', ''],
  ['',  9],
  ['',  10],
  ['',  11],
  ['',  12],
  ['',  13],
  ['',  12],
  ['',  16],
  ['',  18],
  ['',  17],
  ['',  16],
  ['',  18],
  ['',  18],
  ['',  18],
  ['',  17],
  ['',  16],
  ['',  15],
  ['',  14],
  ['',  13],
  ['',  12],
  ['',  11]
  ]);
  var options = {
    seriesType: 'bars',
    series: {2: {type: 'line'}}
  };
  var chart = new google.visualization.ComboChart(document.getElementById('tpiechartb'));
  chart.draw(data, options);
  var chart = new google.visualization.ComboChart(document.getElementById('lpiechartb'));
  chart.draw(data, options);
}
function skillsChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', ''],
    ['# STUDENTS THAT MEET THE TARGET',     40],
    ['# STUDENTS THAT DONT MEET THE TARGET',      190]
  ]);
  var options = {
    legend: { position: 'bottom', alignment: 'start', maxLines: 1},
    bar: { groupWidth: '75%' },
  }
  var chart = new google.visualization.PieChart(document.getElementById('tpiechartc'));
  chart.draw(data, options);
  var chart = new google.visualization.PieChart(document.getElementById('lpiechartc'));
  chart.draw(data, options);
}
//////////////FIN DE GRAFICAS///////////////////
// .tabla {
//   display:table;
//   border-collapse:separate;
//   border-spacing:5px;
//   /*width: 100%*/
// }
// .fila {display:table-row;}
// .caja {display:table-cell;padding:5px;border:1px solid black;width: 33%}