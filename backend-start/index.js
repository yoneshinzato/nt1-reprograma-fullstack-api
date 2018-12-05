require("dotenv-safe").load();
const jwt = require("jsonwebtoken");
const express = require("express");
const postitsRoute = require("./postits/routes.js");
const usersRoute = require("./users/routes.js");
const users = require("./users/users.js");
const app = express();
const PORT = process.env.PORT || 5000;

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/integracao");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão"));
db.once("open", function() {
  console.log("Conexão feita com sucesso");
});

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(express.json());
app.use("/api/postits", postitsRoute);
app.use("/api/users", usersRoute);

app.post("/api/login", (req, res) => {
  authenticatesUser(req.body, (error, id) => {
    let token;

    if (error) {
      return res.status(error.code).send(error.message);
    }

    token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300
    });

    res.send({ auth: true, token });
  });
});

function authenticatesUser(authUser, cb) {
  const user = users.find(user => user.email === authUser.email);

  if (!user) {
    return cb({ code: 500, message: "Usuário não existe." });
  } else if (user.password !== authUser.password) {
    return cb({ code: 500, message: "Senha incorreta." });
  }

  return cb(null, user.id);
}

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}...`));
