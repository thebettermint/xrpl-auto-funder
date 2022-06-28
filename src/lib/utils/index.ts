import { validNetworks } from '../constants/faucets';

import * as generate from './generate';
import * as parse from './parse';
import { wait } from './wait';

export const isValidNetwork = async (network: string) => {
  return validNetworks.includes(network);
};

export default {
  generate,
  parse,
  isValidNetwork,
  wait,
};
