"use client";

import React, { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { voteContract } from "./client";

const CastVoteComponent: React.FC<{ userAddress: string }> = ({ userAddress })=> {
  const [proposalId, setProposalId] = useState<string>(""); // Input as string
  const [support, setSupport] = useState<number | null>(null); // 0 = Against, 1 = For

  const { mutate: sendTransaction } = useSendTransaction();

  const handleVote = async () => {
    if (!proposalId || support === null) {
      alert("Please provide a proposal ID and select your support.");
      return;
    }

    try {
      const proposalIdAsBigInt = BigInt(proposalId); // Convert to bigint

      // Prepare the transaction for `castVote`
      const transaction = prepareContractCall({
        contract: voteContract,
        method: "function castVote(uint256 proposalId, uint8 support) returns (uint256)",
        params: [proposalIdAsBigInt, support], // Pass the proposal ID and support
      });

      sendTransaction(transaction, {
        onSuccess: () => {
          alert("Vote cast successfully!");
          setProposalId("");
          setSupport(null);
        },
        onError: (error) => {
          console.error("Failed to cast vote:", error);
          alert("Error casting vote.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Unexpected error occurred.");
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md mb-10">
      <h2 className="text-xl font-bold text-white mb-4">Cast Your Vote</h2>
      <input
        type="text"
        placeholder="Proposal ID"
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
        className="w-full p-2 my-2 rounded-md"
      />
      <select
        value={support === null ? "" : support}
        onChange={(e) => setSupport(Number(e.target.value))}
        className="w-full p-2 my-2 rounded-md"
      >
        <option value="" disabled>
          Select Support
        </option>
        <option value={1}>For</option>
        <option value={0}>Against</option>
      </select>
      <button
        onClick={handleVote}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
      >
        Submit Vote
      </button>
    </div>
  );
};

export default CastVoteComponent;
