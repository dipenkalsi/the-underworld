export default {
    // === Required information for connecting to the network === \\
    chainId: 84962, // Chain ID of the network
    // Array of RPC URLs to use
    rpc: ["https://api-goldcoast.dcomm.network/ext/bc/ACT/rpc"],

    // === Information for adding the network to your wallet (how it will appear for first time users) === \\
    // Information about the chains native currency (i.e. the currency that is used to pay for gas)
    nativeCurrency: {
      decimals: 18,
      name: "D-comm",
      symbol: "DCM",
    },
    shortName: "DCM", // Display value shown in the wallet UI
    slug: "dcomm", // Display value shown in the wallet UI
    testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
    chain: "Dcomm", // Name of the network
    name: "Dcomm-goldcoast (Action-Chain)", // Name of the network
  }