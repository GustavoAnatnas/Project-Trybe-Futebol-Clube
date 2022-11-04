import { Router } from 'express';
import TeamController from '../Controllers/TeamController';

const Trouter = Router();
const Team = new TeamController();

Trouter.get('/', async (req, res) => Team.getTeams(req, res));
Trouter.get('/:id', async (req, res) => Team.getTeamById(req, res));

export default Trouter;
