export type AdminView =
  | 'login'
  | 'dashboard'
  | 'users'
  | 'games'
  | 'requests-deposits'
  | 'requests-withdrawals'
  | 'notify-announcements'
  | 'notify-carousels'
  | 'notify-push-notification'
  | 'leaderboards-referral'
  // Legacy aliases for backwards compatibility
  | 'games-stats'
  | 'withdraw-request'
  | 'staffs'
  | 'staff-roles'
  | 'staff-permissions'
  | 'staff-action-log'
  | 'admins'
  | 'admins-roles'
  | 'admin-action-log'
  | 'settings-support'
  | 'settings-refer-earn'
  | 'settings-user-wallet'
  | 'settings-payment-gateway'
  | 'settings-withdrawal-methods'
  | 'goto-webapp'
  | 'goto-staffpanel';

export interface StatCardProps {
  id?: string;
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export interface ColoredStatCardProps {
  id?: string;
  bgColor: string;
  icon: React.ReactNode;
  label: string;
  value: string | number;
}
