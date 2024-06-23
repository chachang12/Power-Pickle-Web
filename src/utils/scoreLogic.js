export default function scoreLogic(team1score, team2score) {
    if (team1score > team2score) {
        return 1;
    } else if (team1score < team2score) {
        return 2;
    } else {
        return 0;
    }
}