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

const query = `SELECT
name,
SUM(complete.totalPoints) AS totalPoints,
SUM(totalGames) AS totalGames,
SUM(totalVictories) AS totalVictories,
SUM(totalDraws) AS totalDraws,
SUM(totalLosses) AS totalLosses,
SUM(goalsFavor) AS goalsFavor,
SUM(goalsOwn) AS goalsOwn,
SUM(goalsBalance) AS goalsBalance,
ROUND((((SUM(totalVictories) * 3) + SUM(totalDraws)) / 
  (SUM(totalGames) * 3)) * 100, 2) AS efficiency
FROM( SELECT t.team_name AS name,
(SUM(IF (m.home_team_goals > m.away_team_goals, 3, 0)) +
SUM(IF (m.home_team_goals < m.away_team_goals, 0, 0)) +
SUM(IF (m.home_team_goals = m.away_team_goals, 1, 0))) AS totalPoints,
COUNT(t.team_name) AS totalGames,
SUM(IF (m.home_team_goals > m.away_team_goals, 1, 0)) AS totalVictories,
SUM(IF (m.home_team_goals = m.away_team_goals, 1, 0)) AS totalDraws,
SUM(IF (m.home_team_goals < m.away_team_goals, 1, 0)) AS totalLosses,
SUM(m.home_team_goals) AS goalsFavor,
SUM(m.away_team_goals) AS goalsOwn,
(SUM(m.home_team_goals) - SUM(m.away_team_goals)) AS goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.teams AS t
JOIN TRYBE_FUTEBOL_CLUBE.matches AS m
ON t.id = m.home_team
WHERE m.in_progress = 0
GROUP BY t.team_name
UNION ALL
SELECT t.team_name AS name,
(SUM(IF (m.away_team_goals > m.home_team_goals, 3, 0)) +
SUM(IF (m.away_team_goals < m.home_team_goals, 0, 0)) +
SUM(IF (m.away_team_goals = m.home_team_goals, 1, 0))) AS totalPoints,
COUNT(t.team_name) AS totalGames,
SUM(IF (m.away_team_goals > m.home_team_goals, 1, 0)) AS totalVictories,
SUM(IF (m.away_team_goals = m.home_team_goals, 1, 0)) AS totalDraws,
SUM(IF (m.away_team_goals < m.home_team_goals, 1, 0)) AS totalLosses,
SUM(m.away_team_goals) AS goalsFavor,
SUM(m.home_team_goals) AS goalsOwn,
(SUM(m.away_team_goals) - SUM(m.home_team_goals)) AS goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.teams AS t
JOIN TRYBE_FUTEBOL_CLUBE.matches AS m
ON t.id = m.away_team
WHERE m.in_progress = 0
GROUP BY t.team_name
) AS complete
GROUP BY complete.name
ORDER BY totalPoints DESC, totalVictories, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;

export default class LeaderboardServices {
  static getHomeLeaderboard = async () => {
    const [homeLeaderboard] = await models.query(queryLeaderboardHome);
    return homeLeaderboard;
  };

  static getAwayLeaderboard = async () => {
    const [awayLeaderboard] = await models.query(queryLeaderboardAway);
    return awayLeaderboard;
  };

  static getLeaderboard = async () => {
    const [leaderboard] = await models.query(query);
    return leaderboard;
  };
}
