import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import QRCode from 'components/QRCode';

import style from './style.module.scss';

const SLP = 'slpAddress';
const BCH = 'cashAddress';

const Receive = ({ wallet }) => {
  const [address, setAddress] = useState(SLP);

  const handleChangeAddress = (value: string) => {
    setAddress(value);
  };

  return (
    <div className={style['bpw-container']}>
      <p>{wallet[address]}</p>

      <QRCode address={address} wallet={wallet} />
      <div className={style.btnGroup}>
        <Button outline={address === BCH} color="success" onClick={() => handleChangeAddress(SLP)}>
          <span>SLP</span>
        </Button>

        <Button outline={address === SLP} color="success" onClick={() => handleChangeAddress(BCH)}>
          <span>BCH</span>
        </Button>
      </div>
    </div>
  );
};

Receive.propTypes = {
  wallet: PropTypes.object
};

export default Receive;
