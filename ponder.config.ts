import { createConfig } from "ponder";
import { mockTokenABI } from "./abis/abi";

export default createConfig({
  chains: {
    baseSepolia: {
      id: 84532,
      rpc: "https://base-sepolia.g.alchemy.com/v2/G-qZEvlqAPJRLWjrL-CW9",
    },
  },
  contracts: {
    MockIDRX: {
      chain: "baseSepolia",
      abi: mockTokenABI,
      address: "0xa42b876f75d955de6d721dc15f61f2e533fc0855",
      startBlock: 33749107,
    },
  },
});
