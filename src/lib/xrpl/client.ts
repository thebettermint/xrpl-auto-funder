import { Client, Request } from 'xrpl';

export const init = async (url: string) => {
  return new Client(url);
};

export const connect = (api: Client) => {
  return new Promise(async (resolve) => {
    await api.connect();
    resolve('connected');
  });
};

export const disconnect = (api: Client) => {
  return new Promise(async (resolve) => {
    await api.disconnect();
    resolve('disconnected');
  });
};

export const request = (api: Client, request: Request) => {
  return new Promise(async (resolve) => {
    let response = await api.request(request);
    resolve(response);
  });
};

export const on = (api: Client, event: any, fn: any) => {
  api.on(event, fn);
};
