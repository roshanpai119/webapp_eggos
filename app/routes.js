// app/routes.js
//
module.exports = function(app, passport) {


    //HOME PAGE TO LOGIN
    app.get('/', function(req, res) {

        res.render('index.ejs'); //load index.ejs

    })

    //SIGN UP
    app.get('/signup', function(req, res){

        res.render('signup.ejs');

    })

    //profile
    app.get('/profile', function(req, res) {

        res.render('profile.ejs');
 
    });


    //logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })


    function isLoggedIn(req, res, next) {


        if (req.isAuthenticated())
            return next();

        res.redirect('/');

    }

}