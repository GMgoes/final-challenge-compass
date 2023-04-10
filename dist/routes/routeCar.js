"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllerCar_1 = require("../controller/controllerCar");
const authController_1 = require("../controller/authController");
const routerCar = express_1.default.Router();
routerCar
    .route('/car')
    .get(controllerCar_1.getCars) // OK
    .post(authController_1.protect, controllerCar_1.createCar); // OK
routerCar
    .route('/car/:id')
    .get(controllerCar_1.getCar) // OK
    .delete(authController_1.protect, controllerCar_1.deleteCar) // OK
    .put(authController_1.protect, controllerCar_1.updateCar); // OK
routerCar.route('/car/:id/acessories/:id').patch(authController_1.protect, controllerCar_1.updateAccessories); // OK
exports.default = routerCar;
