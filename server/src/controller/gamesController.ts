import { RequestHandler } from 'express';
import gamesModel from '../model/games/gamesModel';

class GamesController {

  addWinGame: RequestHandler = async (req, res) => {
    gamesModel.addWin(req.params.id, req.body)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(404).json(err.message));
  };

  getWinGame: RequestHandler = async (req, res) => {
    gamesModel.getWinGame(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err.message));
  };

  getAllWinGames: RequestHandler = async (req, res) => {
    gamesModel.getAllWinGames(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err.message));
  };

  getVeryAllWinGames: RequestHandler = async (req, res) => {
    gamesModel.getVeryAllWinGames()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err.message));
  };

  deleteAllWinGames: RequestHandler = async (req, res) => {
    gamesModel.deleteAllWinGames(req.params.id)
      .then(() => res.status(204))
      .catch(err => res.status(404).json(err.message));
  };

  saveGame: RequestHandler = async (req, res) => {
    gamesModel.saveGame(req.params.id, req.body)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err.message));
  };

  getSaveGame: RequestHandler = async (req, res) => {
    gamesModel.getSavedGame(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err.message));
  };

  getAllSaveGames: RequestHandler = async (req, res) => {
    gamesModel.getAllSaved(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err.message));
  };

  deliteSavedGame: RequestHandler = async (req, res) => {
    gamesModel.deleteSavedGame(req.params.id)
      .then(() => res.status(204))
      .catch(err => res.status(404).json(err.message));
  };

  deliteAllSavedGames: RequestHandler = async (req, res) => {
    gamesModel.deleteAllSavedGames(req.params.id)
      .then(() => res.status(204))
      .catch(err => res.status(404).json(err.message));
  };
}

export default new GamesController();