import { Request, Response } from 'express';
import LeaderboardServices from '../Services/LeaderboardServices';

export default class LeaderboardController {
  public getHomeLeaderboard = async (req: Request, res: Response) => {
    const homeLeaderboard = await LeaderboardServices.getHomeLeaderboard();
    return res.status(200).json(homeLeaderboard);
  };

  public getAwayLeaderboard = async (req: Request, res: Response) => {
    const awayLeaderboard = await LeaderboardServices.getAwayLeaderboard();
    return res.status(200).json(awayLeaderboard);
  };

  public getLeaderboard = async (req: Request, res: Response) => {
    const leaderboard = await LeaderboardServices.getLeaderboard();
    return res.status(200).json(leaderboard);
  };
}
