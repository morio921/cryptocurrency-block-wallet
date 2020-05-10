import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bitcore } from 'slpjs';

import Notification from 'react-web-notification';

import Button from 'components/Button';
import DropdownSelect from 'components/DropdownSelect';
import Input from 'components/Input';

import { sendToken, sendBCH } from 'contexts/utils';

import style from './style.module.scss';

const Send = ({ tokens, balances, wallet }) => {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [title, setTitle] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    address: '',
    amount: ''
  });

  const getOptionList = () => {
    const options = [{ label: 'BCH', value: 0 }];

    if (!tokens) {
      return options;
    } else {
      tokens.forEach(token => {
        options.push({ label: `${token.name} (${token.id})`, value: token.id });
      });

      return options;
    }
  };

  const isValid = () => {
    const { type, address, amount } = formData;

    if (!address || !/^[0-9]+([,.][0-9]+)?$/g.test(amount)) return false;
    if (!type && balances.balance < amount) return false;
    if (type) {
      const token = tokens.find(token => token.id === type);
      if (token && token.balance < parseFloat(amount)) return false;
    }

    return true;
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(p => ({ ...p, [name]: value }));
    setErrors(null);
  };

  const handleClickMax = () => {
    const { type } = formData;

    if (!type) {
      setFormData({ ...formData, amount: balances.balance });
    } else {
      setFormData({
        ...formData,
        amount: tokens.find(token => token.id === type).balance
      });
    }
  };

  const handleSubmit = () => {
    const { type, address, amount } = formData;

    if (type) {
      setLoading(true);
      sendToken(wallet, formData)
        .then(() => {
          setLoading(false);
          setTitle('Token sent successfully');
        })
        .catch(err => {
          setLoading(false);
          setErrors(err.message);
        });
    } else {
      if (bitcore.Address.isValid(address)) {
        sendBCH(wallet, address, amount, err => {
          if (err) {
            setLoading(false);
            setErrors(err.message || err);
          } else {
            setLoading(false);
            setTitle('Transaction successful.');
          }
        });
      } else {
        setErrors('Invalid address');
      }
    }
  };

  return (
    <div className={style['bpw-container']}>
      <div className={style.form}>
        <div className={style.formField}>
          <label>Select BCH or any other SLP token you'd like to send</label>
          <br />
          <DropdownSelect
            options={getOptionList()}
            defaultValue={getOptionList()[0]}
            onChange={({ value }) => handleChange({ target: { name: 'type', value } })}
          />
        </div>

        <div className={style.formField}>
          <label>BCH/SLP address</label>
          <br />
          <Input name="address" onChange={handleChange} />
        </div>

        <div className={style.formField}>
          <label>Amount</label>
          <a onClick={handleClickMax}>Max</a>
          <br />
          <Input name="amount" value={formData.amount} onChange={handleChange} />
        </div>

        {errors && <p className={style.errorText}>Error: {errors}</p>}

        <div className={style.submit}>
          <Button color="success" disabled={!isValid() || isLoading} onClick={handleSubmit}>
            <span>Send</span>
          </Button>
        </div>
      </div>

      <Notification ignore={!title} timeout={5000} title={title} />
    </div>
  );
};

Send.propTypes = {
  tokens: PropTypes.array,
  balances: PropTypes.object,
  wallet: PropTypes.object
};

export default Send;
