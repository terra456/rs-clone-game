import express from 'express';
import userController from '../controller/userController';

const userRouter = express.Router();

userRouter.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

userRouter.get('/users', userController.getAllUsers);
userRouter.post('/users', userController.createUser);
userRouter.get('/users/:id', userController.getUser);
userRouter.put('/users', userController.updateUser);
userRouter.delete('/users/:id', userController.deleteUser);

export default userRouter;

