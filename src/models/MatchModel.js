class MatchModel {
    constructor(id, team1PlayerIds, team2PlayerIds, team1Score, team2Score, winnerIds, date) {
        this.id = id;
        this.team1PlayerIds = team1PlayerIds;
        this.team2PlayerIds = team2PlayerIds;
        this.team1Score = team1Score;
        this.team2Score = team2Score;
        this.winnerIds = winnerIds;
        this.date = date;
    }
}

export default MatchModel;