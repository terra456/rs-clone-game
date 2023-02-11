import { RequestHandler } from 'express';
import userModel from '../model/user/userModel';

class UserController {

  createUser: RequestHandler = async (req, res) => {
    userModel.create(req.body)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err.message));
  };

  getUser: RequestHandler = async (req, res) => {
    userModel.getById(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err.message));
  };

  getAllUsers: RequestHandler = async (req, res) => {
    userModel.getAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err.message));
  };

  updateUser: RequestHandler = async (req, res) => {
    userModel.update(req.params.id, req.body)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err.message));
  };

  deleteUser: RequestHandler = async (req, res) => {
    userModel.removeById(req.params.id)
      .then((data) => res.status(204).json(data))
      .catch((err) => res.status(404).json(err.message));
  };
}

export default new UserController();