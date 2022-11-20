import { Router } from 'express';
import MatchController from '../Controllers/MatchController';
// import tokenAuth from '../Middleware/TokenMiddleware';
import validateMatch from '../Middleware/CreateMatchMiddleware';

const Mrouter = Router();
const Match = new MatchController();

Mrouter.get('/', async (req, res) => Match.getMatches(req, res));
Mrouter.post('/', validateMatch, async (req, res) => Match.createMatch(req, res));
Mrouter.patch('/:id/finish', async (req, res) => Match.finishMatch(req, res));
Mrouter.patch('/:id', async (req, res) => Match.updateMatch(req, res));

export default Mrouter;
