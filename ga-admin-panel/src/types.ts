export type AdminView =
  | 'login'
  | 'dashboard'
  | 'games-stats'
  | 'withdraw-request'
  | 'staffs'
  | 'staff-roles'
  | 'staff-role-permission'
  | 'staff-permissions'
  | 'staff-action-log'
  | 'admins'
  | 'admins-roles'
  | 'admin-role-permission'
  | 'admin-action-log'
  | 'settings-support'
  | 'settings-refer-earn'
  | 'settings-user-wallet'
  | 'settings-payment-gateway'
  | 'settings-withdrawal-methods'
  | 'goto-webapp'
  | 'goto-staffpanel';

export interface RouteInfo {
  view: AdminView;
  params?: Record<string, string | number>;
  path?: string;
}

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
