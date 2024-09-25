"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsRoutes = void 0;
const clients_controller_1 = require("./clients.controller");
const clientsController = new clients_controller_1.ClientsController();
const clientsRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.get("/clients", clientsController.findAll);
    fastify.get("/client", clientsController.findOne);
    fastify.post("/client", clientsController.create);
    fastify.put("/client", clientsController.update);
    fastify.delete("/client", clientsController.remove);
});
exports.clientsRoutes = clientsRoutes;
