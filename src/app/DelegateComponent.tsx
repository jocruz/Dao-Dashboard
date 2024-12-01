"use client";

import React from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { tokenContract } from "./client"; // Ensure tokenContract is imported correctly

const DelegateComponent: React.FC<{ walletAddress: string }> = ({
  walletAddress,
}) => {
  const { mutate: sendTransaction } = useSendTransaction();

  const handleDelegate = async () => {
    try {
      if (!walletAddress) {
        alert("Please connect your wallet first.");
        return;
      }

      const transaction = prepareContractCall({
        contract: tokenContract,
        method: "function delegate(address delegatee)",
        params: [walletAddress], // Delegate to the connected wallet
      });

      sendTransaction(transaction, {
        onSuccess: () => {
          alert("Tokens successfully activated for voting!");
        },
        onError: (error) => {
          console.error("Delegation failed:", error);
          alert("Failed to activate tokens for voting.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Unexpected error occurred.");
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md mb-10">
      <h2 className="text-xl font-bold text-white mb-4">Activate Your Tokens</h2>
      <p className="text-gray-400 mb-4">
        Activate your tokens so you can vote on proposals and participate in the
        DAO.
      </p>
      <button
        onClick={handleDelegate}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
      >
        Activate My Tokens for Voting
      </button>
    </div>
  );
};

export default DelegateComponent;
