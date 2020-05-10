import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { MdCloudUpload } from 'react-icons/md';
import Button from 'components/Button';

import style from './style.module.scss';

const bip39 = require('bip39');
const { bitcore } = require('slpjs');

const Import = ({ onImport }) => {
  const [formData, setFormData] = useState({
    mnemonic: '',
    wif: ''
  });
  const [error, setError] = useState({
    mnemonic: '',
    wif: ''
  });

  const handleChange = e => {
    const { value, name } = e.target;

    setFormData(data => ({ ...data, [name]: value }));
    setError({ [name]: '' });
  };

  const isValidForm = () => {
    const { mnemonic, wif } = formData;

    if (mnemonic) {
      if (!bip39.validateMnemonic(mnemonic)) {
        setError({ mnemonic: 'Should be a valid mnemonic!' });
        return false;
      }

      return true;
    }

    if (wif.length !== 52 || (wif[0] !== 'K' && wif[0] !== 'L')) {
      setError({ wif: 'Should be a valid WIF' });
      return false;
    }

    try {
      bitcore.PrivateKey(wif);
      return true;
    } catch (error) {
      setError({ wif: 'Should be a valid WIF' });
      return false;
    }
  };

  const handleSubmit = () => {
    const { mnemonic, wif } = formData;

    if (!mnemonic && !wif) return;
    if (isValidForm()) {
      onImport(formData);
    }
  };

  return (
    <div className={style['bpw-container']}>
      <div className={style.form}>
        <div className={style.formField}>
          <label>Type the 12 word phrase you downloaded when generating the wallet</label>
          <br />
          <textarea
            name="mnemonic"
            className={cx({ [style.error]: !!error.mnemonic })}
            onChange={handleChange}
          />
          <span className={style.errorText}>{error.mnemonic}</span>
        </div>

        <div className={style.formField}>
          <label>Or input the WIF</label>
          <br />
          <textarea
            name="wif"
            className={cx({ [style.error]: !!error.wif })}
            onChange={handleChange}
          />
          <span className={style.errorText}>{error.wif}</span>
        </div>

        <div className={style.submit}>
          <Button disabled={!formData.mnemonic && !formData.wif} onClick={handleSubmit}>
            <span>
              Import
              <MdCloudUpload />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

Import.propTypes = {
  onImport: PropTypes.func.isRequired
};

export default Import;
