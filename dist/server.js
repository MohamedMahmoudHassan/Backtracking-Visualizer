const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();

app.use("/", serveStatic(__dirname));

const port = process.env.PORT || 8080;
app.listen(port);
console.log("Listening to port " + port + "...");
