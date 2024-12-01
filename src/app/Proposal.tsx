"use client";

import React, { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { voteContract, splitContract } from "./client";

const ProposalComponent = () => {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: sendTransaction } = useSendTransaction();

  const handleCreateProposal = async () => {
    try {
      setIsSubmitting(true);

      if (!description) {
        alert("Please add a proposal description.");
        return;
      }

      const targets: readonly string[] = [splitContract.address]; // Split Contract as the target
      const values: readonly bigint[] = [BigInt(0)]; // No ETH transfer
      const calldatas: readonly `0x${string}`[] = [`0x`]; // Empty calldata

      const transaction = prepareContractCall({
        contract: voteContract,
        method:
          "function propose(address[] targets, uint256[] values, bytes[] calldatas, string description) returns (uint256 proposalId)",
        params: [targets, values, calldatas, description],
      });

      sendTransaction(transaction, {
        onSuccess: () => {
          alert("Proposal created successfully!");
          setDescription("");
        },
        onError: (error) => {
          console.error("Proposal creation failed:", error);
          alert("Failed to create proposal.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md">
      <h2 className="text-xl font-bold text-white">Create Proposal</h2>
      <textarea
        placeholder="Proposal Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 my-2 rounded-md"
        rows={4}
      />
      <button
        onClick={handleCreateProposal}
        disabled={isSubmitting}
        className={`px-4 py-2 rounded-md ${
          isSubmitting ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Create Proposal"}
      </button>
    </div>
  );
};

export default ProposalComponent;
