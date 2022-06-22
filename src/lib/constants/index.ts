export const wsPreamble = 'WS: ';

export const wsStatusMessages = {
  open: wsPreamble + 'The websocket has been successfully opened',
  connected:
    wsPreamble + 'The websocket has been successfully connected upon request',
  closed: wsPreamble + 'The websocket has been successfully closed',
  error: wsPreamble + 'The websocket has received an error',
  tx: wsPreamble + 'The websocket has received a transaction event',
  lgr: wsPreamble + 'The websocket has received a ledger close event',
};

export const serverURL = 'wss://xls20-sandbox.rippletest.net:51233';
export const mainServerURL = 'wss://s1.ripple.com/';
