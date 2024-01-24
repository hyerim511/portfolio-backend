// import fs from "node:fs/promises";

// import bodyParser from "body-parser";
// import express from "express";

// const app = express();

// app.use(bodyParser.json());
// app.use(express.static("public"));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.get("/", async (req, res) => {
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

const express = require("express");
const fs = require('fs');
// const bodyParser = require("body-parser");

const app = express();

// app.get("/", (req, res) => {
  // res.send(projects);
// });

app.get("/", (req, res) => {
  try {
    const projects = fs.readFile("./data/project.json", "utf8");
    const data = res.json(JSON.parse(projects));
    res.send(data);
  } catch(error) {
    console.log(error);
    res.send("error!");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
