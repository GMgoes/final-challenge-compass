"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllerReservations_1 = require("../controller/controllerReservations");
const authController_1 = require("../controller/authController");
const routerReservation = express_1.default.Router();
routerReservation
    .route('/reserve')
    .post(authController_1.protect, controllerReservations_1.createReserve) // OK
    .get(controllerReservations_1.getReserves); // OK
routerReservation
    .route('/reserve/:id')
    .get(controllerReservations_1.getReserve) // OK
    .delete(authController_1.protect, controllerReservations_1.deleteReserve) // OK
    .put(authController_1.protect, controllerReservations_1.updateReserve); // OK
exports.default = routerReservation;
