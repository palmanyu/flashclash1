import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ArrowLeftRight,
  Wallet,
  Lock,
  Tag,
  Trash2,
  X,
} from 'lucide-react';
import { ColumnsDropdown, ColumnItem } from './ColumnsDropdown';
import { RowsPerPageDropdown } from './RowsPerPageDropdown';
import { useNotification } from '../context/NotificationContext';
import { AppRoute, navigateToPath, buildUserTransactionsUrl } from '../utils/navigation';

export interface UserRecord {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobileNumber: string;
  depositWallet: number;
  winWallet: number;
  status: 'active' | 'banned';
  statusDescription?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface UserTransaction {
  userId?: number;
  userWalletTransactionId: number;
  walletType: 'depositWallet' | 'winWallet';
  transactionType: 'credit' | 'debit';
  amount: number;
  newBalance: number;
  description: string;
  createdAt: string;
}

// 70 realistic users starting with the exact ones from the user's screenshots
const INITIAL_USERS: UserRecord[] = [
  {
    userId: 1,
    firstName: 'primexop',
    lastName: 'devs',
    username: 'primexop',
    email: 'support@primexop.com',
    mobileNumber: '9834877006',
    depositWallet: 1056,
    winWallet: 1036,
    status: 'banned',
    statusDescription: 'Account suspended due to policy audit',
    updatedAt: '31/07/2026, 7:03 PM',
    createdAt: '12/05/2026, 11:20 AM',
  },
  {
    userId: 19,
    firstName: 'Dhruv',
    lastName: 'Gogiya',
    username: 'dhruv89',
    email: 'gogiyadhruv99@gmail.com',
    mobileNumber: '7351854089',
    depositWallet: 75,
    winWallet: 45,
    status: 'active',
    statusDescription: 'Normal user',
    updatedAt: '01/08/2026, 10:15 AM',
    createdAt: '15/05/2026, 03:45 PM',
  },
  {
    userId: 27,
    firstName: 'Suvojit',
    lastName: '360',
    username: 'suvojit360',
    email: 'shsj31591@gmail.com',
    mobileNumber: '6289527817',
    depositWallet: 0,
    winWallet: 0,
    status: 'active',
    statusDescription: 'New registered account',
    updatedAt: '02/08/2026, 08:30 PM',
    createdAt: '18/05/2026, 09:12 AM',
  },
  {
    userId: 28,
    firstName: 'Djjdd',
    lastName: 'Djjjd',
    username: 'djjjdj_8483',
    email: 'gamerrboydi51@gmail.com',
    mobileNumber: '7007643464',
    depositWallet: 44970,
    winWallet: 64556,
    status: 'active',
    statusDescription: 'VIP high roller player',
    updatedAt: '03/08/2026, 02:40 PM',
    createdAt: '20/05/2026, 04:22 PM',
  },
  {
    userId: 29,
    firstName: 'Hhdnnd',
    lastName: 'Shnxn',
    username: 'shsj',
    email: 'djjdfjfjiwwi@gmail.com',
    mobileNumber: '8377474838',
    depositWallet: 10068,
    winWallet: 49280,
    status: 'active',
    statusDescription: 'Active tournament participant',
    updatedAt: '03/08/2026, 06:10 PM',
    createdAt: '22/05/2026, 01:15 PM',
  },
  {
    userId: 30,
    firstName: 'Niraj',
    lastName: 'Singh',
    username: 'gff',
    email: 'fzjjgddgghutsdjjjvxzay@gmai.com',
    mobileNumber: '6557745766',
    depositWallet: 0,
    winWallet: 0,
    status: 'active',
    statusDescription: 'Standard member',
    updatedAt: '04/08/2026, 11:00 AM',
    createdAt: '25/05/2026, 10:04 AM',
  },
  {
    userId: 31,
    firstName: 'cheein',
    lastName: 'kang',
    username: 'cheein',
    email: 'cheeinkang@gmail.com',
    mobileNumber: '9211420420',
    depositWallet: 122,
    winWallet: 0,
    status: 'active',
    statusDescription: 'Standard account',
    updatedAt: '05/08/2026, 09:45 AM',
    createdAt: '27/05/2026, 02:30 PM',
  },
  {
    userId: 32,
    firstName: 'Rehan',
    lastName: 'Ahamed',
    username: 'rehan_khan',
    email: 'rehan74343r@gmail.com',
    mobileNumber: '6464949494',
    depositWallet: 1060,
    winWallet: 3427,
    status: 'active',
    statusDescription: 'Regular user',
    updatedAt: '05/08/2026, 04:20 PM',
    createdAt: '28/05/2026, 11:15 AM',
  },
  {
    userId: 34,
    firstName: 'Djdj',
    lastName: 'Jddj',
    username: 'sjjs',
    email: 'reha486000r@gmail.com',
    mobileNumber: '4838838383',
    depositWallet: 984,
    winWallet: 35,
    status: 'active',
    statusDescription: 'Verified player',
    updatedAt: '06/08/2026, 01:10 PM',
    createdAt: '30/05/2026, 05:40 PM',
  },
  {
    userId: 35,
    firstName: 'Sjss',
    lastName: 'Jdjdd',
    username: 'susjd',
    email: 'reha3390r@gmail.com',
    mobileNumber: '3838383883',
    depositWallet: 984,
    winWallet: 30,
    status: 'active',
    statusDescription: 'Verified player',
    updatedAt: '06/08/2026, 03:22 PM',
    createdAt: '01/06/2026, 09:00 AM',
  },
  // Additional users up to 70 total items
  ...Array.from({ length: 60 }, (_, idx) => {
    const id = idx + 36;
    const names = [
      ['Aman', 'Verma', 'aman_v'],
      ['Karan', 'Mehta', 'karan_m'],
      ['Pooja', 'Sharma', 'pooja_s'],
      ['Rohan', 'Gupta', 'rohan_g'],
      ['Vikram', 'Rathore', 'vikram_r'],
      ['Sneha', 'Patel', 'sneha_p'],
      ['Manish', 'Tiwari', 'manish_t'],
      ['Ananya', 'Roy', 'ananya_r'],
      ['Deepak', 'Yadav', 'deepak_y'],
      ['Suresh', 'Nair', 'suresh_n'],
    ];
    const [first, last, uname] = names[idx % names.length];
    const isBanned = idx % 11 === 0;
    return {
      userId: id,
      firstName: first,
      lastName: `${last} ${id}`,
      username: `${uname}_${id}`,
      email: `${uname}${id}@example.com`,
      mobileNumber: `98${String(10000000 + id * 12345).slice(0, 8)}`,
      depositWallet: (id * 37) % 5000,
      winWallet: (id * 83) % 12000,
      status: isBanned ? ('banned' as const) : ('active' as const),
      statusDescription: isBanned ? 'Violated terms' : 'Good standing',
      updatedAt: '07/08/2026, 12:00 PM',
      createdAt: '02/06/2026, 10:00 AM',
    };
  }),
];

// Initial transactions for userId: 1 from Image 5
const INITIAL_TRANSACTIONS: UserTransaction[] = [
  {
    userWalletTransactionId: 346,
    walletType: 'depositWallet',
    transactionType: 'credit',
    amount: 20,
    newBalance: 1056,
    description: 'Deposit Request Approved. id:158',
    createdAt: '31/07/2026, 7:03 PM',
  },
  {
    userWalletTransactionId: 345,
    walletType: 'depositWallet',
    transactionType: 'credit',
    amount: 10,
    newBalance: 310,
    description: '',
    createdAt: '30/07/2026, 4:02 PM',
  },
  {
    userWalletTransactionId: 344,
    walletType: 'depositWallet',
    transactionType: 'credit',
    amount: 100,
    newBalance: 300,
    description: '',
    createdAt: '29/07/2026, 2:12 PM',
  },
  {
    userWalletTransactionId: 343,
    walletType: 'depositWallet',
    transactionType: 'credit',
    amount: 100,
    newBalance: 200,
    description: '',
    createdAt: '29/07/2026, 12:58 PM',
  },
  {
    userWalletTransactionId: 342,
    walletType: 'winWallet',
    transactionType: 'debit',
    amount: 10,
    newBalance: 1036,
    description: '',
    createdAt: '26/07/2026, 11:03 PM',
  },
  {
    userWalletTransactionId: 341,
    walletType: 'winWallet',
    transactionType: 'debit',
    amount: 100,
    newBalance: 1046,
    description: '',
    createdAt: '26/07/2026, 11:03 PM',
  },
  {
    userWalletTransactionId: 340,
    walletType: 'winWallet',
    transactionType: 'debit',
    amount: 100,
    newBalance: 1146,
    description: '',
    createdAt: '26/07/2026, 11:02 PM',
  },
  {
    userWalletTransactionId: 339,
    walletType: 'depositWallet',
    transactionType: 'debit',
    amount: 10,
    newBalance: 100,
    description: '',
    createdAt: '26/07/2026, 11:02 PM',
  },
  {
    userWalletTransactionId: 338,
    walletType: 'winWallet',
    transactionType: 'credit',
    amount: 100,
    newBalance: 1246,
    description: '',
    createdAt: '26/07/2026, 10:39 PM',
  },
  {
    userWalletTransactionId: 337,
    walletType: 'winWallet',
    transactionType: 'credit',
    amount: 100,
    newBalance: 1146,
    description: '11',
    createdAt: '25/07/2026, 11:01 PM',
  },
  // Additional transactions to make Total 49 Items as shown in screenshot
  ...Array.from({ length: 39 }, (_, i) => {
    const id = 336 - i;
    const isDeposit = i % 2 === 0;
    const isCredit = i % 3 !== 0;
    return {
      userWalletTransactionId: id,
      walletType: isDeposit ? ('depositWallet' as const) : ('winWallet' as const),
      transactionType: isCredit ? ('credit' as const) : ('debit' as const),
      amount: ((i + 1) * 25) % 300 + 20,
      newBalance: 1000 - i * 15,
      description: i % 4 === 0 ? `Deposit Request Approved. id:${150 - i}` : '',
      createdAt: `2${4 - Math.floor(i / 3)}/07/2026, ${10 - (i % 6)}:00 PM`,
    };
  }),
];

// Table column definitions for ColumnsDropdown
const USERS_COLUMNS: ColumnItem[] = [
  { key: 'userId', label: 'userId' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'mobileNumber', label: 'Mobile Number' },
  { key: 'depositWallet', label: 'Deposit Wallet' },
  { key: 'winWallet', label: 'Win Wallet' },
  { key: 'status', label: 'Status' },
  { key: 'statusDescription', label: 'Status Description' },
  { key: 'updatedAt', label: 'Updated At' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'actions', label: 'ACTIONS' },
];

const TRANSACTIONS_COLUMNS: ColumnItem[] = [
  { key: 'userId', label: 'UserId' },
  { key: 'userWalletTransactionId', label: 'UserWalletTransactionId' },
  { key: 'walletType', label: 'Wallet Type' },
  { key: 'transactionType', label: 'Transaction Type' },
  { key: 'amount', label: 'Amount' },
  { key: 'newBalance', label: 'New Balance' },
  { key: 'description', label: 'Description' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'actions', label: 'ACTIONS' },
];

export interface UsersViewProps {
  route?: AppRoute;
}

export const UsersView: React.FC<UsersViewProps> = ({ route }) => {
  const { notify } = useNotification();

  // Navigation mode: 'list' or 'transactions'
  const [activeSubView, setActiveSubView] = useState<'list' | 'transactions'>(() => {
    return route?.usersSubView === 'transactions' ? 'transactions' : 'list';
  });
  const [selectedUserForTransactions, setSelectedUserForTransactions] = useState<UserRecord | null>(() => {
    if (route?.userId) {
      const u = INITIAL_USERS.find((usr) => usr.userId === route.userId);
      if (u) return u;
      return {
        userId: route.userId,
        firstName: `User`,
        lastName: `#${route.userId}`,
        username: `user_${route.userId}`,
        email: `user${route.userId}@example.com`,
        mobileNumber: '9800000000',
        depositWallet: 1056,
        winWallet: 1036,
        status: 'active',
        statusDescription: '',
        updatedAt: 'Recently',
        createdAt: 'Recently',
      };
    }
    return null;
  });

  // Users data state
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);

  // Synchronize component state with route URL changes
  React.useEffect(() => {
    if (!route) return;

    if (route.usersSubView === 'transactions') {
      setActiveSubView('transactions');
      if (route.userId !== undefined) {
        const found = users.find((u) => u.userId === route.userId);
        if (found) {
          setSelectedUserForTransactions(found);
        } else {
          setSelectedUserForTransactions({
            userId: route.userId,
            firstName: 'User',
            lastName: `#${route.userId}`,
            username: `user_${route.userId}`,
            email: `user${route.userId}@example.com`,
            mobileNumber: '9800000000',
            depositWallet: 1056,
            winWallet: 1036,
            status: 'active',
            statusDescription: '',
            updatedAt: 'Recently',
            createdAt: 'Recently',
          });
        }
      }
    } else if (route.view === 'users' && !route.usersSubView) {
      setActiveSubView('list');
    }
  }, [route, users]);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  // Visible columns for Users table
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    userId: true,
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    mobileNumber: true,
    depositWallet: true,
    winWallet: true,
    status: true,
    statusDescription: false,
    updatedAt: false,
    createdAt: false,
    actions: true,
  });

  // Transactions data state
  const [transactions, setTransactions] = useState<UserTransaction[]>(INITIAL_TRANSACTIONS);
  const [txSearchQuery, setTxSearchQuery] = useState('');
  const [txRowsPerPage, setTxRowsPerPage] = useState(10);
  const [txCurrentPage, setTxCurrentPage] = useState(1);
  const [txSortAsc, setTxSortAsc] = useState(false);
  const [txVisibleColumns, setTxVisibleColumns] = useState<Record<string, boolean>>({
    userId: true,
    userWalletTransactionId: true,
    walletType: true,
    transactionType: true,
    amount: true,
    newBalance: true,
    description: true,
    createdAt: true,
    actions: true,
  });

  // Modals state
  const [walletModalUser, setWalletModalUser] = useState<UserRecord | null>(null);
  const [walletType, setWalletType] = useState<'depositWallet' | 'winWallet'>('depositWallet');
  const [transactionType, setTransactionType] = useState<'credit' | 'debit'>('credit');
  const [walletAmount, setWalletAmount] = useState<string>('');
  const [walletDescription, setWalletDescription] = useState<string>('');

  const [passwordModalUser, setPasswordModalUser] = useState<UserRecord | null>(null);
  const [newPassword, setNewPassword] = useState<string>('');

  const [statusModalUser, setStatusModalUser] = useState<UserRecord | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'banned'>('active');
  const [statusDescription, setStatusDescription] = useState<string>('');

  const [deleteModalUser, setDeleteModalUser] = useState<UserRecord | null>(null);

  // Toggle column visibility
  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleToggleTxColumn = (key: string) => {
    setTxVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filtered and sorted users
  const filteredUsers = useMemo(() => {
    let result = users.filter((u) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        String(u.userId).includes(q) ||
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.mobileNumber.includes(q)
      );
    });

    result.sort((a, b) => {
      return sortAsc ? a.userId - b.userId : b.userId - a.userId;
    });

    return result;
  }, [users, searchQuery, sortAsc]);

  // Paginated users
  const totalUserPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  // Filtered and sorted transactions
  const filteredTransactions = useMemo(() => {
    let result = transactions.filter((tx) => {
      const q = txSearchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        String(tx.userWalletTransactionId).includes(q) ||
        tx.walletType.toLowerCase().includes(q) ||
        tx.transactionType.toLowerCase().includes(q) ||
        String(tx.amount).includes(q) ||
        String(tx.newBalance).includes(q) ||
        tx.description.toLowerCase().includes(q) ||
        tx.createdAt.toLowerCase().includes(q)
      );
    });

    result.sort((a, b) => {
      return txSortAsc
        ? a.userWalletTransactionId - b.userWalletTransactionId
        : b.userWalletTransactionId - a.userWalletTransactionId;
    });

    return result;
  }, [transactions, txSearchQuery, txSortAsc]);

  // Paginated transactions
  const totalTxPages = Math.ceil(filteredTransactions.length / txRowsPerPage) || 1;
  const paginatedTransactions = useMemo(() => {
    const startIndex = (txCurrentPage - 1) * txRowsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + txRowsPerPage);
  }, [filteredTransactions, txCurrentPage, txRowsPerPage]);

  // Action handlers
  const handleOpenTransactions = (user: UserRecord) => {
    setSelectedUserForTransactions(user);
    setActiveSubView('transactions');
    setTxCurrentPage(1);
    setTxSearchQuery('');
    navigateToPath(buildUserTransactionsUrl(user.userId));
  };

  const handleOpenWalletModal = (user: UserRecord) => {
    setWalletModalUser(user);
    setWalletType('depositWallet');
    setTransactionType('credit');
    setWalletAmount('');
    setWalletDescription('');
  };

  const handleSaveWalletUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletModalUser) return;
    const num = parseFloat(walletAmount);
    if (isNaN(num) || num <= 0) {
      notify({
        type: 'error',
        title: 'Invalid Amount',
        message: 'Please enter a valid positive amount.',
      });
      return;
    }

    const multiplier = transactionType === 'credit' ? 1 : -1;
    const change = num * multiplier;

    // Update user record
    setUsers((prev) =>
      prev.map((u) => {
        if (u.userId === walletModalUser.userId) {
          const currentDep = u.depositWallet;
          const currentWin = u.winWallet;
          return {
            ...u,
            depositWallet:
              walletType === 'depositWallet' ? Math.max(0, currentDep + change) : currentDep,
            winWallet: walletType === 'winWallet' ? Math.max(0, currentWin + change) : currentWin,
            updatedAt: new Date().toLocaleString(),
          };
        }
        return u;
      })
    );

    // Create a new transaction
    const newTx: UserTransaction = {
      userWalletTransactionId: Date.now() % 100000,
      walletType,
      transactionType,
      amount: num,
      newBalance:
        walletType === 'depositWallet'
          ? Math.max(0, walletModalUser.depositWallet + change)
          : Math.max(0, walletModalUser.winWallet + change),
      description: walletDescription || `Admin manual ${transactionType} operation`,
      createdAt: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };

    setTransactions((prev) => [newTx, ...prev]);

    notify({
      type: 'success',
      title: 'Action Done',
      message: `Updated wallet for @${walletModalUser.username} (${transactionType} ₹${num})`,
    });

    setWalletModalUser(null);
  };

  const handleOpenPasswordModal = (user: UserRecord) => {
    setPasswordModalUser(user);
    setNewPassword('');
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordModalUser) return;
    if (!newPassword.trim()) {
      notify({
        type: 'error',
        title: 'Error',
        message: 'Please enter a new password.',
      });
      return;
    }

    notify({
      type: 'success',
      title: 'Action Done',
      message: `Password updated successfully for @${passwordModalUser.username}`,
    });

    setPasswordModalUser(null);
  };

  const handleOpenStatusModal = (user: UserRecord) => {
    setStatusModalUser(user);
    setSelectedStatus(user.status);
    setStatusDescription(user.statusDescription || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusModalUser) return;

    setUsers((prev) =>
      prev.map((u) => {
        if (u.userId === statusModalUser.userId) {
          return {
            ...u,
            status: selectedStatus,
            statusDescription: statusDescription,
            updatedAt: new Date().toLocaleString(),
          };
        }
        return u;
      })
    );

    notify({
      type: 'success',
      title: 'Action Done',
      message: `Status of @${statusModalUser.username} changed to ${selectedStatus}`,
    });

    setStatusModalUser(null);
  };

  const handleOpenDeleteModal = (user: UserRecord) => {
    setDeleteModalUser(user);
  };

  const handleConfirmDelete = () => {
    if (!deleteModalUser) return;

    setUsers((prev) => prev.filter((u) => u.userId !== deleteModalUser.userId));

    notify({
      type: 'success',
      title: 'Action Done',
      message: `User @${deleteModalUser.username} has been deleted.`,
    });

    setDeleteModalUser(null);
  };

  // Render pagination numbers (matching screenshots with black circular active state)
  const renderPaginationButtons = (
    current: number,
    total: number,
    onPageChange: (page: number) => void
  ) => {
    if (total <= 1) return null;

    const pages: (number | string)[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', total);
      } else if (current >= total - 3) {
        pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }

    return (
      <div className="flex items-center gap-2 select-none">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, current - 1))}
          disabled={current === 1}
          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`dots-${idx}`} className="px-1 text-xs text-slate-400">
                ...
              </span>
            );
          }
          const pageNum = Number(p);
          const isActive = current === pageNum;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold cursor-pointer transition-colors ${
                isActive
                  ? 'bg-[#18181b] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(total, current + 1))}
          disabled={current === total}
          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* ============================================================ */}
      {/* VIEW 1: USERS LIST TABLE (Screenshots 1, 2, 3, 4)           */}
      {/* ============================================================ */}
      {activeSubView === 'list' && (
        <div className="space-y-4">
          {/* Main Title and Breadcrumb */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0f2d59]">Users</h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <span className="hover:text-slate-600 transition-colors cursor-pointer">Home</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
              <span className="text-slate-700 font-medium">Users</span>
            </div>
          </div>

          {/* Search Input Bar (Full Width as in Screenshot 1) */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by userId, First Name, Last Name, Username, Email or Mobile Number"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder:text-slate-400 shadow-2xs"
            />
          </div>

          {/* Sub-bar: Total Items Count (Left) + Columns / Rows dropdowns (Right) */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 select-none">
            <div>
              Total <span className="text-slate-700 font-normal">{filteredUsers.length}</span> Items
            </div>

            <div className="flex items-center gap-2">
              {/* Columns dropdown */}
              <ColumnsDropdown
                columns={USERS_COLUMNS}
                visibleColumns={visibleColumns}
                onToggleColumn={handleToggleColumn}
              />

              {/* Rows per page dropdown */}
              <RowsPerPageDropdown
                value={rowsPerPage}
                onChange={(val) => {
                  setRowsPerPage(val);
                  setCurrentPage(1);
                }}
                options={[5, 10, 20, 50, 100]}
              />
            </div>
          </div>

          {/* Data Table Container */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-700 font-semibold bg-white">
                    {visibleColumns.userId !== false && (
                      <th
                        onClick={() => setSortAsc(!sortAsc)}
                        className="py-3 px-4 text-left cursor-pointer hover:bg-slate-50 select-none group"
                      >
                        <div className="flex items-center gap-1">
                          <span>userId</span>
                          {sortAsc ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </div>
                      </th>
                    )}
                    {visibleColumns.firstName !== false && (
                      <th className="py-3 px-4">First Name</th>
                    )}
                    {visibleColumns.lastName !== false && <th className="py-3 px-4">Last Name</th>}
                    {visibleColumns.username !== false && <th className="py-3 px-4">Username</th>}
                    {visibleColumns.email !== false && <th className="py-3 px-4">Email</th>}
                    {visibleColumns.mobileNumber !== false && (
                      <th className="py-3 px-4">Mobile Number</th>
                    )}
                    {visibleColumns.depositWallet !== false && (
                      <th className="py-3 px-4">Deposit Wallet</th>
                    )}
                    {visibleColumns.winWallet !== false && (
                      <th className="py-3 px-4">Win Wallet</th>
                    )}
                    {visibleColumns.status !== false && <th className="py-3 px-4">Status</th>}
                    {visibleColumns.statusDescription === true && (
                      <th className="py-3 px-4">Status Description</th>
                    )}
                    {visibleColumns.updatedAt === true && <th className="py-3 px-4">Updated At</th>}
                    {visibleColumns.createdAt === true && <th className="py-3 px-4">Created At</th>}
                    {visibleColumns.actions !== false && <th className="py-3 px-4">ACTIONS</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {paginatedUsers.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="py-12 text-center text-slate-400">
                        No users match your criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((user) => (
                      <tr key={user.userId} className="hover:bg-slate-50/70 transition-colors">
                        {visibleColumns.userId !== false && (
                          <td className="py-3.5 px-4 font-normal text-slate-700">{user.userId}</td>
                        )}
                        {visibleColumns.firstName !== false && (
                          <td className="py-3.5 px-4 text-slate-800">{user.firstName}</td>
                        )}
                        {visibleColumns.lastName !== false && (
                          <td className="py-3.5 px-4 text-slate-800">{user.lastName}</td>
                        )}
                        {visibleColumns.username !== false && (
                          <td className="py-3.5 px-4 text-slate-800">{user.username}</td>
                        )}
                        {visibleColumns.email !== false && (
                          <td className="py-3.5 px-4 text-slate-700">{user.email}</td>
                        )}
                        {visibleColumns.mobileNumber !== false && (
                          <td className="py-3.5 px-4 text-slate-700">{user.mobileNumber}</td>
                        )}
                        {visibleColumns.depositWallet !== false && (
                          <td className="py-3.5 px-4 text-slate-700">{user.depositWallet}</td>
                        )}
                        {visibleColumns.winWallet !== false && (
                          <td className="py-3.5 px-4 text-slate-700">{user.winWallet}</td>
                        )}
                        {visibleColumns.status !== false && (
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-xs ${
                                user.status === 'banned' ? 'text-rose-600' : 'text-slate-700'
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                        )}
                        {visibleColumns.statusDescription === true && (
                          <td className="py-3.5 px-4 text-xs text-slate-500">
                            {user.statusDescription || '-'}
                          </td>
                        )}
                        {visibleColumns.updatedAt === true && (
                          <td className="py-3.5 px-4 text-xs text-slate-500">
                            {user.updatedAt || '-'}
                          </td>
                        )}
                        {visibleColumns.createdAt === true && (
                          <td className="py-3.5 px-4 text-xs text-slate-500">
                            {user.createdAt || '-'}
                          </td>
                        )}
                        {visibleColumns.actions !== false && (
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3 text-xs">
                              {/* View Transaction */}
                              <button
                                type="button"
                                onClick={() => handleOpenTransactions(user)}
                                className="flex items-center gap-1 text-[#2563eb] hover:underline cursor-pointer transition-colors"
                              >
                                <ArrowLeftRight className="w-3.5 h-3.5 stroke-[2]" />
                                <span>View Transaction</span>
                              </button>

                              {/* Update Wallet */}
                              <button
                                type="button"
                                onClick={() => handleOpenWalletModal(user)}
                                className="flex items-center gap-1 text-[#2563eb] hover:underline cursor-pointer transition-colors"
                              >
                                <Wallet className="w-3.5 h-3.5 stroke-[2]" />
                                <span>Update Wallet</span>
                              </button>

                              {/* Update Password */}
                              <button
                                type="button"
                                onClick={() => handleOpenPasswordModal(user)}
                                className="flex items-center gap-1 text-[#2563eb] hover:underline cursor-pointer transition-colors"
                              >
                                <Lock className="w-3.5 h-3.5 stroke-[2]" />
                                <span>Update Password</span>
                              </button>

                              {/* Update Status */}
                              <button
                                type="button"
                                onClick={() => handleOpenStatusModal(user)}
                                className="flex items-center gap-1 text-[#2563eb] hover:underline cursor-pointer transition-colors"
                              >
                                <Tag className="w-3.5 h-3.5 stroke-[2]" />
                                <span>Update Status</span>
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handleOpenDeleteModal(user)}
                                className="flex items-center gap-1 text-[#e11d48] hover:underline cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Pagination Bar */}
          <div className="pt-2 flex items-center justify-start">
            {renderPaginationButtons(currentPage, totalUserPages, setCurrentPage)}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 2: TRANSACTIONS SUB-VIEW (Screenshot 5)                */}
      {/* ============================================================ */}
      {activeSubView === 'transactions' && (
        <div className="space-y-4">
          {/* Main Title and Breadcrumb */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0f2d59]">Transaction</h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <span
                onClick={() => navigateToPath('/users')}
                className="hover:text-slate-600 transition-colors cursor-pointer"
              >
                Home
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
              <button
                onClick={() => navigateToPath('/users')}
                className="hover:text-slate-700 transition-colors cursor-pointer text-slate-500"
              >
                Users
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
              <span className="text-slate-700 font-medium">Transaction</span>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={txSearchQuery}
              onChange={(e) => {
                setTxSearchQuery(e.target.value);
                setTxCurrentPage(1);
              }}
              placeholder="Enter ClassRoom Name here"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder:text-slate-400 shadow-2xs"
            />
          </div>

          {/* Sub-bar: Total Items Count (Left) + Columns / Rows dropdowns (Right) */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 select-none">
            <div>
              Total{' '}
              <span className="text-slate-700 font-normal">{filteredTransactions.length}</span>{' '}
              Items
            </div>

            <div className="flex items-center gap-2">
              {/* Columns dropdown */}
              <ColumnsDropdown
                columns={TRANSACTIONS_COLUMNS}
                visibleColumns={txVisibleColumns}
                onToggleColumn={handleToggleTxColumn}
              />

              {/* Rows per page dropdown */}
              <RowsPerPageDropdown
                value={txRowsPerPage}
                onChange={(val) => {
                  setTxRowsPerPage(val);
                  setTxCurrentPage(1);
                }}
                options={[5, 10, 20, 50, 100]}
              />
            </div>
          </div>

          {/* Transactions Data Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-700 font-semibold bg-white">
                    {txVisibleColumns.userId !== false && (
                      <th className="py-3 px-4">userId</th>
                    )}
                    {txVisibleColumns.userWalletTransactionId !== false && (
                      <th
                        onClick={() => setTxSortAsc(!txSortAsc)}
                        className="py-3 px-4 text-left cursor-pointer hover:bg-slate-50 select-none"
                      >
                        <div className="flex items-center gap-1">
                          <span>userWalletTransactionId</span>
                          {txSortAsc ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </div>
                      </th>
                    )}
                    {txVisibleColumns.walletType !== false && (
                      <th className="py-3 px-4">Wallet Type</th>
                    )}
                    {txVisibleColumns.transactionType !== false && (
                      <th className="py-3 px-4">Transaction Type</th>
                    )}
                    {txVisibleColumns.amount !== false && <th className="py-3 px-4">Amount</th>}
                    {txVisibleColumns.newBalance !== false && (
                      <th className="py-3 px-4">New Balance</th>
                    )}
                    {txVisibleColumns.description !== false && (
                      <th className="py-3 px-4">Description</th>
                    )}
                    {txVisibleColumns.createdAt !== false && (
                      <th className="py-3 px-4">Created At</th>
                    )}
                    {txVisibleColumns.actions !== false && (
                      <th className="py-3 px-4">ACTIONS</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {paginatedTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-slate-400">
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    paginatedTransactions.map((tx) => (
                      <tr
                        key={tx.userWalletTransactionId}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        {txVisibleColumns.userId !== false && (
                          <td className="py-3.5 px-4 font-normal text-slate-700">
                            {tx.userId ?? selectedUserForTransactions?.userId ?? 1}
                          </td>
                        )}
                        {txVisibleColumns.userWalletTransactionId !== false && (
                          <td className="py-3.5 px-4 font-normal text-slate-700">
                            {tx.userWalletTransactionId}
                          </td>
                        )}
                        {txVisibleColumns.walletType !== false && (
                          <td className="py-3.5 px-4 text-slate-800">{tx.walletType}</td>
                        )}
                        {txVisibleColumns.transactionType !== false && (
                          <td className="py-3.5 px-4 text-slate-800">{tx.transactionType}</td>
                        )}
                        {txVisibleColumns.amount !== false && (
                          <td className="py-3.5 px-4 text-slate-700">{tx.amount}</td>
                        )}
                        {txVisibleColumns.newBalance !== false && (
                          <td className="py-3.5 px-4 text-slate-700">{tx.newBalance}</td>
                        )}
                        {txVisibleColumns.description !== false && (
                          <td className="py-3.5 px-4 text-slate-700">{tx.description || ''}</td>
                        )}
                        {txVisibleColumns.createdAt !== false && (
                          <td className="py-3.5 px-4 text-slate-700 leading-tight">
                            {tx.createdAt.includes(', ') ? (
                              <div>
                                <div>{tx.createdAt.split(', ')[0]}</div>
                                <div>{tx.createdAt.split(', ')[1]}</div>
                              </div>
                            ) : (
                              tx.createdAt
                            )}
                          </td>
                        )}
                        {txVisibleColumns.actions !== false && (
                          <td className="py-3.5 px-4 text-slate-400"></td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Pagination Bar */}
          <div className="pt-2 flex items-center justify-start">
            {renderPaginationButtons(txCurrentPage, totalTxPages, setTxCurrentPage)}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 1: UPDATE USER WALLET (Screenshot 6)                  */}
      {/* ============================================================ */}
      {walletModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800">
                Update User Wallet (userId : {walletModalUser.userId})
              </h3>
              <button
                type="button"
                onClick={() => setWalletModalUser(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2 font-medium">
              Username : <span className="text-slate-700">{walletModalUser.username}</span>
            </p>

            <form onSubmit={handleSaveWalletUpdate} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Select Wallet Type</label>
                <select
                  value={walletType}
                  onChange={(e) =>
                    setWalletType(e.target.value as 'depositWallet' | 'winWallet')
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="depositWallet">depositWallet</option>
                  <option value="winWallet">winWallet</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Select Transaction Type
                </label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value as 'credit' | 'debit')}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="credit">credit</option>
                  <option value="debit">debit</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Amount</label>
                <input
                  type="number"
                  step="any"
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(e.target.value)}
                  placeholder="Enter Amount here"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={walletDescription}
                  onChange={(e) => setWalletDescription(e.target.value)}
                  placeholder="Enter Description here"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setWalletModalUser(null)}
                  className="px-5 py-2 rounded-lg text-xs font-medium text-[#db2777] bg-[#fce7f3] hover:bg-[#fbcfe8] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-medium text-white bg-[#00c957] hover:bg-[#00b04c] transition-colors cursor-pointer shadow-xs"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: UPDATE PASSWORD (Screenshot 7)                     */}
      {/* ============================================================ */}
      {passwordModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-100 max-w-md w-full p-6 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800">
                Update Password (userId : {passwordModalUser.userId})
              </h3>
              <button
                type="button"
                onClick={() => setPasswordModalUser(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePassword} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">New Password</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password here"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPasswordModalUser(null)}
                  className="px-5 py-2 rounded-lg text-xs font-medium text-[#db2777] bg-[#fce7f3] hover:bg-[#fbcfe8] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-medium text-white bg-[#00c957] hover:bg-[#00b04c] transition-colors cursor-pointer shadow-xs"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: UPDATE USER STATUS (Screenshot 8)                  */}
      {/* ============================================================ */}
      {statusModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-100 max-w-md w-full p-6 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800">
                Update User Status (userId : {statusModalUser.userId})
              </h3>
              <button
                type="button"
                onClick={() => setStatusModalUser(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Select Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as 'active' | 'banned')}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="active">active</option>
                  <option value="banned">banned</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Status Description</label>
                <textarea
                  rows={3}
                  value={statusDescription}
                  onChange={(e) => setStatusDescription(e.target.value)}
                  placeholder="Enter Status Description here"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStatusModalUser(null)}
                  className="px-5 py-2 rounded-lg text-xs font-medium text-[#db2777] bg-[#fce7f3] hover:bg-[#fbcfe8] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-medium text-white bg-[#00c957] hover:bg-[#00b04c] transition-colors cursor-pointer shadow-xs"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 4: DELETE USER (Screenshot 9)                         */}
      {/* ============================================================ */}
      {deleteModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-100 max-w-md w-full p-6 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800">
                Delete User (userId : {deleteModalUser.userId})
              </h3>
              <button
                type="button"
                onClick={() => setDeleteModalUser(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <p className="font-semibold text-slate-800 text-sm">
                Are you Sure for Delete Following ?
              </p>
              <div className="space-y-1 text-slate-600">
                <p>
                  Username : <span className="text-slate-800 font-medium">{deleteModalUser.username}</span>
                </p>
                <p>
                  Email : <span className="text-slate-800 font-medium">{deleteModalUser.email}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteModalUser(null)}
                className="px-5 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-lg text-xs font-medium text-white bg-[#e11d48] hover:bg-[#be123c] transition-colors cursor-pointer shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
