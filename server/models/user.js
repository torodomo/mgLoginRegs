// require mongoose
var mongoose = require('mongoose');
var bcrypt = require("bcrypt-as-promised");

// create the schema
var UserSchema = new mongoose.Schema({
  first_name: {type: String, required: [true,'First name is required'], minlength: [2,'First name should be greater than 1 character']},
  last_name: {type: String, required: [true,'Last name is required'], minlength: [2,'Last name should be greater than 1 character']},
  email: {type: String, required: [true,'Email is required'], unique:[true,'Email is already used'],
      validate: {
          validator: function( value ) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test( value );
          },
          message: "Please fill a valid email address"
        }
  },
  password: {
      type: String,
      required: [true,'Password is required'],
      minlength: [8,'Password should be greater than 8 characters'],
      maxlength: [32,'Password should be less than 32 characters'],
      validate: {
        validator: function( value ) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
        },
        message: "Password failed validation, you must have at least 1 number, uppercase and special character"
      }
    },
  confirm: String,
  birthday: {type: Date, required: [true,'Birthday is required']},
}, {timestamps: true});

UserSchema.pre('save',function(done){
  var user = this;
  console.log(user.password);
  console.log(user.confirm);
  if(user.password != user.confirm){
    done(new Error("Passwords do not match"));
  }
  bcrypt.hash(user.password, 10).then((hashed_password)=>{ // => Error callback function
    user.password = hashed_password;
    user.confirm = "";
    done();
  }).catch((err)=>{
    done(err);
  });
});
// register the schema as a model
var User = mongoose.model('users', UserSchema);