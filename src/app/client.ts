import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const chain = defineChain(11155111); // Example: Sepolia testnet (use your chain ID)

// Initialize the Thirdweb client
export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || "No Client ID",
});


// Connect to your ERC-20 contract
export const tokenContract = getContract({
  client, // Use the client initialized with your clientId
  chain,
  address: "0x70f9A79E56Ee180f20c62dd9246aE85519A5972d", // Your token contract address
});


// Vote contact Address
export const voteContract = getContract({
  client, // Use the client initialized with your clientId
  chain,
  address: "0x504c766E48F1e3353a26C8229493F05D29A5086F", // Your token contract address
});


// Split contract address
export const splitContract = getContract({
  client, // Use the client initialized with your clientId
  chain,
  address: "0x3fd3B1a05BD4E11A8430f88F5aE2398D426f8b51", // Your token contract address
});