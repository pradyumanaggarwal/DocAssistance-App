const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const { createHospital,getAllHospitals } = require("../controllers/hospital");
const { getUserById } = require("../controllers/user");


router.param("userId", getUserById);

router.post("/hospital/create/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
createHospital
);

router.get("/citizens",getAllHospitals);

module.exports = router;