var users = require('../controllers/users.js');
var session = require("express-session");

module.exports = function(app) {

    app.get('/', function(req, res){
        if(!req.session.errors){
            req.session.errors = [];
        }
        console.log(req.session.user);
        req.session.user = "";
        res.render('index', {errors:req.session.errors});
    });

    app.get('/users/login', function(req, res){
        users.current_user(req, res);
    });    

    app.post('/users/new', function(req, res){
        users.create(req, res);
    });
    
    app.post('/users', function(req, res){
        users.login(req, res);
    });
    
}