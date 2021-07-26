const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


const cheerio = require("cheerio")
const fs = require("fs");
const json2csv = require("json2csv").Parser;
const request = require("request-promise");



exports.signup = (req, res) => {
 
  const {name,lastName,email,password} = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  const user = new User({
    name : name,
    lastname : lastName,
    email : email ,
    password : password
  });

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      lastname : user.lastName,
      email: user.email,
      id: user._id,

    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};





// web scrapping tools.


const figure = "https://www.worldometers.info/coronavirus/country/india/";

(async () => {
    let coronaData = [];
    const response = await request({
        url : figure,
        headers:{
            "Content-Type": "text/html; charset=UTF-8"
        },
        gzip:true,
        br: true
    });

    let $ = cheerio.load(response);
    //let coronaviruscases = $('div[class="maincounter-number"] > span').text();

    let coronaviruscases = []
    $('div[class="maincounter-number"] > span').each(function(idx, elem) {
        let number = $(elem).text();
        coronaviruscases.push(number);
        console.log(number);
    });

    coronaData.push({
        coronaviruscases : coronaviruscases
    });
  

    const j2cp = new json2csv()
    const csv = j2cp.parse(coronaData)
  
    fs.writeFileSync("./coronaidata",csv , "utf-8");
  
}

)();


/// web scrapping ends here.





exports.getReal  = (req,res) => {



  const figure = "https://www.worldometers.info/coronavirus/country/india/";

  (async () => {
    let coronaData = [];
    const response = await request({
        url : figure,
        headers:{
            "Content-Type": "text/html; charset=UTF-8"
        },
        gzip:true,
        br: true
    });

    let $ = cheerio.load(response);
    //let coronaviruscases = $('div[class="maincounter-number"] > span').text();

    let coronaviruscases = []
    $('div[class="maincounter-number"] > span').each(function(idx, elem) {
        let number = $(elem).text();
        coronaviruscases.push(number);
        console.log(number);
    });

    coronaData.push({
        coronaviruscases : coronaviruscases
    });
  

    const j2cp = new json2csv()
    const csv = j2cp.parse(coronaData)
  
    //fs.writeFileSync("./coronaidata",csv , "utf-8");
    return res.json(coronaviruscases);
  
}

)();
}