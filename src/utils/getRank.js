import { unranked, rank1, rank2, rank3, rank4 } from '../assets'
export default function getRankImage(mmr) {
    if (mmr === 0 || mmr === null) {
      return unranked;
    } else if (mmr >= 1 && mmr <= 1000) {
      return rank1;
    } else if (mmr > 1000 && mmr <= 2000) {
      return rank2;
    } else if (mmr > 2000 && mmr <= 3000) {
      return rank3;
    } else if (mmr > 3000) {
      return rank4;
    }
  }