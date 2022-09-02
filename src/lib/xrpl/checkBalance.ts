import { Client } from 'xrpl';

export const checkBalance = async (api: Client, address: string) => {
  try {
    let response = await api.request({
      command: 'account_lines',
      account: address,
      ledger_index: 'validated',
    });

    return response;
  } catch (error) {
    return Error('Account not found');
  }
};
