"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

export function WalletButton() {
  return (
    <WalletMultiButton className="!bg-dark-800 !border-neon-cyan/30 !text-neon-cyan !hover:bg-dark-700 !transition-all !duration-300 !rounded-xl !px-4 !py-2 !text-sm !font-semibold" />
  );
}

export function ConnectedWalletButton() {
  const { wallet, publicKey, connected } = useWallet();

  if (!connected || !publicKey) {
    return <WalletButton />;
  }

  const shortAddress = `${publicKey.toString().slice(0, 6)}...${publicKey.toString().slice(-4)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 px-4 py-2 bg-dark-800/80 border border-neon-cyan/30 rounded-xl"
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
        {wallet?.adapter.icon ? (
          <img src={wallet.adapter.icon} alt={wallet.adapter.name} className="w-5 h-5" />
        ) : (
          <Wallet className="w-4 h-4 text-dark-950" />
        )}
      </div>
      <div>
        <div className="text-light-100 text-sm font-medium">{wallet?.adapter.name || "Wallet"}</div>
        <div className="text-neon-cyan text-xs">{shortAddress}</div>
      </div>
    </motion.div>
  );
}

export function useWalletState() {
  const { publicKey, connected, connecting, disconnecting } = useWallet();
  return {
    publicKey,
    connected,
    connecting,
    disconnecting,
    address: publicKey?.toString() || null,
  };
}