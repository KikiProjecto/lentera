import "@testing-library/jest-dom";

global.window = global.window || {};
global.window.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
}));

jest.mock("@solana/wallet-adapter-react", () => ({
  useWallet: () => ({
    publicKey: null,
    connected: false,
    connect: jest.fn(),
    disconnect: jest.fn(),
  }),
  WalletProvider: ({ children }: { children: React.ReactNode }) => children,
  ConnectionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: "div",
    button: "button",
  },
  useAnimation: () => ({
    start: jest.fn(),
  }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));