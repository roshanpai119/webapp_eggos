$('.upload-btn').on('click', function (){
    $('#upload-input').click();
});

shelterArray = [];

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

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,

      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

        }, false);

        return xhr;
      }
    });

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
            if ((data.charAt(j) == ",") || (j == data.length - 1)) {
              entries.push(data.substring(prev, j + 1));
              prev = j + 1;	
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
    td.innerHTML = "<button onclick='extraInfo()'>" + shelt._UID + "</button>"
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



}