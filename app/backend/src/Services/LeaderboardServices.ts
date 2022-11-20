import models from '../database/models';

const queryLeaderboardHome = `SELECT
t.team_name as name,
(SUM(m.home_team_goals > m.away_team_goals) * 3) + 
(SUM(m.home_team_goals = m.away_team_goals)) as totalPoints,
COUNT(m.home_team) as totalGames,
SUM(m.home_team_goals > m.away_team_goals) as totalVictories,
SUM(m.home_team_goals = m.away_team_goals) as totalDraws,
SUM(m.home_team_goals < m.away_team_goals) as totalLosses,
SUM(m.home_team_goals) as goalsFavor,
SUM(m.away_team_goals) as goalsOwn,
SUM(m.home_team_goals) - SUM(m.away_team_goals) as goalsBalance,
ROUND(((SUM(m.home_team_goals > m.away_team_goals) * 3) + 
(SUM(m.home_team_goals = m.away_team_goals))) / 
(COUNT(team_name) * 3) * 100, 2) as efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches as m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t
ON m.home_team = t.id
WHERE m.in_progress = 0
GROUP BY m.home_team
ORDER BY totalPoints DESC,
totalVictories DESC, 
goalsBalance DESC, 
goalsFavor DESC, 
goalsOwn DESC`;

const queryLeaderboardAway = `SELECT
t.team_name as name,
(SUM(m.away_team_goals > m.home_team_goals) * 3) + 
(SUM(m.away_team_goals = m.home_team_goals)) as totalPoints,
COUNT(m.away_team) as totalGames,
SUM(m.away_team_goals > m.home_team_goals) as totalVictories,
SUM(m.away_team_goals = m.home_team_goals) as totalDraws,
SUM(m.away_team_goals < m.home_team_goals) as totalLosses,
SUM(m.away_team_goals) as goalsFavor,
SUM(m.home_team_goals) as goalsOwn,
SUM(m.away_team_goals) - SUM(m.home_team_goals) as goalsBalance,
ROUND(((SUM(m.away_team_goals > m.home_team_goals) * 3) + 
(SUM(m.away_team_goals = m.home_team_goals))) / 
(COUNT(team_name) * 3) * 100, 2) as efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches as m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t
ON m.away_team = t.id
WHERE m.in_progress = 0
GROUP BY m.away_team
ORDER BY totalPoints DESC,
totalVictories DESC, 
goalsBalance DESC, 
goalsFavor DESC, 
goalsOwn DESC`;

export default class LeaderboardServices {
  static getHomeLeaderboard = async () => {
    const [homeLeaderboard] = await models.query(queryLeaderboardHome);
    return homeLeaderboard;
  };

  static getAwayLeaderboard = async () => {
    const [awayLeaderboard] = await models.query(queryLeaderboardAway);
    return awayLeaderboard;
  };
}
