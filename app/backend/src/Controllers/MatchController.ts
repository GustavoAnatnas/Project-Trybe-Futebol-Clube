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
}
