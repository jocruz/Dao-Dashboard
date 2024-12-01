"use client";

import React from "react";
import { useReadContract } from "thirdweb/react";
import { voteContract } from "./client"; // Ensure the voteContract is imported correctly

export default function ProposalList() {
  // Fetch proposals using useReadContract
  const { data: proposals, isPending, error } = useReadContract({
    contract: voteContract,
    method:
      "function getAllProposals() view returns ((uint256 proposalId, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 startBlock, uint256 endBlock, string description)[] allProposals)",
    params: [],
  });

  if (isPending) {
    return <p className="text-gray-400">Loading proposals...</p>;
  }

  if (error) {
    console.error("Error fetching proposals:", error);
    return <p className="text-red-500">Error fetching proposals.</p>;
  }

  return (
    <div className="p-4 bg-gray-900 rounded-md">
      <h2 className="text-xl font-bold mb-4 text-white">Proposals</h2>
      {proposals && proposals.length > 0 ? (
        proposals.map((proposal: any, index: number) => (
          <div key={index} className="mb-4 p-4 bg-gray-800 rounded-md">
            <p className="text-white font-semibold">Description: {proposal.description}</p>
            <p className="text-gray-400">Proposal ID: {proposal.proposalId.toString()}</p>
            <p className="text-gray-400">Start Block: {proposal.startBlock.toString()}</p>
            <p className="text-gray-400">End Block: {proposal.endBlock.toString()}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No proposals found.</p>
      )}
    </div>
  );
}
