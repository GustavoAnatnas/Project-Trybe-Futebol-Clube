import teams from '../database/models/TeamModel';

export default class TeamServices {
  public static async getTeams() {
    const getAll = await teams.findAll();
    return getAll;
  }

  public static async getTeamById(id: number) {
    const getOne = await teams.findOne({ where: { id } });
    return getOne;
  }
}
