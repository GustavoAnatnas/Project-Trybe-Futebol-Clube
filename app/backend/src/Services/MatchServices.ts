import Match from '../database/models/MatchModel';
import teams from '../database/models/TeamModel';
// import { iCreateMatch } from './interface/ICreateMatch';

export default class MatchServices {
  static getMatches = async () => {
    const matches = await Match.findAll({
      include: [
        {
          model: teams,
          as: 'teamHome',
        },
        {
          model: teams,
          as: 'teamAway',
        },
      ],
    });
    return matches;
  };

  static getMatchesInProgress = async (inProgress: boolean) => {
    const matches = await Match.findAll({
      where: {
        inProgress,
      },
      include: [
        {
          model: teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  };

  static createMatch = async (require: Match) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = require;
    const match = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return { status: 201, match };
  };

  static finishMatch = async (id: number) => {
    const match = await Match.update({ inProgress: false }, { where: { id } });
    return match;
  };

  // static updateMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
  //   const update = await Match.update(
  //     { homeTeamGoals, awayTeamGoals },
  //     {
  //       where:
  //       {
  //         id,
  //       },
  //     },
  //   );
  //   return update;
  // };
}
