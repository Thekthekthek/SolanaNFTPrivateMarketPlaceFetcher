import { ParsedAccountData } from "@solana/web3.js";

export interface ImanagementNFTs{
    comingNFTs:(Buffer | ParsedAccountData)[],
    outGoingNFTs:(Buffer | ParsedAccountData)[]
  }