import { getWalletDetails } from './utils';

export const getWallet = () => {
  const wallet = JSON.parse(localStorage.getItem('wallet'));

  return wallet;
};

export const importWallet = payload => {
  const walletDetails = getWalletDetails(payload);

  window.localStorage.setItem('wallet', JSON.stringify(walletDetails));

  return walletDetails;
};
