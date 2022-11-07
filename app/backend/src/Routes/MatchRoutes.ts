import { Router } from 'express';
import MatchController from '../Controllers/MatchController';

const Mrouter = Router();
const Match = new MatchController();

Mrouter.get('/', async (req, res) => Match.getMatches(req, res));

export default Mrouter;
