import { Request, Response } from 'express';
import TeamServices from '../Services/TeamServices';

export default class TeamController {
  constructor(readonly service = new TeamServices()) {}

  getTeams = async (req: Request, res: Response) => {
    const teams = await TeamServices.getTeams();
    return res.status(200).json(teams);
  };

  getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await TeamServices.getTeamById(Number(id));
    return res.status(200).json(team);
  };
}
