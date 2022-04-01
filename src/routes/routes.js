const routes = require('express').Router();
const ControllerPoke = require("../controllers/ControllerPoke");
routes.get("/", ControllerPoke.getAll);
routes.get("/registration", ControllerPoke.page);
routes.post("/creation", ControllerPoke.creation);
routes.get("/getBid/:id/:method", ControllerPoke.getBid);

module.exports = routes;