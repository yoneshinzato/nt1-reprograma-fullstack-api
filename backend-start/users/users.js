// const postits = require('../postits/postits.js');

// const users = [
//   {
//     id: 1,
//     name: 'Anna Flávia',
//     email: 'annaflaviac@me.com',
//     password: 'r3pr0gr@m@2018',
//     roles: ['admin'],
//     postits: [postits[0], postits[1]],
//   },
//   {
//     id: 2,
//     name: 'Ana Paula',
//     email: 'ana.paula@reprograma.com.br',
//     password: 'r3pr0gr@m@2017',
//     roles: [],
//     postits: [postits[2]],
//   },
//   {
//     id: 3,
//     name: 'Silvia',
//     email: 'silvia@reprograma.com.br',
//     password: 'r3pr0gr@m@2016',
//     roles: [],
//   },
//   {
//     id: 4,
//     name: 'Administrador',
//     email: 'admin@email.com',
//     password: '123456',
//     roles: ['admin'],
//     postits: []
//   }
// ];

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
let UserSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    email: { type: String, unique: true },
    password: { type: String }
  },
  {
    collection: "users",
    versionKey: false
  }
);

let users = mongoose.model("users", UserSchema);

module.exports = users;
