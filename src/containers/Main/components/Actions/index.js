import React, { useContext } from 'react';
import cx from 'classnames';

import { WalletContext } from 'contexts/WalletContext';

import style from './style.module.scss';

const Actions = () => {
  const {
    wallet: { slpAddress: slpAddr, cashAddress },
    transactions,
    count
  } = useContext(WalletContext);

  const cashAddr = cashAddress.slice(12);
  const addresses = [slpAddr, cashAddr];

  const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}-${month < 10 ? '0' : ''}${month}-${day} ${hours}:${minutes}`;
  };

  if (!transactions || !transactions.length)
    return <div className={style['bpw-noTransaction']}>No transaction</div>;
  return (
    <div className={style['bpw-container']}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Confirms</th>
            <th>Inputs</th>
            <th>Outputs</th>
            <th>BCH Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions
            .map(tx => ({
              ...tx,
              isSend: tx.in.some(el => addresses.includes(el.e.a))
            }))
            .map(tx => {
              const outputTxs = tx.out.filter(item => addresses.includes(item.e.a));

              const myOutputs = outputTxs.length
                ? outputTxs.map(item => item.e.v).reduce((a, v) => a + v)
                : 0;

              const inputTxs = tx.in
                .map(({ e: { h, i } }) => {
                  let temp = transactions.find(trans => trans.txid === h);
                  return temp ? temp.out[i] : null;
                })
                .filter(item => !!item);

              const myInputs = inputTxs.length
                ? inputTxs.map(item => item.e.v).reduce((a, v) => a + v)
                : 0;

              let bchAmount = myOutputs - myInputs;

              if (tx.isSLP && !tx.isSend) bchAmount = 546;

              return (
                <tr key={tx.txid}>
                  <td>{tx.blk ? formatDate(new Date(tx.blk.t * 1000)) : '-'}</td>
                  <td>
                    <a
                      href={`https://explorer.bitcoin.com/bch/tx/${tx.txid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tx.txid}
                    </a>
                  </td>
                  <td>{tx.blk ? count - tx.blk.i + 1 : 0}</td>
                  <td>{tx.in.length}</td>
                  <td>{tx.out.length}</td>
                  <td>
                    <span
                      className={cx(style.balance, {
                        [style.minus]: tx.isSend
                      })}
                    >
                      {!tx.isSend && '+'}
                      {bchAmount / 10 ** 8}
                    </span>
                  </td>
                  <td>{`${tx.isSLP ? 'SLP' : 'BCH'} ${tx.isSend ? 'Send' : 'Receive'}`}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Actions;
