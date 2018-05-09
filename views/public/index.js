  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyDaNDNZtpqX7TlmKNAxrl2qefRO2VvStTc",
    authDomain: "eggos11-buzzshelter.firebaseapp.com",
    databaseURL: "https://eggos11-buzzshelter.firebaseio.com",
    storageBucket: "eggos11-buzzshelter.appspot.com"
  };
  firebase.initializeApp(config);
  // Get a reference to the database service
  var database = firebase.database();


function login() {

    var email = document.getElementById("username").value ;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {

        var userId = email.replace(/\./g,'@');
        alert(userId);
        
        getUserData(userId);
        alert(document.cookie);

        window.location = "/profile";

    }).catch(function(error) {
        alert("incorrect login credintals");
    });


}

function getUserData(userId) {

    var ref = firebase.database().ref("users/" + userId);

    ref.on("value", function(snapshot) {
      var childData = snapshot.val();
      document.cookie = childData.JSON;
    });

}

function logout() {
    window.location = "/";
}

function newUser() {
    window.location = "/signup";
}

function cancelSignUp() {
    window.location = "/";
}

function forgotPassword() {
    window.location = "/forgotpassword";
}

function Shelter(_UID, _Name, _Capacity_max, _Restrictions, _lat, _lon, _Addr, _Notes, _Phone) {

    this._UID = _UID;
    this._Name = _Name;
    this._Capacity_max = _Capacity_max;
    this._Current_Vacancy = _Capacity_max;
    this._Restrictions = _Restrictions;
    this._lat = _lat;
    this._Notes = _Notes;
    this._lon = _lon;
    this._Addr = _Addr;
    this._Phone = _Phone;

}

function Shelter(_UID, _Name, _Capacity_max, _Current_Vacancy, _Restrictions, _lat, _lon, _Addr, _Notes, _Phone) {

    this._UID = _UID;
    this._Name = _Name;
    this._Capacity_max = _Capacity_max;
    this._Current_Vacancy = _Current_Vacancy;
    this._Restrictions = _Restrictions;
    this._lat = _lat;
    this._Notes = _Notes;
    this._lon = _lon;
    this._Addr = _Addr;
    this._Phone = _Phone;

}

function User(_Username, _Password, _Type) {

    this._Username = _Username;
    this._Password = _Password;
    this._Type = _Type;
    this._CurrentShelterID = -1;
    this._CurrentOccupancy = 0;

}

function createUser() {
    var new_username = document.getElementById("new_username").value;
    var new_password = document.getElementById("new_password").value;
    var password_rpt = document.getElementById("password-rpt").value;
    var usertype;
  
    if (document.getElementById("usertype1").checked) {
        usertype = document.getElementById("usertype1").value;
    } else if (document.getElementById("usertype2").checked) {
        usertype = document.getElementById("usertype2").value
    } else {
        usertype = null;
    }
  
    if ((new_username === null) || (new_username === "") || (new_password == null) || (new_password === "") || (password_rpt === null) || (password_rpt === "") || (usertype === null)) {
        window.alert("You did not completely fill out the required information");
        window.location = "/signup";
        return false;
    }
  
    if (!(new_password === password_rpt)) {
        window.alert("Your passwords did not match");
        window.location = "/signup";
        return false;
    }
  
    var curUser = new User(new_username, new_password, usertype);
    document.cookie = (JSON.stringify(curUser));

    firebase.auth().createUserWithEmailAndPassword(new_username, new_password).then(function(user) {

        var id = new_username.replace(/\./g,'@')

        firebase.database().ref('users/' + id).set({
            _Username: curUser._Username,
            _Password: curUser._Password,
            _Type: curUser._Type,
            _CurrentShelterID: curUser._CurrentShelterID,
            _CurrentOccupancy: curUser._CurrentOccupancy,
            JSON: JSON.stringify(curUser),
        });

        window.location = "/profile";

    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
}




