"use client";

import React, { useState } from "react";
import { useReadContract } from "thirdweb/react";
import { voteContract } from "./client";

const HasVotedComponent: React.FC<{ userAddress: string }> = ({ userAddress }) => {
  const [proposalId, setProposalId] = useState<string>("");

  const { data: hasVoted, isPending, error } = useReadContract({
    contract: voteContract,
    method: "function hasVoted(uint256 proposalId, address account) view returns (bool)",
    params: [BigInt(proposalId), userAddress], // Convert proposalId to bigint
  });

  return (
    <div className="p-4 bg-gray-800 rounded-md">
      <h2 className="text-xl font-bold text-white mb-4">Check Voting Status</h2>
      <input
        type="text"
        placeholder="Proposal ID"
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
        className="w-full p-2 my-2 rounded-md"
      />
      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching voting status.</p>
      ) : (
        <p className="text-gray-400">
          {hasVoted ? "You have already voted." : "You have not voted yet."}
        </p>
      )}
    </div>
  );
};

export default HasVotedComponent;
