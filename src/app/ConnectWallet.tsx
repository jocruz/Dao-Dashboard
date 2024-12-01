"use client";

import React, { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";

const ConnectWallet: React.FC<{ onConnect: (address: string | null) => void }> = ({ onConnect }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = (wallet: any) => {
    const address = wallet.getAccount()?.address; // Ensure this gets the wallet address
    if (address) {
      setWalletAddress(address);
      onConnect(address); // Pass address to parent
    } else {
      console.error("Failed to retrieve wallet address.");
    }
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    onConnect(null); // Notify parent that wallet is disconnected
    console.log("Wallet disconnected.");
  };

  return (
    <div>
      <ConnectButton
        client={client}
        appMetadata={{
          name: "DAO Dashboard",
          url: "https://example.com",
        }}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
      {walletAddress && (
        <p className="text-white mt-4">
          Connected Wallet: <span className="font-bold">{walletAddress}</span>
        </p>
      )}
    </div>
  );
};

export default ConnectWallet;
