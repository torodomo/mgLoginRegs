var mongoose = require('mongoose');
var bcrypt = require("bcrypt-as-promised");
var session = require("express-session");
var User = mongoose.model('users');

module.exports = {

    current_user: function(req, res) {
        User.findOne({_id: req.session.user}, function(err, result){
            req.session.errors = err;
            if(err) { 
                res.render('index',{errors:req.session.errors});
            } else {
                res.render('main', {user: result});
            }
        });
    },

    create: function(req, res) {
        var user = new User(req.body);
        if(req.body.password != req.body.confirm){
            req.session.errors = "Password is not matching";
        }
        user.save(function(err,result){
            req.session.errors = err;
            if(err) { 
                res.redirect('/');
            } else {
                req.session.user = result._id;
                res.redirect('/users/login');
            }
        });
    },

    login: function(req, res){
        User.findOne({email: req.body.email}, function(err,user){
            req.session.errors = err;
            if(err) { 
                res.redirect('/')
            } else {
                bcrypt.compare(req.body.password,user.password).then(function(){
                    req.session.user = user._id;
                    res.redirect('/users/login');
                }).catch(function(err){
                    req.session.errors = err;
                    res.redirect('/')
                });
            }
        });
    },
}
