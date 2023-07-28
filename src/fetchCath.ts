import { Connection, ParsedAccountData } from "@solana/web3.js";
import { walletComparator } from "./walletComparator/walletComparator";
import { solanaConnection } from "./config/connection";
import { walletToQuery } from "./config/endpoint";
import {
  filteringCurrentTokens,
  filters,
  getAllTokensMetadata,
  getLinksofNFTs,
} from "./config/filterNMisc";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

let walletPreviousTokens: (Buffer | ParsedAccountData)[] = [];
async function getTokenAccounts(
  wallet: string,
  solanaConnection: Connection,
  firstTime: boolean
) {
  const accounts = await solanaConnection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    { filters: filters }
  );

  if (firstTime)
    console.log(
      `Found ${accounts.length} token account(s) for wallet ${wallet}.`
    );
  let walletAccounts = accounts.map(({ account }) => account.data);
  let walletCurrentTokens = filteringCurrentTokens(walletAccounts);

  let { comingNFTs, outGoingNFTs } = await walletComparator(
    walletCurrentTokens,
    walletPreviousTokens,
    firstTime
  );
  walletPreviousTokens = walletCurrentTokens;
  let comingData = (await getAllTokensMetadata(comingNFTs)).map((token) =>
    getLinksofNFTs(token)
  );
  let leavingData = (await getAllTokensMetadata(outGoingNFTs)).map((token) =>
    getLinksofNFTs(token)
  );
  if (!firstTime) {
    if (comingData.length) console.log(`Coming NFTs: ${comingData}`);
    if (leavingData.length) console.log(`Outgoing NFTs: ${leavingData}`);
    if (!comingData.length && !leavingData.length)
      console.log(`No NFTs coming or leaving... Waiting for next round`);
  }
  if (firstTime) console.log(`Harvesting new cathletes or items...`);

  comingData.forEach((elem) => {
    if (elem.includes("cathlete/")) {
      let ID = elem.split("/").pop();
      if (ID) {
        console.log(`Cathlete incoming ${ID}`);
      }
    }
  });
  leavingData.forEach((elem) => {
    if (elem.includes("cathlete/")) {
      let ID = elem.split("/").pop();
      if (ID) {
        console.log(`Cathlete leaving ${ID}`);
      }
    }
  });
}

const fcn = async () => {
  await getTokenAccounts(walletToQuery, solanaConnection, true);
  while (true) {
    await getTokenAccounts(walletToQuery, solanaConnection, false);
  }
};
fcn();
