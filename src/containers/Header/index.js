import React from 'react';
import PropTypes from 'prop-types';

import { MdHelp, MdSettings } from 'react-icons/md';

import style from './style.module.scss';

const Header = ({ isLoggedIn, onToggle, onToggleMinimize }) => {
  return (
    <div className={style['bpw-header']}>
      <span onClick={onToggleMinimize}>BlockParty Wallet</span>
      <div className={style.info}>
        {isLoggedIn ? <MdSettings onClick={onToggle} /> : <MdHelp onClick={onToggle} />}
      </div>
    </div>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onToggleMinimize: PropTypes.func.isRequired
};

export default Header;
