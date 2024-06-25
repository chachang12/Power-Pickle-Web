class MatchModel {
    constructor({ team1PlayerIds, team2PlayerIds, team1score, team2score, winnerIds, date, mmrChanges }) {
        this.team1PlayerIds = team1PlayerIds;
        this.team2PlayerIds = team2PlayerIds;
        this.team1score = team1score;
        this.team2score = team2score;
        this.winnerIds = winnerIds;
        this.date = date;
        this.mmrChanges = mmrChanges; // New property
    }

    toObject() {
        return {
            team1PlayerIds: this.team1PlayerIds,
            team2PlayerIds: this.team2PlayerIds,
            team1score: this.team1score,
            team2score: this.team2score,
            winnerIds: this.winnerIds,
            date: this.date,
            mmrChanges: this.mmrChanges // New property
        };
    }
}

export default MatchModel;