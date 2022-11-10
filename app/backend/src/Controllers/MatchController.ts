import { Request, Response } from 'express';
import MatchServices from '../Services/MatchServices';

export default class MatchController {
  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await MatchServices.getMatchesInProgress(inProgress === 'true');
      return res.status(200).json(matches);
    }
    const matches = await MatchServices.getMatches();
    return res.status(200).json(matches);
  };

  // updateMatch = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const { homeTeamGoals, awayTeamGoals } = req.body;
  //   const update = await MatchServices.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
  //   return res.status(200).json(update);
  // };
}
