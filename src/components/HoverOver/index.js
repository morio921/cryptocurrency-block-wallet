import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { MdClose, MdExitToApp } from 'react-icons/md';
import Button from 'components/Button';
import Input from 'components/Input';

import { slpSocketUrl, bitSocketUrl, slpDBUrl, bitDBUrl } from 'constants/config';

import style from './style.module.scss';

const HoverOver = ({ isLoggedIn, showInfo, onToggle, onLogout }) => {
  const [form, setForm] = useState({
    bchBase: localStorage.getItem('bchBase') || bitDBUrl,
    slpBase: localStorage.getItem('slpBase') || slpDBUrl,
    bchSocket: localStorage.getItem('bitSocket') || bitSocketUrl,
    slpSocket: localStorage.getItem('slpSocket') || slpSocketUrl
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = () => {
    const { bchBase, slpBase, bchSocket, slpSocket } = form;

    if (bchBase) localStorage.setItem('bchBase', bchBase);
    if (slpBase) localStorage.setItem('slpBase', slpBase);
    if (bchSocket) localStorage.setItem('bchSocket', bchSocket);
    if (slpSocket) localStorage.setItem('slpSocket', slpSocket);
  };

  const renderInfo = () => {
    return (
      <React.Fragment>
        <h2>
          Help
          <MdClose className={style.closeBtn} onClick={onToggle} />
        </h2>
        <p>
          The Blockparty Wallet keeps your private key on your computer. If you don't already have a
          Bitcoin address you can download the 12 word mnemonic. Please ensure you keep it safe as
          anyone who has it can send your funds. Many people choose to write it down on a piece of
          paper (or two) and store it somewhere secure. Once you have saved your key, click "Import"
          and type it in. When you want to logout just click the settings button on the top and
          click the "Logout" button.
          <br /> If you'd like to learn more about private keys, this article{' '}
          <a href="https://en.bitcoin.it/wiki/Private_key">Bitcoin Wiki</a> has more information. If
          you'd like to learn more about the Blockparty Wallet or need more help visit the{' '}
          <a href="https://blockparty.sh">Website</a> and say hello.
        </p>
      </React.Fragment>
    );
  };

  const renderSettings = () => {
    return (
      <React.Fragment>
        <h2>
          Settings
          <MdClose className={style.closeBtn} onClick={onToggle} />
        </h2>

        <Button color="success" onClick={onLogout}>
          <span>
            LOGOUT
            <MdExitToApp />
          </span>
        </Button>

        <div className={style.body}>
          <div className={style.formField}>
            <label>
              BitServe Base Url{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/fountainhead-cash/bitserve"
              >
                (source)
              </a>
            </label>
            <br />
            <Input name="bchBase" value={form.bchBase} onChange={handleChange} />
          </div>

          <div className={style.formField}>
            <label>
              SlpServe Base Url
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/fountainhead-cash/slpserve"
              >
                (source)
              </a>
            </label>
            <br />
            <Input name="slpBase" value={form.slpBase} onChange={handleChange} />
          </div>

          <div className={style.formField}>
            <label>
              BCH SocketServe Base Url
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/fountainhead-cash/sockserve"
              >
                (source)
              </a>
            </label>
            <br />
            <Input name="bchSocket" value={form.bchSocket} onChange={handleChange} />
          </div>

          <div className={style.formField}>
            <label>
              SlpSocketServe Base Url
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/fountainhead-cash/slpsockserve"
              >
                (source)
              </a>
            </label>
            <br />
            <Input name="slpSocket" value={form.slpSocket} onChange={handleChange} />
          </div>

          <div className={style.submit}>
            <Button color="success" onClick={handleSubmit}>
              <span>Update</span>
            </Button>
          </div>
        </div>

        <div className={style.footer}>
          <a href={'https://github.com/coldflame426/blockparty-wallet/'}>
            <label>Blockparty wallet</label>
          </a>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className={cx(style['bpw-container'], { [style.active]: showInfo })}>
      {!isLoggedIn ? renderInfo() : renderSettings()}
    </div>
  );
};

HoverOver.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  showInfo: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default HoverOver;
