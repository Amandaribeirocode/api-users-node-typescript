"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server.ts
var server_exports = {};
__export(server_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(server_exports);
var import_express2 = __toESM(require("express"));
var import_serverless_http = __toESM(require("serverless-http"));

// src/routes/user-routes.ts
var import_express = require("express");

// src/repositories/user-repository.ts
var users = [];
function findAll() {
  return users;
}
function create(user) {
  users.push(user);
  return user;
}
function findById(id) {
  const user = users.find((user2) => user2.id === id);
  return user;
}
function deleteById(id) {
  const user = users.find((user2) => user2.id === id);
  const novosUsuarios = users.filter((user2) => user2.id !== id);
  users.splice(0, users.length, ...novosUsuarios);
  return user;
}
function updateById(id, name, email) {
  const user = users.find((user2) => user2.id === id);
  if (!user) {
    return void 0;
  }
  user.name = name;
  user.email = email;
  return user;
}
function patchById(id, name, email) {
  const user = users.find((user2) => user2.id === id);
  if (!user) {
    return void 0;
  }
  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  return user;
}

// src/service/users-service.ts
function createUser(name, email) {
  const user = {
    id: Date.now(),
    name,
    email
  };
  return create(user);
}
function getUsers() {
  return findAll();
}
function getUserById(id) {
  return findById(id);
}
function deleteUser(id) {
  return deleteById(id);
}
function updateUser(id, name, email) {
  return updateById(id, name, email);
}
function patchUser(id, name, email) {
  return patchById(id, name, email);
}

// src/controllers/user-controller.ts
function getUsersController(req, res) {
  const users2 = getUsers();
  res.json(users2);
}
function createUserController(req, res) {
  const { name, email } = req.body;
  if (!name || !email || !email.includes("@")) {
    return res.status(400).json({
      message: "Bad Request"
    });
  }
  const user = createUser(name, email);
  res.status(201).json(user);
}
function getUserByIdController(req, res) {
  const id = Number(req.params.id);
  const user = getUserById(id);
  if (!user) {
    return res.status(404).json({
      message: "Usu\xE1rio n\xE3o encontrado"
    });
  }
  res.status(200).json(user);
}
function deleteUserController(req, res) {
  const id = Number(req.params.id);
  const user = deleteUser(id);
  if (!user) {
    return res.status(404).json({
      message: "Usu\xE1rio n\xE3o encontrado"
    });
  }
  res.status(200).json({
    message: "Usu\xE1rio deletado com sucesso",
    user
  });
}
function updateUserController(req, res) {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  if (!name || !email || !email.includes("@")) {
    return res.status(400).json({
      message: "Bad Request"
    });
  }
  const user = updateUser(id, name, email);
  if (!user) {
    return res.status(404).json({
      message: "Usu\xE1rio n\xE3o encontrado"
    });
  }
  res.status(200).json(user);
}
function patchUserController(req, res) {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  if (!name && !email) {
    return res.status(400).json({
      message: "Informe pelo menos um dado para atualizar"
    });
  }
  if (email && !email.includes("@")) {
    return res.status(400).json({
      message: "E-mail inv\xE1lido"
    });
  }
  const user = patchUser(id, name, email);
  if (!user) {
    return res.status(404).json({
      message: "Usu\xE1rio n\xE3o encontrado"
    });
  }
  res.status(200).json(user);
}

// src/routes/user-routes.ts
var router = (0, import_express.Router)();
router.get("/users", getUsersController);
router.post("/users", createUserController);
router.get("/users/:id", getUserByIdController);
router.delete("/users/:id", deleteUserController);
router.put("/users/:id", updateUserController);
router.patch("/users/:id", patchUserController);
var user_routes_default = router;

// src/server.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use(user_routes_default);
var handler = (0, import_serverless_http.default)(app);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
