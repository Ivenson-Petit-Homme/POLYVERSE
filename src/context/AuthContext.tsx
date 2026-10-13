import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, UserOrder } from '../types';

interface StoredUserAccount extends UserAccount {
  password?: string;
}

interface AuthContextType {
  currentUser: UserAccount | null;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  register: (data: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserAccount>) => void;
  
  // Orders
  orders: UserOrder[];
  placeOrder: (orderData: Omit<UserOrder, 'id' | 'createdAt' | 'status'>) => UserOrder;
  updateOrderStatus: (orderId: string, status: UserOrder['status']) => void;
  getUserOrders: () => UserOrder[];

  // Admin access
  allUsers: UserAccount[];
  adminEmail: string;

  // Modals state
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  requireAuth: (onSuccess?: () => void) => boolean;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'polyverse_registered_users';
const CURRENT_USER_KEY = 'polyverse_active_session';
const ORDERS_STORAGE_KEY = 'polyverse_all_orders';

// Initial sample orders for demonstration if storage is empty
const INITIAL_SAMPLE_ORDERS: UserOrder[] = [
  {
    id: 'PLY-ORD-782194',
    userId: 'sample-client-1',
    userEmail: 'jean.baptiste@gmail.com',
    userName: 'Jean-Baptiste M.',
    userPhone: '+509 3744-8899',
    userAddress: 'Pétion-Ville, Rue Panaméricaine #14, Haïti',
    orderType: 'boutique',
    items: [
      {
        productName: 'T-Shirt Signature Polyverse "Kreyativite & Tech"',
        quantity: 2,
        priceUSD: 18,
        color: 'Noir Onyx',
        size: 'L',
      },
    ],
    totalUSD: 36,
    totalHTG: 5400,
    paymentMethod: 'MonCash',
    promoCode: 'POLYVIP',
    notes: 'Livraison souhaitée avant vendredi après-midi.',
    status: 'processing',
    createdAt: '2026-09-12T14:20:00Z',
  },
  {
    id: 'PLY-ORD-651032',
    userId: 'sample-client-2',
    userEmail: 'sophie.d@yahoo.fr',
    userName: 'Sophie Dorval',
    userPhone: '+509 4811-2233',
    userAddress: 'Delmas 75, Impasse Bellevue, Port-au-Prince',
    orderType: 'achat-sans-carte',
    productUrl: 'https://amazon.com/dp/example-tablette',
    totalUSD: 120,
    totalHTG: 18000,
    paymentMethod: 'Natcash',
    notes: 'Tablette graphique avec stylet pour cours de design.',
    status: 'confirmed',
    createdAt: '2026-09-13T10:15:00Z',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read admin credentials from environment variable for security
  const envAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@polyverse.com').trim().toLowerCase();
  const envAdminPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'PolyverseAdmin2026!').trim();

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [usersList, setUsersList] = useState<StoredUserAccount[]>(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<UserOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ORDERS));
      return INITIAL_SAMPLE_ORDERS;
    } catch {
      return INITIAL_SAMPLE_ORDERS;
    }
  });

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Sync current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  // Sync users to localStorage
  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersList));
  }, [usersList]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const isAdmin = currentUser?.role === 'admin';

  // LOGIN FUNCTION
  const login = async (emailInput: string, passInput: string): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passInput.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, message: 'Tanpri ranpli imel ak modpas ou.' };
    }

    // 1. Check if Admin logging in via .env credentials
    if (cleanEmail === envAdminEmail && cleanPass === envAdminPassword) {
      const adminUser: UserAccount = {
        id: 'polyverse-admin-master',
        name: 'Administrateur Polyverse',
        email: envAdminEmail,
        phone: '+509 3700-0000',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(adminUser);
      setIsAuthModalOpen(false);

      if (pendingCallback) {
        pendingCallback();
        setPendingCallback(null);
      }

      return { success: true, message: 'Koneksyon Administratè reyisi avèk siksè!' };
    }

    // 2. Check regular registered customers
    const userFound = usersList.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!userFound) {
      return { success: false, message: 'Pa gen okenn kont ki anrejistre avèk imel sa a. Tanpri kreye yon kont.' };
    }

    if (userFound.password && userFound.password !== cleanPass) {
      return { success: false, message: 'Modpas la pa kòrèk. Tanpri verifye li.' };
    }

    // Customer Login successful
    const activeCustomer: UserAccount = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
      phone: userFound.phone,
      address: userFound.address,
      role: 'customer',
      createdAt: userFound.createdAt,
    };

    setCurrentUser(activeCustomer);
    setIsAuthModalOpen(false);

    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }

    return { success: true, message: `Byenvini tounen ${activeCustomer.name} !` };
  };

  // REGISTER FUNCTION
  const register = async (data: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    password: string;
  }): Promise<{ success: boolean; message: string }> => {
    const cleanName = data.name.trim();
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPhone = data.phone.trim();
    const cleanPass = data.password.trim();

    if (!cleanName || !cleanEmail || !cleanPhone || !cleanPass) {
      return { success: false, message: 'Tanpri ranpli tout chan obligatwa yo (Non, Imel, Telefòn, Modpas).' };
    }

    if (cleanPass.length < 6) {
      return { success: false, message: 'Modpas la dwe genyen omwen 6 karaktè pou sekirite kont ou.' };
    }

    // Prevent registering with the official admin email
    if (cleanEmail === envAdminEmail) {
      return { success: false, message: 'Imel sa a rezève pou administrasyon Polyverse sèlman.' };
    }

    // Check if email already registered
    const existing = usersList.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'Yon kont deja egziste avèk imel sa a. Tanpri konekte pito.' };
    }

    const newId = `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newAccount: StoredUserAccount = {
      id: newId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      address: data.address?.trim() || '',
      role: 'customer',
      password: cleanPass,
      createdAt: new Date().toISOString(),
    };

    setUsersList((prev) => [newAccount, ...prev]);

    // Automatically log in newly created user
    const publicUser: UserAccount = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      phone: newAccount.phone,
      address: newAccount.address,
      role: 'customer',
      createdAt: newAccount.createdAt,
    };

    setCurrentUser(publicUser);
    setIsAuthModalOpen(false);

    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }

    return { success: true, message: 'Kont ou kreye avèk siksè! Ou konekte kounye a.' };
  };

  // LOGOUT
  const logout = () => {
    setCurrentUser(null);
    setIsAdminModalOpen(false);
    setIsAccountModalOpen(false);
  };

  // UPDATE PROFILE
  const updateProfile = (data: Partial<UserAccount>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);

    setUsersList((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...data } : u))
    );
  };

  // REQUIRE AUTH HELPER FOR ACTIONS LIKE CHECKOUT / PURCHASE
  // Returns true if already logged in, otherwise opens AuthModal and saves callback
  const requireAuth = (onSuccess?: () => void): boolean => {
    if (currentUser) {
      return true;
    }
    if (onSuccess) {
      setPendingCallback(() => onSuccess);
    }
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
    return false;
  };

  // PLACE ORDER
  const placeOrder = (orderData: Omit<UserOrder, 'id' | 'createdAt' | 'status'>): UserOrder => {
    const newOrderId = `PLY-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: UserOrder = {
      ...orderData,
      id: newOrderId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // UPDATE ORDER STATUS (ADMIN)
  const updateOrderStatus = (orderId: string, status: UserOrder['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  // GET ORDERS FOR CURRENT USER
  const getUserOrders = (): UserOrder[] => {
    if (!currentUser) return [];
    if (currentUser.role === 'admin') return orders;
    return orders.filter(
      (o) => o.userId === currentUser.id || o.userEmail.toLowerCase() === currentUser.email.toLowerCase()
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
        orders,
        placeOrder,
        updateOrderStatus,
        getUserOrders,
        allUsers: usersList.map(({ password: _, ...rest }) => rest),
        adminEmail: envAdminEmail,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        requireAuth,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
