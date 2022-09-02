import { Wallet, Payment, xrpToDrops, FeeRequest } from 'xrpl';
import * as client from './client';
import { WalletObj } from '../../../types/wallet';
import { Amount } from 'xrpl/dist/npm/models/common';
import { checkBalance } from './checkBalance';
import { servers } from '../../lib/constants/faucets';

export const payment = async ({
  wallet,
  publicAddress,
  destinationTag,
  amount,
  network,
}: {
  wallet: WalletObj;
  publicAddress?: string;
  destinationTag?: number | undefined;
  amount?: string | undefined;
  network: string;
}) => {
  let api = await client.init(servers[network]);
  try {
    await api.connect();
    let signer = Wallet.fromSecret(wallet.account.secret);
    let handledAmount: Amount = amount
      ? xrpToDrops(amount)
      : xrpToDrops(String(wallet.balance));

    const feeRequest: FeeRequest = {
      command: 'fee',
    };

    let feeResponse = await api.request(feeRequest);
    let fee: string = feeResponse.result.drops.median_fee;
    let cushion = api.feeCushion;
    handledAmount = String(
      parseInt(handledAmount) -
        Math.max(12000, parseInt(fee) * cushion) -
        parseInt(xrpToDrops('10'))
    );

    if (!publicAddress)
      throw Error('Destination account not found for payment');

    let tx: Payment = {
      TransactionType: 'Payment',
      Account: signer.classicAddress,
      Amount: handledAmount,
      Destination: publicAddress,
      Fee: String(Math.max(12000, parseInt(fee) * cushion)),
    };

    if (destinationTag) tx.DestinationTag = destinationTag;

    let options = {
      autfill: true,
      failhard: true,
      wallet: signer,
    };

    await checkBalance(api, signer.classicAddress);

    let response = await api.submitAndWait(tx, options);

    let meta: any;
    if (response && response.result?.meta) meta = response.result?.meta;
    if (meta.TransactionResult !== 'tesSUCCESS') {
      throw Error('Transaction was not successful');
    }

    let self_balances = await checkBalance(api, signer.classicAddress);
    let destination_balances = await checkBalance(api, tx.Destination);
    if (self_balances instanceof Error || destination_balances instanceof Error)
      throw Error('Resulting balances could not be found');

    let resultObj = Object.assign(
      { network: network },
      { hash: response.result.hash }
    );

    return resultObj;
  } catch (error: any) {
    return Error(`${network.toUpperCase() + ': ' + error.message}`);
  } finally {
    api.disconnect();
  }
};
