import express, { Request, Response } from 'express';
import { createUser, loginUser } from '../controller/controllerUser';

const routerUser = express.Router();

routerUser.route('/user').post(createUser); // Rota para cadastrar um novo usuário - TODO:Em Desenvolvimento
routerUser.route('/user/authenticate').post(loginUser); // Rota para logar com as credenciais do usuário - TODO:Em Desenvolvimento

export default routerUser;
