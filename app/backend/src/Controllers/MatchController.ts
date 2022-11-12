import { Request, Response } from 'express';
import MatchServices from '../Services/MatchServices';
// import { iCreateMatch } from '../Services/interface/ICreateMatch';

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

  createMatch = async (req: Request, res: Response) => {
    const { body } = req;
    const match = await MatchServices.createMatch(body);
    return res.status(match.status).json(match.match);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await MatchServices.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  // updateMatch = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const { homeTeamGoals, awayTeamGoals } = req.body;
  //   const update = await MatchServices.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
  //   return res.status(200).json(update);
  // };
}
