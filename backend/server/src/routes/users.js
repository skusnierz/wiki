import { Router } from 'express';
import { catchAsync } from "../middlewares/errors";
import userController from '../controllers/userController';
import jwtAuth from '../middlewares/auth';

export default () => {
    const api = Router();

    // GET /users
    api.get('/', userController.findAll);

    // GET /users/:id
    api.get('/:id', jwtAuth ,catchAsync(userController.findOne));

    // DELETE /users/:id
    api.delete('/:id', catchAsync(userController.remove));

    // PUT /users/:id
    api.put('/:id', catchAsync(userController.update));

    return api;
}