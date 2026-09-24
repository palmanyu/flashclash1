export type NavTab = 'earn' | 'leaderboard' | 'home' | 'wallet' | 'profile' | 'menu';

export type MatchCategory = 'ongoing' | 'upcoming' | 'completed';

export interface TournamentCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  gameMode: string;
  activePlayers: number;
  entryFee: number;
  prizePool: number;
  perKill: number;
  type: string;
  map: string;
  time: string;
  spotsTotal: number;
  spotsFilled: number;
  themeColor: 'orange' | 'cyan' | 'purple' | 'red';
  characterType: 'bandana' | 'cowboy' | 'cyborg' | 'ninja' | 'rebel' | 'skull';
  imageUrl?: string;
  thumbnailUrl?: string;
}

export interface RuleItem {
  id: number;
  title: string;
  desc: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  referCode?: string;
  isLoggedIn: boolean;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  referCode?: string;
  password: string;
}

export interface LoginFormData {
  identifier: string; // username, email, or phone
  password: string;
}
