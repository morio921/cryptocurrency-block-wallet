import { useEffect, useState } from 'react';

import { getWallet, importWallet } from './importWallet';
import {
  generateMnemonic,
  getBalance,
  getTokenInfo,
  getSLPTransactions,
  getBCHTransactions,
  getBlockCount,
  getTrans
} from './utils';
import { slpSocketUrl, bitSocketUrl } from 'constants/config';

const bchSocket = localStorage.getItem('bchSocket') || bitSocketUrl;
const slpSocket = localStorage.getItem('slpSocket') || slpSocketUrl;

const update = async ({
  wallet,
  setBalances,
  setTransactions,
  setTokens,
  setLoading,
  setCount
}) => {
  if (!wallet) {
    return;
  }

  setLoading(true);
  Promise.all([
    getBalance(wallet),
    getSLPTransactions(wallet.slpAddress),
    getBCHTransactions(wallet.cashAddress),
    getTokenInfo(wallet.slpAddress),
    getBlockCount()
  ])
    .then(values => {
      setLoading(false);
      setBalances(values[0]);
      const transactions = getTrans(values[1], values[2]);
      setTransactions(transactions);
      setTokens(values[3]);
      setCount(values[4]);
    })
    .catch(error => {
      console.log('Error updating balance and transactions : ', error.message || error.error);
      setLoading(true);
    });
};

export const useWallet = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [wallet, setWallet] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [balances, setBalances] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const openSlpSocket = ({ slpAddress }) => {
    const query = {
      v: 3,
      q: {
        db: ['c', 'u'],
        find: {
          $or: [
            {
              'in.e.a': slpAddress
            },
            {
              'out.e.a': slpAddress
            }
          ]
        },
        sort: {
          'blk.i': -1
        },
        limit: 100
      },
      r: {
        f: '[.[] | { txid: .tx.h, tokenDetails: .slp, blk: .blk, in, out } ]'
      }
    };

    const b64 = btoa(JSON.stringify(query));

    const url = `${slpSocket}/${b64}`;

    const socket = new EventSource(url);

    socket.onmessage = message => {
      const { data } = JSON.parse(message.data);

      if (data.length) {
        setTimeout(() => {
          update({
            wallet: getWallet(),
            setBalances,
            setTransactions,
            setTokens,
            setLoading,
            setCount
          });
        }, 1000);
      }
    };
  };

  const openBitSocket = ({ cashAddress }) => {
    const query = {
      v: 3,
      q: {
        find: {
          $or: [
            {
              'in.e.a': cashAddress.slice(12)
            },
            {
              'out.e.a': cashAddress.slice(12)
            }
          ]
        }
      }
    };

    const b64 = btoa(JSON.stringify(query));

    const url = `${bchSocket}/${b64}`;

    const socket = new EventSource(url);

    socket.onmessage = async message => {
      const { data } = JSON.parse(message.data);

      if (data.length) {
        update(
          {
            wallet: getWallet(),
            setBalances,
            setTransactions,
            setTokens,
            setLoading,
            setCount
          },
          1000
        );
      } else {
        const count = await getBlockCount();
        setCount(count);
      }
    };
  };

  useEffect(() => {
    const w = getWallet();
    if (w) {
      setWallet(w);
      openSlpSocket(w);
      openBitSocket(w);
      update({
        wallet: getWallet(),
        setBalances,
        setTransactions,
        setTokens,
        setLoading,
        setCount
      });
    }
  }, []);

  return {
    mnemonic,
    wallet,
    isLoading,
    balances,
    tokens,
    transactions,
    count,
    importWallet: payload => {
      const newWallet = importWallet(payload);
      setWallet(newWallet);
      update({ wallet: newWallet, setBalances, setTransactions, setTokens, setLoading, setCount });
    },
    generateMnemonic: () => {
      setMnemonic(generateMnemonic());
    },
    logout: () => {
      setWallet(null);
      setBalances({});
      window.localStorage.setItem('wallet', JSON.stringify(null));
    }
  };
};
