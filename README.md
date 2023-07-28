# SOLANA NFT Wallet Tracker

---

This following repo contains a project which have as a purpose to track the incoming and outgoing NFTs from a wallet. In this very case, the NFT collection tracked are the walken mobile game ones. The code is splitted in several parts :

1. Configuration repository, the one repository which contains the relevant endpoints for the program, it also makes the connection to the Solana mainnet network and it contains some useful methods allowing us to filters the NFTs.
&nbsp;
2. The models repository, this repository contains the models we mades for our scripts.
&nbsp;
3. The "wallet comparator" repository, this repository contains the method we use to compare the wallet at 2 distincts moments in order to get the ongoing and the outgoing NFTs.
&nbsp;


And finally the "fetchCath.ts" file which put together all of the previous methods we've defined in order to listen to the blockchain, fetch the NFTs and compare which ones are coming and which ones are leaving.
