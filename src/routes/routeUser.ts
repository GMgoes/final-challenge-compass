import express from 'express';
import {
  createUser,
  getUsers,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
} from '../controller/controllerUser';
import { protect, logout } from '../controller/authController';

const routerUser = express.Router();

routerUser.route('/user').post(createUser).get(getUsers); // OK
routerUser.route('/user/authenticate').post(loginUser); // OK
routerUser.route('/user/logout').get(protect, logout); // OK
routerUser
  .route('/user/:id')
  .get(getUser)
  .delete(protect, deleteUser)
  .put(protect, updateUser); // OK

export default routerUser;
