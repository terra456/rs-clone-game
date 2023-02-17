import express from 'express';
import userController from '../controller/userController';
import gamesController from '../controller/gamesController';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
// router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.post('/games/user/:id', gamesController.addWinGame);
router.get('/games', gamesController.getVeryAllWinGames);
router.get('/games/:id', gamesController.getWinGame);
router.get('/games/user/:id', gamesController.getAllWinGames);
router.delete('/games/user/:id', gamesController.deleteAllWinGames);
router.post('/saved/user/:id', gamesController.saveGame);
router.get('/saved/:id', gamesController.getSaveGame);
router.get('/saved/user/:id', gamesController.getAllSaveGames);
router.delete('/saved/:id', gamesController.deliteSavedGame);
router.delete('/saved/user/:id', gamesController.deliteAllSavedGames);

router.use((req, res, next) => {
  res.status(500).send('Something broke!');
  next();
});

export default router;

