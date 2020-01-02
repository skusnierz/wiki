import { Router } from 'express';
import coursesController from '../controllers/coursesController';
import { catchAsync } from '../middlewares/errors';
import jwtAuth from '../middlewares/auth'

export default () => {
    const api = Router();

    // GET /courses/:id
    api.get('/:_id', catchAsync(coursesController.findOne));

    // GET /courses
    api.get('/', catchAsync(coursesController.findAll));

    // POST /courses
    api.post('/', catchAsync(coursesController.create));

    // PUT /courses/:id
    api.put('/:_id', catchAsync(coursesController.update));

    // DELETE /courses/:id
    api.delete('/:_id', catchAsync(coursesController.remove));

    return api;
}