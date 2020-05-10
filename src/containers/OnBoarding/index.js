import React, { useState, useEffect, useContext } from 'react';
import cx from 'classnames';

import { WalletContext } from 'contexts/WalletContext';

import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Generate from '../Generate';
import Import from '../Import';

import style from './style.module.scss';

const GENERATE = 1;
const IMPORT = 2;

const OnBoarding = () => {
  const [activeTab, setActiveTab] = useState(GENERATE);
  const { mnemonic, generateMnemonic, importWallet } = useContext(WalletContext);

  useEffect(() => {
    generateMnemonic();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={style['bpw-container']}>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={cx(style.menuItem, { [style.active]: activeTab === GENERATE })}
            onClick={() => setActiveTab(GENERATE)}
          >
            GENERATE
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={cx(style.menuItem, { [style.active]: activeTab === IMPORT })}
            onClick={() => setActiveTab(IMPORT)}
          >
            IMPORT
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={GENERATE}>
          <Generate mnemonic={mnemonic} />
        </TabPane>

        <TabPane tabId={IMPORT}>
          <Import onImport={importWallet} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default OnBoarding;
