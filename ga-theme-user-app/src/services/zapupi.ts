/**
 * ZapUPI Payment Gateway Integration Service
 * Compliant with ZapUPI Single HTML and Web specifications
 */

export interface ZapUPICallbacks {
  onSuccess: (orderId: string, details?: { txn_id?: string; utr?: string; amount?: string }) => void;
  onFailed: (orderId: string, reason?: string) => void;
  onTimeout: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
}

export interface ZapUPIOrderParams {
  zap_key?: string;
  order_id: string;
  amount: string;
  customer_mobile?: string;
  remark?: string;
}

declare global {
  interface Window {
    ZapUPI?: {
      setPaymentCallbacks: (callbacks: {
        onSuccess: (orderId: string) => void;
        onFailed: (orderId: string) => void;
        onTimeout: (orderId: string) => void;
      }) => void;
      createOrder: (
        orderData: {
          zap_key: string;
          order_id: string;
          amount: string;
          customer_mobile?: string;
          remark?: string;
        },
        callbacks: {
          onResponse: (paymentUrl: string, orderId: string, data?: unknown) => void;
          onError: (err: string) => void;
        }
      ) => void;
      loadPayment: (paymentUrl: string) => void;
    };
  }
}

// Get configured ZapUPI Key from environment variable
export const getZapKey = (): string => {
  const viteEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
  return (viteEnv?.VITE_ZAP_KEY || '').trim();
};

/**
 * Check if a real, valid ZapUPI merchant key is integrated
 */
export const isZapUpiIntegrated = (): boolean => {
  const key = getZapKey();
  if (!key) return false;
  if (key === 'MY_ZAP_KEY_HERE' || key === 'DEMO_ZAP_KEY_ESPORTS') return false;
  return key.length >= 6;
};

/**
 * Check if the official ZapUPI script is loaded and ready
 */
export const isZapUpiScriptReady = (): boolean => {
  return typeof window !== 'undefined' && typeof window.ZapUPI?.createOrder === 'function';
};

/**
 * Ensure the ZapUPI script is loaded into the document head
 */
export const ensureZapUpiLoaded = (): Promise<boolean> => {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (isZapUpiScriptReady()) return Promise.resolve(true);

  return new Promise((resolve) => {
    // Check if script element already exists
    const existing = document.querySelector('script[src*="single-html-web-kit.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(isZapUpiScriptReady()));
      existing.addEventListener('error', () => resolve(false));
      setTimeout(() => resolve(isZapUpiScriptReady()), 1500);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://zapupi.com/single-html-web-kit.js';
    script.async = true;
    script.onload = () => resolve(isZapUpiScriptReady());
    script.onerror = () => resolve(false);
    document.head.appendChild(script);

    // Timeout fallback after 3s
    setTimeout(() => resolve(isZapUpiScriptReady()), 3000);
  });
};

/**
 * Configure global callbacks for ZapUPI
 */
export const registerZapUpiCallbacks = (callbacks: ZapUPICallbacks): void => {
  if (typeof window !== 'undefined' && window.ZapUPI?.setPaymentCallbacks) {
    window.ZapUPI.setPaymentCallbacks({
      onSuccess: (orderId: string) => {
        callbacks.onSuccess(orderId);
      },
      onFailed: (orderId: string) => {
        callbacks.onFailed(orderId);
      },
      onTimeout: (orderId: string) => {
        callbacks.onTimeout(orderId);
      },
    });
  }
};
