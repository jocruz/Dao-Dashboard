"use client";

import React, { useState } from "react";
import Image from "next/image";
import thirdwebIcon from "@public/thirdweb.svg";
import ConnectWallet from "./ConnectWallet"; // Import ConnectWallet
import ProposalComponent from "./Proposal"; // Import proposal creation
import ProposalList from "./ProposalList"; // Import proposal list
import CastVoteComponent from "./CastVoteComponent"; // Import cast vote
import HasVotedComponent from "./HasVotedComponent"; // Import check voting status

export default function Home() {
  const [userAddress, setUserAddress] = useState<string | null>(null);

  const handleWalletConnect = (address: string | null) => {
    setUserAddress(address); // Set wallet address when connected
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        {/* Connect Wallet */}
        <div className="flex justify-center mb-10">
          <ConnectWallet onConnect={handleWalletConnect} />
        </div>

        {/* Proposal Creation */}
        <section className="mb-10">
          <ProposalComponent />
        </section>

        {/* List of Proposals */}
        <section className="mb-10">
          <ProposalList />
        </section>

        {/* Cast Vote Section */}
        {userAddress && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">Vote on a Proposal</h2>
            <CastVoteComponent userAddress={userAddress} />
          </section>
        )}

        {/* Check Voting Status Section */}
        {userAddress && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Check Your Voting Status</h2>
            <HasVotedComponent userAddress={userAddress} />
          </section>
        )}
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-10">
      <Image
        src={thirdwebIcon}
        alt="Thirdweb Logo"
        className="size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        DAO Dashboard
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Moverz And John </span>
      </h1>
      <p className="text-zinc-300 text-base">
        Create proposals and manage DAO voting with Thirdweb!
      </p>
    </header>
  );
}
