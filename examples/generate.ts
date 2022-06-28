import {
  generateAllFundedWallets,
  generateFundedWallet,
} from '@thebettermint/xrpl-auto-funder';

const main = async () => {
  let wallet = await generateFundedWallet('testnet');
  console.log(wallet);
  let allWallets = await generateAllFundedWallets();
  console.log(allWallets);
};

main();
