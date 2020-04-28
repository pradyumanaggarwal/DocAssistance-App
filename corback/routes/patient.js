const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const { createPatient,getAllPatients } = require("../controllers/patient");
const { getUserById } = require("../controllers/user");


router.param("userId", getUserById);


router.post("/patient/create/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
createPatient
);

router.get("/patient/:userId",
getAllPatients);

module.exports = router;