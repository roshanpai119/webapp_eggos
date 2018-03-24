function login() {
    if ((document.getElementById("username").value === "user") && (document.getElementById("password").value === "pass")) {
        window.location = "/profile";
    } else {
        window.alert("The username or password entered is incorrect");
    }
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

    window.location = "/profile";




}