const Citizen = require("../models/citizens");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.createCitizen = (req,res) => {

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { name,lastname,tested,address,contact} = fields;

    if (!name || !lastname ||!tested||!address||!contact) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let citizen = new Citizen(fields);

    //handle file here
    // if (file.photo) {
    //   if (file.photo.size > 3000000) {
    //     return res.status(400).json({
    //       error: "File size too big!"
    //     });
    //   }
    //   product.photo.data = fs.readFileSync(file.photo.path);
    //   product.photo.contentType = file.photo.type;
    // }
    // console.log(product);

    //save to the DB
    citizen.save((err, citizen) => {
      if (err) {
        res.status(400).json({
          error: "Saving Citizen to DB failed!"
        });
      }
      res.json(Citizen);
    });
  });

};

exports.getAllCitizens = (req,res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";


    Citizen.find()
    .populate("checkedby")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, citizens) => {
      if (err) {
        return res.status(400).json({
          error: "NO Citizen FOUND!"
        });
      }
      res.json(citizens);
    });
};



