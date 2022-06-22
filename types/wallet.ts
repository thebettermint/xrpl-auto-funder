export interface AccountObj {
  xAddress: string;
  secret: string;
  classicAddress: string;
  address: string;
}

export interface WalletObj {
  type: string;
  account: AccountObj;
  amount: number;
  balance: number;
}
