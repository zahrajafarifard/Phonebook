const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json());
const path = require("path");
const fs = require("fs");

const sequelize = require("./model/sequelize");
const Member = require("./model/member");
const Company = require("./model/company");
const Post = require("./model/post");
const User = require("./model/user");
const Rule = require("./model/rule");

const companyRoute = require("./routes/companyRoute");
const memberRoute = require("./routes/memberRoute");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const ruleRoute = require("./routes/ruleRoute");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "content-type , Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/company", companyRoute);
app.use("/member", memberRoute);
app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/rule", ruleRoute);

Member.belongsTo(Company, {
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
  allowNull: false,
});
Member.belongsTo(Post, {
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
  allowNull: false,
});

Rule.belongsTo(Post, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  allowNull: false,
});
Rule.belongsTo(User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  allowNull: false,
});

app.use((error, req, res, next) => {
  fs.appendFile(
    "err.txt",
    error.message + " " + error.code + "\r\n",
    function (err) {
      if (err) return next(err);
    }
  );

  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      return next(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  // return res.status(500).send('Something broke!')
});

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Your port is ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log("Connection Failed", e);
  });
