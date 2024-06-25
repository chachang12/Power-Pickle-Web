export default function calculateMMR(team1score, team2score, userData, teammate, opponent1, opponent2) {
    const mmrChange = {};
    const maxMMRChange = 50;
    const minMMRChange = -50;
    let change;

    if (team1score > team2score) {
        // Team 1 won
        change = Math.min(maxMMRChange, Math.max(minMMRChange, team1score - team2score));
        mmrChange[userData.id] = change;
        mmrChange[teammate.id] = change;
        mmrChange[opponent1.id] = -change;
        mmrChange[opponent2.id] = -change;
    } else {
        // Team 2 won
        change = Math.min(maxMMRChange, Math.max(minMMRChange, team2score - team1score));
        mmrChange[userData.id] = -change;
        mmrChange[teammate.id] = -change;
        mmrChange[opponent1.id] = change;
        mmrChange[opponent2.id] = change;
    }

    return mmrChange;
}