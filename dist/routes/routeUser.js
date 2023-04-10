"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllerUser_1 = require("../controller/controllerUser");
const authController_1 = require("../controller/authController");
const routerUser = express_1.default.Router();
routerUser.route('/user').post(controllerUser_1.createUser).get(controllerUser_1.getUsers); // OK
routerUser.route('/user/authenticate').post(controllerUser_1.loginUser); // OK
routerUser.route('/user/logout').get(authController_1.protect, authController_1.logout); // OK
routerUser
    .route('/user/:id')
    .get(controllerUser_1.getUser)
    .delete(authController_1.protect, controllerUser_1.deleteUser)
    .put(authController_1.protect, controllerUser_1.updateUser); // OK
exports.default = routerUser;
