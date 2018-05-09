var shelterArray = []
var table1 = true;
var table2 = false;

var button1 = true;
var button2 = false;

window.onload = function() {
  loadData();
  location.href = "#";
  location.href = "#profile_header";
};

function loadData() {
  // get data

  var ref = firebase.database().ref("shelters/");

  ref.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val().JSON;
      var curObject = JSON.parse(childData);
      appendTable(curObject);
      loadMap();
    });
  });

}

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

    shelt = new Shelter(_UID, _Name, _Capacity_max, _Capacity_max, _Restrictions, _lat, _lon, _Addr, _Notes, _Phone);

    firebase.database().ref('shelters/' + shelt._UID).set({
      _UID: shelt._UID,
      _Name: shelt._Name,
      _Capacity_max: shelt._Capacity_max,
      _Current_Vacancy: shelt._Current_Vacancy,
      _Restrictions: shelt._Restrictions,
      _lat: shelt._lat,
      _lon: shelt._lon,
      _Addr: shelt._Addr,
      _Notes: shelt._Notes,
      _Phone: shelt._Phone,
      JSON: JSON.stringify(shelt),
    });


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
    var txt = document.createTextNode(shelt._Current_Vacancy);
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
      td = tr[i].getElementsByTagName("td")[4];
      td1 = tr[i].getElementsByTagName("td")[1];

      if (td) {
        if ((td1.innerHTML.toUpperCase().indexOf(filter) > -1) || (td.innerHTML.toUpperCase().indexOf(filter) > -1) || (td.innerHTML.toUpperCase() === "") || (td.innerHTML.toUpperCase().indexOf("ANYONE") > -1) || (td.innerHTML.toUpperCase().indexOf(filter2) > -1) || (td.innerHTML.toUpperCase().indexOf(filter3) > -1) || (td.innerHTML.toUpperCase().indexOf(filter4) > -1) || (td.innerHTML.toUpperCase().indexOf(filter5) > -1) || (td.innerHTML.toUpperCase().indexOf(filter6) > -1)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }

    loadMap();
}

function displayShelter(object) {

  var x = document.getElementById("sample");
  x.style.display = "none";
  var y = document.getElementById("mapbutton");
  y.style.display = "none";

  object = JSON.parse(object.id);

  table2 = true;
  table1 = false;
  on();

  document.getElementById("data1").innerHTML = object._UID;
  document.getElementById("data2").innerHTML = object._Name;
  document.getElementById("data3").innerHTML = object._Capacity_max
  document.getElementById("vacancy").innerHTML = object._Current_Vacancy;
  document.getElementById("data4").innerHTML = object._Restrictions;
  document.getElementById("data5").innerHTML = object._lat;
  document.getElementById("data6").innerHTML = object._lon;
  document.getElementById("data7").innerHTML = object._Addr;
  document.getElementById("data8").innerHTML = object._Notes;
  document.getElementById("data9").innerHTML = object._Phone;

  canReserve(document.getElementById("data1").innerHTML);

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

  window.location = "/profile";

}

function reserveSpace() {

  var input = document.getElementById("number").value;
  
  if ((input == null) || (input <= 0)) {
    alert("Please Enter a Valid Number");
  }

  var space = parseInt(document.getElementById("vacancy").innerText);

  if (input <= space) {

    document.getElementById("vacancy").innerHTML = space - input;

    _UID = document.getElementById("data1").innerText
    _Name = document.getElementById("data2").innerText
    _Capacity_max = document.getElementById("data3").innerText
    _Current_Vacancy = document.getElementById("vacancy").innerText
    _Restrictions = document.getElementById("data4").innerText
    _lat = document.getElementById("data5").innerText
    _lon = document.getElementById("data6").innerText
    _Addr = document.getElementById("data7").innerText
    _Notes = document.getElementById("data8").innerText
    _Phone = document.getElementById("data9").innerText


    shelt = new Shelter(_UID, _Name, _Capacity_max, _Current_Vacancy, _Restrictions, _lat, _lon, _Addr, _Notes, _Phone);
    var curUser = JSON.parse(document.cookie);

    var id = curUser._Username.replace(/\./g,'@')

    curUser._CurrentOccupancy = input;
    curUser._CurrentShelterID = _UID;

    firebase.database().ref('users/' + id).set({
        _Username: curUser._Username,
        _Password: curUser._Password,
        _Type: curUser._Type,
        _CurrentShelterID: _UID,
        _CurrentOccupancy: input,
        JSON: JSON.stringify(curUser),
    });

    document.cookie = JSON.stringify(curUser);

    firebase.database().ref('shelters/' + shelt._UID).set({
      _UID: shelt._UID,
      _Name: shelt._Name,
      _Capacity_max: shelt._Capacity_max,
      _Current_Vacancy: shelt._Current_Vacancy,
      _Restrictions: shelt._Restrictions,
      _lat: shelt._lat,
      _lon: shelt._lon,
      _Addr: shelt._Addr,
      _Notes: shelt._Notes,
      _Phone: shelt._Phone,
      JSON: JSON.stringify(shelt),
    });

    canReserve(_UID);

  } else {

    alert("The number entered isn't valid");

  }




}

function canReserve(_UID) {

  var curUser = JSON.parse(document.cookie);

  if (curUser._CurrentShelterID == -1) {

    button1 = true;
    button2 = false;

  } else if (curUser._CurrentShelterID == _UID) {

    button1 = false;
    button2 = true;

  } else {

    button1 = false;
    button2 = false;

  }

  displayButtons();



}

function displayButtons() {

  var x = document.getElementById("book");
  var y = document.getElementById("unbook");

  if (button1 === true) {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

  if (button2 === true) {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }

}

function unbook() {

  var curUser = JSON.parse(document.cookie);

  // put space back in shelter
  document.getElementById("vacancy").innerHTML = parseInt(document.getElementById("vacancy").innerText) + parseInt(curUser._CurrentOccupancy);

  _UID = document.getElementById("data1").innerText
  _Name = document.getElementById("data2").innerText
  _Capacity_max = document.getElementById("data3").innerText
  _Current_Vacancy = document.getElementById("vacancy").innerText
  _Restrictions = document.getElementById("data4").innerText
  _lat = document.getElementById("data5").innerText
  _lon = document.getElementById("data6").innerText
  _Addr = document.getElementById("data7").innerText
  _Notes = document.getElementById("data8").innerText
  _Phone = document.getElementById("data9").innerText

  shelt = new Shelter(_UID, _Name, _Capacity_max, _Current_Vacancy, _Restrictions, _lat, _lon, _Addr, _Notes, _Phone);

  var id = curUser._Username.replace(/\./g,'@')

  curUser._CurrentOccupancy = 0;
  curUser._CurrentShelterID = -1;

  firebase.database().ref('users/' + id).set({
      _Username: curUser._Username,
      _Password: curUser._Password,
      _Type: curUser._Type,
      _CurrentShelterID: -1,
      _CurrentOccupancy: 0,
      JSON: JSON.stringify(curUser),
  });

  firebase.database().ref('shelters/' + shelt._UID).set({
    _UID: shelt._UID,
    _Name: shelt._Name,
    _Capacity_max: shelt._Capacity_max,
    _Current_Vacancy: shelt._Current_Vacancy,
    _Restrictions: shelt._Restrictions,
    _lat: shelt._lat,
    _lon: shelt._lon,
    _Addr: shelt._Addr,
    _Notes: shelt._Notes,
    _Phone: shelt._Phone,
    JSON: JSON.stringify(shelt),
  });

  document.cookie = JSON.stringify(curUser);

  canReserve(_UID);

}

function logout() {
    document.cookie = "";
    window.location = "/";
}

function loadMap() {
  var x = document.getElementById("sample");
  x.style.display = "block";
          
  var mapOptions = {
     center:new google.maps.LatLng(33.762496, -84.415123), zoom: 12,
     mapTypeId:google.maps.MapTypeId.ROADMAP
  };
      
  var map = new google.maps.Map(document.getElementById("sample"),mapOptions);

    var table = document.getElementById("targettable");
    var marker;

    for (var i = 1; i < table.rows.length; i++) {
      row = table.rows[i];

      if (row.style.display == "none") {


      } else {

      var lon = parseFloat(row.cells[5].innerText);
      var lat = parseFloat(row.cells[6].innerText);

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        map: map,
     });

     var content = "Name: " + row.cells[1].innerText + " -  Restrictions: " + row.cells[4].innerText;

     var infowindow = new google.maps.InfoWindow()
   
   google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
           return function() {
              infowindow.setContent(content);
              infowindow.open(map,marker);
           };
       })(marker,content,infowindow)); 
  }

}

}

function mapDisplay() {
  location.href = "#";
  location.href = "#sample";
}