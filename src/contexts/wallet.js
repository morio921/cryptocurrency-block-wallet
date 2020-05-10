import React, { useContext } from 'react';

import SLPSDK from 'slp-sdk';

import { WalletContext } from 'contexts/WalletContext';
import { sendToken, sendBCH, cleanTxDust, getUtxos, generateMnemonic } from './utils';
import { importWallet } from './importWallet';

import { cashExplorer } from 'constants/config';

const bip39 = require('bip39');
const explorer = require('bitcore-explorers');
const slpjs = require('slpjs');

const wallet = () => {
  const { balances, tokens, transactions, wallet: walletInfo } = useContext(WalletContext);

  const wallet = {};

  wallet.name = 'Blockparty Wallet';

  wallet.isLoggedIn = () => {
    if (walletInfo) return true;
    return false;
  };

  wallet.getWalletDetails = () => {
    return walletInfo;
  };

  wallet.getWif = () => {
    if (walletInfo) return walletInfo.fundingWif;
    else return '';
  };

  wallet.getSLPAddress = () => {
    if (walletInfo) return walletInfo.slpAddress;
    else return '';
  };

  wallet.getBCHAddress = () => {
    if (walletInfo) return walletInfo.cashAddress;
    else return '';
  };

  wallet.getLegacyAddress = () => {
    if (walletInfo) return walletInfo.legacyAddress;
    else return '';
  };

  wallet.getBCHBalance = () => {
    return balances.balance;
  };

  wallet.getUnconfirmedBCHBalance = () => {
    return balances.unconfirmedBalance;
  };

  wallet.getSLPBalance = () => {
    return tokens;
  };

  wallet.getTransactions = () => {
    return transactions;
  };

  wallet.sendToken = (address, tokenId, amount) =>
    sendToken(walletInfo, {
      address,
      type: tokenId,
      amount
    });

  wallet.sendBCH = (receiverAddress, amount) => {
    sendBCH(walletInfo, receiverAddress, amount, () => {});
  };

  wallet.cleanTxDust = cleanTxDust;

  wallet.getUtxos = async () => {
    const utxos = await getUtxos(walletInfo.cashAddress);

    console.log('Utxos', utxos);

    return utxos;
  };

  wallet.generateMnemonic = generateMnemonic;

  wallet.importWallet = importWallet;

  wallet.broadcastTx = (tx, cb) => {
    const insight = new explorer.Insight(cashExplorer);

    insight.broadcast(tx.serialize(), cb);
  };

  wallet.libs = {
    bip39,
    SLPSDK,
    slpjs
  };

  window.blockparty = wallet;

  return <div />;
};

export default wallet;
