// Date utilities for GA Admin Panel - Daily Views & Strict Past-Date Constraints

export function getTodayDate(): Date {
  return new Date();
}

export function toISODateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseISODate(dateStr: string): Date {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return new Date(y, m, d);
  }
  return new Date();
}

export function formatDailyDate(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? parseISODate(dateInput) : dateInput;
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNum = date.getDate();
  const year = date.getFullYear();

  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${dayName}, ${monthName} ${getOrdinal(dayNum)} ${year}`;
}

export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const s1 = typeof date1 === 'string' ? date1 : toISODateString(date1);
  const s2 = typeof date2 === 'string' ? date2 : toISODateString(date2);
  return s1 === s2;
}

export function isFutureDate(targetDateStr: string, maxDateStr: string): boolean {
  return targetDateStr > maxDateStr;
}

export function getPreviousDayISO(currentDateStr: string): string {
  const d = parseISODate(currentDateStr);
  d.setDate(d.getDate() - 1);
  return toISODateString(d);
}

export function getNextDayISO(currentDateStr: string, maxDateStr: string): string {
  const d = parseISODate(currentDateStr);
  d.setDate(d.getDate() + 1);
  const nextIso = toISODateString(d);
  if (nextIso > maxDateStr) {
    return maxDateStr;
  }
  return nextIso;
}

// Pseudo-random deterministic daily stats generator based on date string
function hashDateString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export interface DailyGameStats {
  totalEntryFees: number;
  totalNetEarnings: number;
  totalContests: number;
  totalJoinings: number;
  games: {
    id: number;
    name: string;
    type: 'contest' | 'challenge';
    contests: number;
    joinings: number;
    entryFee: number;
    netEarnings: number;
  }[];
}

export function getDailyGameStats(dateStr: string): DailyGameStats {
  const hash = hashDateString(dateStr);
  const d = parseISODate(dateStr);
  const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Weekend multiplier for realistic gaming behavior
  const multiplier = isWeekend ? 1.6 : 1.0;
  const baseJoinings = Math.round(((hash % 60) + 40) * multiplier);
  const baseContests = Math.max(4, Math.round(baseJoinings / 7));
  const baseFee = Math.round(baseJoinings * ((hash % 30) + 25));
  const baseNet = Math.round(baseFee * 0.18);

  const masterGameList = [
    { id: 48, name: 'FF FULL MAP', type: 'contest' as const, baseShare: 0.35 },
    { id: 50, name: 'BR SURVIVAL', type: 'contest' as const, baseShare: 0.28 },
    { id: 51, name: 'CLASH SQUAD', type: 'contest' as const, baseShare: 0.20 },
    { id: 52, name: 'LONE WOLF', type: 'contest' as const, baseShare: 0.10 },
    { id: 53, name: 'CS ( gun skin on)', type: 'contest' as const, baseShare: 0.07 },
  ];

  const games = masterGameList.map((g) => {
    const gJoinings = Math.round(baseJoinings * g.baseShare);
    const gContests = Math.max(1, Math.round(gJoinings / 6));
    const gFee = Math.round(baseFee * g.baseShare);
    const gNet = Math.round(gFee * 0.18);
    return {
      id: g.id,
      name: g.name,
      type: g.type,
      contests: gContests,
      joinings: gJoinings,
      entryFee: gFee,
      netEarnings: gNet,
    };
  });

  return {
    totalEntryFees: baseFee,
    totalNetEarnings: baseNet,
    totalContests: baseContests,
    totalJoinings: baseJoinings,
    games,
  };
}

export interface WithdrawalRequestItem {
  id: string;
  userName: string;
  userPhone: string;
  method: 'UPI' | 'Paytm' | 'Bank Transfer' | 'PhonePe';
  accountDetail: string;
  amount: number;
  time: string;
  status: 'Completed' | 'Pending' | 'Rejected';
  txnId: string;
}

export interface DailyWithdrawalStats {
  totalCount: number;
  totalAmount: number;
  completedCount: number;
  completedAmount: number;
  pendingCount: number;
  pendingAmount: number;
  requests: WithdrawalRequestItem[];
}

export function getDailyWithdrawalStats(dateStr: string): DailyWithdrawalStats {
  const hash = hashDateString(dateStr);
  const d = parseISODate(dateStr);
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;

  const totalCount = Math.max(6, ((hash % 18) + 12) * (isWeekend ? 1.4 : 1.0));
  const roundedCount = Math.round(totalCount);

  // 70% to 85% completed, remaining pending
  const completedRate = 0.75 + ((hash % 15) / 100);
  const completedCount = Math.min(roundedCount, Math.round(roundedCount * completedRate));
  const pendingCount = Math.max(0, roundedCount - completedCount);

  const sampleUsers = [
    { name: 'Rahul Sharma', phone: '+91 98765 43210', method: 'UPI' as const, detail: 'rahul@upi' },
    { name: 'Aman Verma', phone: '+91 87654 32109', method: 'Paytm' as const, detail: '8765432109' },
    { name: 'Priya Patel', phone: '+91 91234 56789', method: 'PhonePe' as const, detail: 'priya@ybl' },
    { name: 'Vikram Singh', phone: '+91 99887 76655', method: 'Bank Transfer' as const, detail: 'HDFC0001234' },
    { name: 'Sameer Khan', phone: '+91 98112 23344', method: 'UPI' as const, detail: 'sameer@okaxis' },
    { name: 'Rohit Joshi', phone: '+91 97223 34455', method: 'Paytm' as const, detail: '9722334455' },
    { name: 'Anjali Gupta', phone: '+91 96334 45566', method: 'PhonePe' as const, detail: 'anjali@ibl' },
    { name: 'Deepak Kumar', phone: '+91 95445 56677', method: 'UPI' as const, detail: 'deepak@paytm' },
  ];

  let completedAmount = 0;
  let pendingAmount = 0;
  const requests: WithdrawalRequestItem[] = [];

  for (let i = 0; i < roundedCount; i++) {
    const userIndex = (hash + i * 7) % sampleUsers.length;
    const user = sampleUsers[userIndex];
    const amount = 500 + ((hash * (i + 1) * 31) % 4500);
    const roundedAmount = Math.round(amount / 50) * 50;

    const isCompleted = i < completedCount;
    if (isCompleted) {
      completedAmount += roundedAmount;
    } else {
      pendingAmount += roundedAmount;
    }

    const hour = 9 + ((hash + i * 3) % 12);
    const minute = (hash * (i + 1) * 13) % 60;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const timeStr = `${displayHour}:${String(minute).padStart(2, '0')} ${ampm}`;

    requests.push({
      id: `WREQ-${hash % 900 + 100}-${i + 1}`,
      userName: user.name,
      userPhone: user.phone,
      method: user.method,
      accountDetail: user.detail,
      amount: roundedAmount,
      time: timeStr,
      status: isCompleted ? 'Completed' : 'Pending',
      txnId: `TXN${Math.abs((hash * 997 + i * 1337) % 899999 + 100000)}`,
    });
  }

  // Sort: Pending first, then completed
  requests.sort((a, b) => {
    if (a.status === 'Pending' && b.status !== 'Pending') return -1;
    if (a.status !== 'Pending' && b.status === 'Pending') return 1;
    return 0;
  });

  return {
    totalCount: roundedCount,
    totalAmount: completedAmount + pendingAmount,
    completedCount,
    completedAmount,
    pendingCount,
    pendingAmount,
    requests,
  };
}
