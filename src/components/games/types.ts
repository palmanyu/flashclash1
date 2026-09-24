export interface GameRecord {
  gameId: number;
  name: string;
  gameType: string;
  thumbnailUrl?: string;
  updatedAt: string;
  createdAt: string;
}

export type ContestStatus =
  | 'upcoming'
  | 'ongoing'
  | 'cancelled'
  | 'cancelling'
  | 'resulted'
  | 'resulting';

export interface RankPrizeItem {
  id: string;
  rank: string;
  prize: string;
}

export interface ContestRecord {
  contestId: number;
  title: string;
  prizePool: number;
  thumbnailUrl?: string;
  status: ContestStatus;
  schedule: string;
  perKill?: number;
  entryFee?: number;
  playersInTeam?: number;
  maxJoinings?: number;
  rulesCollection?: string;
  mode?: string;
  map?: string;
  roomId?: string;
  roomPass?: string;
  youtubeLink?: string;
  hasYoutubeLink?: boolean;
  prizeDescription?: string;
  rankPrizes?: RankPrizeItem[];
  updatedAt?: string;
  createdAt?: string;
}

export interface ContestJoiningRecord {
  contestJoiningId: number;
  userId: number | string;
  teamNumber: number | string;
  memberPosition: number | string;
  inGameName: string;
  inGameId: string;
  joinedAt?: string;
}

export interface ContestResultRecord {
  contestJoiningId: number;
  userId: number | string;
  teamNumber: number | string;
  memberPosition: number | string;
  inGameName: string;
  inGameId: string;
  kills: number;
  rank: number;
  rankPrize: number;
  totalWinning: number;
}

export interface ContestRefundRecord {
  contestJoiningId: number;
  joinedBy: number | string;
  teamNumber: number | string;
  memberPosition: number | string;
  inGameName: string;
  inGameId: string;
  kills: number;
  rank: number;
  rankPrize: number;
  totalWinning: number;
  isWalletUpdated: boolean | string;
}
