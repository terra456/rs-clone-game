/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { RequestHandler } from 'express';
import { UserType } from 'types';
import UserModel from '../model/userModel';

class UserController {
  // createUser(req: Request, res: Response) => Promise;

  createUser: RequestHandler = (req, res) => {
    try {
      const post = UserModel.create(req.body);
      res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  };

  // async getUser(req, res) {
  //   return res.json(userModel.getAll())
  // }

  // async getAllUsers(req, res) {

  // }

  // async updateUser(req, res) {

  // }

  // async deliteUser(req: Request, res: Response) {

  // }
}

export default new UserController();