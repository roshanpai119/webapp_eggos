shelterArray = [];

var table1 = true;
var table2 = false;

$('#upload-input').on('change', function(){

  var files = $(this).get(0).files;

  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];


      var logFile = file;
      var reader = new FileReader;
      reader.readAsText(logFile);

      reader.onload = function(e) {
      rawLog = reader.result;
        csvParser(reader.result);
        
      };


            // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }
  }
});

function csvParser(data) {

  var _UID;
  var _Name;
  var _Capacity_max;
  var _Restrictions;
  var _lat;
  var _lon;
  var _Addr;
  var _Notes;
  var _Phone;
  var shelt;

  var lines = data.split(/\r\n|\r|\n/g);
  
  for (var i = 1; i < lines.length - 1; i++) {

    var data = lines[i];
    var prev = 0;
    var on = true;
    var entries = [];

    for (var j = 0; j < data.length; j++) {

        if (data.charAt(j) == '"') {
          on = !on;
        }
        
        if (on === true) {            
          if (data.charAt(j) == ",") {
            entries.push(data.substring(prev, j));
            prev = j + 1;	
          } else if (j === data.length - 1) {
            entries.push(data.substring(prev, j + 1));
          }     
        }
    }

    _UID = entries[0];
    _Name = entries[1];
    _Capacity_max = entries[2];
    _Restrictions = entries[3];
    _lat = entries[4];
    _lon = entries[5];
    _Addr = entries[6];
    _Notes = entries[7];

    if (entries.length < 9) {
      entries.push("");
    }

    _Phone = entries[8];

    shelt = new Shelter(_UID, _Name, _Capacity_max, _Restrictions, _lat, _lon, _Addr, _Notes, _Phone);
    shelterArray.push(shelt);
    appendTable(shelt);

  }


}

function appendTable(shelt) {

  var mixed = document.getElementById("targettable");
  var tbody = document.createElement("tbody");

    var tr = document.createElement("tr");

    var td = document.createElement("td");
    var pass = JSON.stringify(shelt);
    td.innerHTML = "<button id=" + shelt._UID + " onclick='displayShelter(this)'>" + shelt._UID + "</button>";
    tr.appendChild(td);

    var td = document.createElement("td");
    var txt = document.createTextNode(shelt._Name);
    td.appendChild(txt);
    tr.appendChild(td);

    var td = document.createElement("td");
    var txt = document.createTextNode(shelt._Capacity_max);
    td.appendChild(txt);
    tr.appendChild(td);

    var td = document.createElement("td");
    var txt = document.createTextNode(shelt._Restrictions);
    td.appendChild(txt);
    tr.appendChild(td);

    var td = document.createElement("td");
    var txt = document.createTextNode(shelt._lat);
    td.appendChild(txt);
    tr.appendChild(td);

    var td = document.createElement("td");
    var txt = document.createTextNode(shelt._lon);
    td.appendChild(txt);
    tr.appendChild(td);

    var td = document.createElement("td");
    var txt = document.createTextNode(shelt._Addr);
    td.appendChild(txt);
    tr.appendChild(td);

    var td = document.createElement("td");
    var txt = document.createTextNode(shelt._Notes);
    td.appendChild(txt);
    tr.appendChild(td);

    var td = document.createElement("td");
    var txt = document.createTextNode(shelt._Phone);
    td.appendChild(txt);
    tr.appendChild(td);


    tbody.appendChild(tr);


  mixed.appendChild(tbody);
  document.getElementById(shelt._UID).id = pass;

}

function search() {

  var input;
  input = document.getElementById("searchBar");
  var filter;
  filter = input.value.toUpperCase();
  var table;
  table = document.getElementById("targettable");
  tr = table.getElementsByTagName("tr");

  var filter2;
  var filter3;
  var filter4;
  var filter5;
  var filter6;

  if ((filter.indexOf("GIRL") > -1) || (filter.indexOf("FEMALE") > -1) || (filter.indexOf("WOMEN") > -1) || (filter.indexOf("WOMAN") > -1)) {
    filter = "GIRL";
    filter2 = "FEMALE";
    filter3 = "WOMEN";
    filter4 = "WOMAN";
  } else if ((filter.indexOf("MAN") > -1) || (filter.indexOf("MALE") > -1) || (filter.indexOf("MEN") > -1) || (filter.indexOf("BOY") > -1) || (filter.indexOf("GUY") > -1)) {
    filter = "MAN";
    filter2 = "MALE";
    filter3 = "MEN";
    filter4 = "BOY";
    filter5 = "GUY";
  } else if ((filter.indexOf("CHILD") > -1) || (filter.indexOf("KID") > -1) || (filter.indexOf("CHILDREN") > -1) || (filter.indexOf("TODDLER") > -1) || (filter.indexOf("BABY") > -1) || (filter.indexOf("NEWBORN") > -1)) {
    filter = "CHILD";
    filter2 = "KID";
    filter3 = "CHILDREN";
    filter4 = "TODDLER";
    filter5 = "BABY";
    fitler6 = "NEWBORN";
  } else if ((filter.indexOf("VETERAN") > -1) || (filter.indexOf("MILITARY") > -1) || (filter.indexOf("ARMY") > -1) || (filter.indexOf("SOLIDER") > -1) || (filter.indexOf("MARINE") > -1) || (filter.indexOf("NAVY") > -1)) {
    filter = "MILITARY";
    filter2 = "VETERAN";
    filter3 = "SOLIDER";
    filter4 = "ARMY";
    filter5 = "MARINE";
    filter6 = "NAVY";
  } else if ((filter.indexOf("TEEN") > -1) || (filter.indexOf("YOUNG ADULT") > -1)) {
    filter = "TEEN";
    filter2 = "YOUNG ADULT";
  } else if ((filter.indexOf("FAM") > -1)) {
    filter = "FAM";
  }

  var td;
  var td1;
 
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3];
      td1 = tr[i].getElementsByTagName("td")[1];

      if (td) {
        if ((td1.innerHTML.toUpperCase().indexOf(filter) > -1) || (td.innerHTML.toUpperCase().indexOf(filter) > -1) || (td.innerHTML.toUpperCase() === "") || (td.innerHTML.toUpperCase().indexOf("ANYONE") > -1) || (td.innerHTML.toUpperCase().indexOf(filter2) > -1) || (td.innerHTML.toUpperCase().indexOf(filter3) > -1) || (td.innerHTML.toUpperCase().indexOf(filter4) > -1) || (td.innerHTML.toUpperCase().indexOf(filter5) > -1) || (td.innerHTML.toUpperCase().indexOf(filter6) > -1)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
}

function displayShelter(object) {

  object = JSON.parse(object.id);

  table2 = true;
  table1 = false;
  on();

  document.getElementById("data1").innerHTML = object._UID;
  document.getElementById("data2").innerHTML = object._Name;
  document.getElementById("data3").innerHTML = object._Capacity_max
  document.getElementById("data4").innerHTML = object._Restrictions;
  document.getElementById("data5").innerHTML = object._lat;
  document.getElementById("data6").innerHTML = object._lon;
  document.getElementById("data7").innerHTML = object._Addr;
  document.getElementById("data8").innerHTML = object._Notes;
  document.getElementById("data9").innerHTML = object._Phone;

}

function on() {

  var x = document.getElementById("targettable");
  var y = document.getElementById("newtargettable");

  if (table1 === true) {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

  if (table2 === true) {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }

}

function showData() {

  table1 = true;
  table2 = false;
  on();

}