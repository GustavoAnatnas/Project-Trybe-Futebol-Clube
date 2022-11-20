import { Router } from 'express';
import LeaderboardController from '../Controllers/LeaderboardController';

const Lrouter = Router();
const Leaderboard = new LeaderboardController();

Lrouter.get('/home', async (req, res) => Leaderboard.getHomeLeaderboard(req, res));
Lrouter.get('/away', async (req, res) => Leaderboard.getAwayLeaderboard(req, res));

export default Lrouter;
