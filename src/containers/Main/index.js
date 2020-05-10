import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ClipLoader } from 'react-spinners';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Actions from './components/Actions';
import Balance from './components/Balance';
import Send from './components/Send';
import Receive from './components/Receive';

import style from './style.module.scss';

const ACTIONS = 1;
const BALANCE = 2;
const SEND = 3;
const RECEIVE = 4;

const Main = ({ isLoading, balances, tokens, wallet }) => {
  const [activeTab, setActiveTab] = useState(ACTIONS);

  return (
    <div className={style['bpw-container']}>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={cx(style.menuItem, { [style.active]: activeTab === ACTIONS })}
            onClick={() => setActiveTab(ACTIONS)}
          >
            <span>ACTIONS</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={cx(style.menuItem, { [style.active]: activeTab === BALANCE })}
            onClick={() => setActiveTab(BALANCE)}
          >
            <span>BALANCE</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={cx(style.menuItem, { [style.active]: activeTab === SEND })}
            onClick={() => setActiveTab(SEND)}
          >
            <span>SEND</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={cx(style.menuItem, { [style.active]: activeTab === RECEIVE })}
            onClick={() => setActiveTab(RECEIVE)}
          >
            <span>RECEIVE</span>
          </NavLink>
        </NavItem>
      </Nav>

      <div className={style.tabContainer}>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={ACTIONS}>
            <Actions />
          </TabPane>
          <TabPane tabId={BALANCE}>
            <Balance tokens={tokens} balances={balances} />
          </TabPane>
          <TabPane tabId={SEND}>
            {activeTab === SEND && <Send tokens={tokens} balances={balances} wallet={wallet} />}
          </TabPane>
          <TabPane tabId={RECEIVE}>
            <Receive wallet={wallet} />
          </TabPane>
        </TabContent>

        {isLoading && (
          <div className={style.loaderContainer}>
            <ClipLoader size="35px" />
          </div>
        )}
      </div>
    </div>
  );
};

Main.propTypes = {
  isLoading: PropTypes.bool,
  balances: PropTypes.object,
  tokens: PropTypes.array,
  wallet: PropTypes.object
};

export default Main;
