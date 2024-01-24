import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

// const app = express();

// app.use(bodyParser.json());
// app.use(express.static("public"));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.get("/api", async (req, res) => {
//   const projects = await fs.readFile("./data/project.json", "utf8");
//   res.json(JSON.parse(projects));
// });

// app.use((req, res) => {
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   res.status(404).json({ message: "Not found" });
// });

// app.listen(3000);



// const app = require("express")();
// const { v4 } = require("uuid");

// app.get("/api", (req, res) => {
//   const path = `/api/item/${v4()}`;
//   res.setHeader("Content-Type", "text/html");
//   res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
//   res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
// });

// app.get("/api/item/:slug", (req, res) => {
//   const { slug } = req.params;
//   res.end(`Item: ${slug}`);
// });

// module.exports = app;


var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var http = require('http')
var path = require('path')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.methodOverride())
app.use(express.session({ secret: 'your secret here' }))
app.use(express.bodyParser())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/users', user.list)

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})