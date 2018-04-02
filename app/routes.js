// app/routes.js
//
module.exports = function (app, passport) {


    //HOME PAGE TO LOGIN
    app.get('/', function (req, res) {

        res.render('index.ejs'); //load index.ejs

    })

    //SIGN UP
    app.get('/signup', function (req, res) {

        res.render('signup.ejs', { message: req.flash('signupMessage') });

    })


    //profile
    app.get('/profile', function (req, res) {
        res.render('profile.ejs');
    });

    //forgot password page
    app.get('/forgotpassword', function (req, res) {
        res.render('forgotpassword.ejs');
    });

    //Shelter page
    app.get('/shelter', function (req, res) {
        res.render('Shelter.ejs');
    });


    //logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    })


    function isLoggedIn(req, res, next) {


        if (req.isAuthenticated())
            return next();

        res.redirect('/');

    }

}
