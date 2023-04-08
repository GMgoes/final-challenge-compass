import express from 'express';
import { createUser, loginUser } from '../controller/controllerUser';
import { protect, logout } from '../controller/authController';

const routerUser = express.Router();

routerUser.route('/user').post(createUser); // Rota para cadastrar um novo usuário
routerUser.route('/user/authenticate').post(loginUser); // Rota para logar com as credenciais do usuário
routerUser.route('/user/logout').get(protect, logout); // Rota para deslogar o usuário atual

export default routerUser;
