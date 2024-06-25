function mmrEquationTop(userMMR, opposingMMRAverage, scoreDifference) {
    const mmrDifference = Math.abs(userMMR - opposingMMRAverage);
    // mmr equation
    const mmrChange = Math.round((25 + (0.001 * mmrDifference)) + (scoreDifference * 0.0000025 * Math.pow(mmrDifference, 2)))
    if (userMMR - mmrChange < 0) {
        mmrChange = userMMR;
    }
    return mmrChange;
}

function mmrEquationBottom(userMMR, opposingMMRAverage, scoreDifference) {
    const mmrDifference = Math.abs(userMMR - opposingMMRAverage);
    // mmr equation
    const mmrChange = Math.round(-(0.00000163) * Math.pow((mmrDifference - (80 * (scoreDifference))), 2) + 25)
    if (mmrChange < 5) {
        return 5;
    }
    if (userMMR - mmrChange < 0) {
        mmrChange = userMMR;
    }
    return mmrChange;

}
// USER IS 1000
// OPONENET is 3500

// USER WINS


export default function calculateMMR(team1score, team2score, userData, teammate, opponent1, opponent2) {
    const mmrChange = {};
    const scoreDifference = Math.abs(team1score - team2score); // absolute value of the difference
    const team1Average = (userData.mmr + teammate.mmr) / 2;
    const team2Average = (opponent1.mmr + opponent2.mmr) / 2;


    if (team1score > team2score) {
        // Team 1 won
        if (userData.mmr > team2Average) {
            // bottom
            mmrChange[userData.id] = mmrEquationBottom(userData.mmr, team2Average, scoreDifference);
            mmrChange[opponent1.id] = -mmrEquationBottom(opponent1.mmr, team1Average, scoreDifference);
            mmrChange[opponent2.id] = -mmrEquationBottom(opponent2.mmr, team1Average, scoreDifference);
        } else {
            mmrChange[userData.id] = mmrEquationTop(userData.mmr, team2Average, scoreDifference);
            mmrChange[opponent1.id] = -mmrEquationTop(opponent1.mmr, team1Average, scoreDifference);
            mmrChange[opponent2.id] = -mmrEquationTop(opponent2.mmr, team1Average, scoreDifference);
        }

        if (teammate.mmr > team2Average) {
            // bottom
            mmrChange[teammate.id] = mmrEquationBottom(teammate.mmr, team2Average, scoreDifference);
            mmrChange[opponent1.id] = -mmrEquationBottom(opponent1.mmr, team1Average, scoreDifference);
            mmrChange[opponent2.id] = -mmrEquationBottom(opponent2.mmr, team1Average, scoreDifference);
        } else {
            mmrChange[teammate.id] = mmrEquationTop(teammate.mmr, team2Average, scoreDifference);
            mmrChange[opponent1.id] = -mmrEquationTop(opponent1.mmr, team1Average, scoreDifference);
            mmrChange[opponent2.id] = -mmrEquationTop(opponent2.mmr, team1Average, scoreDifference);
        }
        
    } else {
        // Team 2 won
        
        if (opponent1.mmr > team1Average) {
            // bottom
            mmrChange[opponent1.id] = mmrEquationBottom(opponent1.mmr, team1Average, scoreDifference);
            mmrChange[userData.id] = -mmrEquationBottom(userData.mmr, team2Average, scoreDifference);
            mmrChange[teammate.id] = -mmrEquationBottom(teammate.mmr, team2Average, scoreDifference);
        } else {
            mmrChange[opponent1.id] = mmrEquationTop(opponent1.mmr, team1Average, scoreDifference);
            mmrChange[userData.id] = -mmrEquationTop(userData.mmr, team2Average, scoreDifference);
            mmrChange[teammate.id] = -mmrEquationTop(teammate.mmr, team2Average, scoreDifference);
        }

        if (opponent2.mmr > team1Average) {
            // bottom
            mmrChange[opponent2.id] = mmrEquationBottom(opponent2.mmr, team1Average, scoreDifference);
            mmrChange[userData.id] = -mmrEquationBottom(userData.mmr, team2Average, scoreDifference);
            mmrChange[teammate.id] = -mmrEquationBottom(teammate.mmr, team2Average, scoreDifference);
        } else {
            mmrChange[opponent2.id] = mmrEquationTop(opponent2.mmr, team1Average, scoreDifference);
            mmrChange[userData.id] = -mmrEquationTop(userData.mmr, team2Average, scoreDifference);
            mmrChange[teammate.id] = -mmrEquationTop(teammate.mmr, team2Average, scoreDifference);
        }
        
    }
    return mmrChange;

}