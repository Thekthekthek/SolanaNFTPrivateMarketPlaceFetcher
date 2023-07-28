import { ParsedAccountData } from "@solana/web3.js";
import { ImanagementNFTs } from "../models/i-managementNFTs";
export async function walletComparator(
  currentList: (Buffer | ParsedAccountData)[],
  walletPreviousTokens: (Buffer | ParsedAccountData)[],
  firstTime: boolean
): Promise<ImanagementNFTs> {
  if (!currentList) {
    return { comingNFTs: [], outGoingNFTs: [] };
  } else {
    let comingNFTs: (Buffer | ParsedAccountData)[] = [];
    let outGoingNFTs: (Buffer | ParsedAccountData)[] = [];
    if (firstTime) {
      const response: ImanagementNFTs = { comingNFTs, outGoingNFTs };
      return response;
    }
    outGoingNFTs = walletPreviousTokens.filter(
      (elem: any) => !currentList.includes(elem)
    );
    comingNFTs = currentList.filter(
      (elem: any) => !walletPreviousTokens.includes(elem)
    );
    const response: ImanagementNFTs = { comingNFTs, outGoingNFTs };
    return response;
  }
}
