require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();






const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");



const authRoutes = require("./routes/auth");
const citizenRoutes = require("./routes/citizens");
const categoryRoutes = require("./routes/category");
const hospitalRoutes = require("./routes/hospital");
const patientRoutes = require("./routes/patient");
const userRoutes = require("./routes/user");
//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use("/api", authRoutes);
app.use("/api", citizenRoutes);
app.use("/api", categoryRoutes);
app.use("/api", hospitalRoutes);
app.use("/api", patientRoutes);
app.use("/api", userRoutes);


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=> {
    console.log("DB CONNECTED")
});

const port = 8000;

app.listen(port, () => {
    console.log(`app is running at ${port}`);
  });






  // web scrapping .
