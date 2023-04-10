import express from 'express';
import { createUser, loginUser } from '../controller/controllerUser';
import { protect, logout } from '../controller/authController';

const routerUser = express.Router();

routerUser.route('/user').post(createUser); // OK
routerUser.route('/user/authenticate').post(loginUser); // OK
routerUser.route('/user/logout').get(protect, logout); // OK

export default routerUser;
