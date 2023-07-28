import {
  GetProgramAccountsFilter,
  ParsedAccountData,
  PublicKey,
} from "@solana/web3.js";
import { walletToQuery } from "./endpoint";
import { metaplex } from "./connection";

export const filters: GetProgramAccountsFilter[] = [
  {
    dataSize: 165, //size of account (bytes)
  },
  {
    memcmp: {
      offset: 32, //location of our query in the account (bytes)
      bytes: walletToQuery, //our search criteria, a base58 encoded string
    },
  },
];

export const filteringCurrentTokens = (
  walletAccounts: (Buffer | ParsedAccountData)[]
): (Buffer | ParsedAccountData)[] => {
  let walletCurrentTokens = walletAccounts.filter(
    (elem: any) => elem.parsed.info.tokenAmount.uiAmount == 1
  );
  walletCurrentTokens = walletCurrentTokens.map(
    (elem: any) => elem.parsed.info.mint
  );
  return walletCurrentTokens;
};

export const getAllTokensMetadata = async (
  movingNFTs: (Buffer | ParsedAccountData)[]
): Promise<string[]> => {
  let metadatas: string[] = [];
  for (let i = 0; i < movingNFTs.length; i++) {
    let nft = movingNFTs[i];
    let metadata = await metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(nft) });
    if (!metadata.json || !metadata.json.name) {
      return [];
    }
    metadatas.push(metadata.json.name);
  }

  return metadatas;
};
export const getLinksofNFTs = (name: string): string => {
  let url = name.includes("Cathlete")
    ? `https://walken.io/cathlete/${name.split("#")[1]}`
    : `https://walken.io/cathlete_item/${name.split("#")[1]}`;
  return url;
};
