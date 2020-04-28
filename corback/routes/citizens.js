const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const { createCitizen,getAllCitizens } = require("../controllers/citizens");
const { getUserById } = require("../controllers/user");


router.param("userId", getUserById);


router.post("/citizen/create/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
createCitizen
);

router.get("/citizens",getAllCitizens);

module.exports = router;