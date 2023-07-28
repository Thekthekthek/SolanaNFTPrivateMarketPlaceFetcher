import { Connection, Keypair } from "@solana/web3.js";
import { ENDPOINT } from "./endpoint";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";
import { filters } from "./filterNMisc";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const solanaConnection = new Connection(ENDPOINT);

export const metaplex = Metaplex.make(solanaConnection)
  .use(keypairIdentity(Keypair.generate()))
  .use(bundlrStorage());

export const asyncAccounts = solanaConnection.getParsedProgramAccounts(
  TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
  { filters: filters }
);
