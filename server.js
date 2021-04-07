//!import lib

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

const configJson = require("./config");

const config = configJson;

//! setting
const app = express();
const routes = require("./upload_img");


// const multerMid = multer({
//     storage: multer.memoryStorage(),
//     limits:{
//         fileSize: 5 * 1024 * 1024,
//     },
// });

// var upload = multer({ storage: storage});

// exports.upload ;
// module.exports = { upload};

// app.use(upload.single("file"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use((req, res , next)=>{
    res.header("Access-Control-Allow-Origin","*"),
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Wth, Content-Type, Accept" 
    ),
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE"),
    next()
});

app.use("/api",routes);


app.listen(config.port, ()=>{
    console.log(`Server start on port ${config.port}`);
});