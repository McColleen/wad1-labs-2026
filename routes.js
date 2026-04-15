'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";

import accounts from './controllers/accounts.js';
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import playlist from './controllers/playlist.js';
import stats from './controllers/stats.js';

router.get('/', accounts.index);
router.get('/start', start.createView);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/logout', accounts.logout);
router.get('/dashboard', dashboard.createView);
router.get('/searchCategory', dashboard.createView);
router.get('/sortData', dashboard.createView);
router.get('/about', about.createView);
router.get('/stats', stats.createView);
router.get('/playlist/:id', playlist.createView);
router.get('/playlist/:id/deletesong/:songid', playlist.deleteSong);
router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);
router.post('/playlist/:id/addsong', playlist.addSong);
router.post('/playlist/:id/updatesong/:songid', playlist.updateSong);

router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;


