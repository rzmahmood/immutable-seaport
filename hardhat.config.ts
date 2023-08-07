import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          viaIR: true,
          optimizer:  { enabled: true, runs: 4_294_967_295 },
          metadata: {
            bytecodeHash: "none",
          },
          outputSelection: {
            "*": {
              "*": ["evm.assembly", "irOptimized", "devdoc"],
            },
          },
        },
      },
    ],
    overrides: {
      "contracts/ImmutableSeaport.sol": {
        version: "0.8.17",
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 10,
          },
        }
      },
      "contracts/conduit/Conduit.sol": {
        version: "0.8.14",
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 1000000,
          },
        },
      },
      "contracts/conduit/ConduitController.sol": {
        version: "0.8.14",
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 1000000,
          },
        },
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      blockGasLimit: 30_000_000, // matches eth
    },
  },
  mocha: {
    timeout: 300000,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    outputFile: './gas-reporter-output.json',
    noColors: true,
  },
  paths: { cache: "hh-cache" },
};

export default config;
