/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { RequestHandler } from 'express';
import { UserType } from 'types';
import UserModel from '../model/userModel';

class UserController {

  createUser: RequestHandler = async (req, res) => {
    UserModel.create(req.body)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err.message));
  };

  getUser: RequestHandler = async (req, res) => {
    UserModel.getById(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err.message));
  };

  getAllUsers: RequestHandler = async (req, res) => {
    UserModel.getAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err.message));
  };

  updateUser: RequestHandler = async (req, res) => {
    UserModel.getById(req.params.id)
      .then(() => {
        UserModel.create(req.body)
          .then(data => res.status(200).json(data))
          .catch(err => res.status(400).json(err.message));
      })
      .catch(err => res.status(404).json(err.message));
  };

  deleteUser: RequestHandler = async (req, res) => {
    UserModel.removeById(req.params.id)
      .then((data) => res.status(204).json(data))
      .catch((err) => res.status(404).json(err.message));
  };
}

export default new UserController();