import React, { useState, useContext } from 'react';

import { WalletContext } from 'contexts/WalletContext';
import cx from 'classnames';

import Header from './containers/Header';
import HoverOver from './components/HoverOver';
import Main from './containers/Main';
import OnBoarding from './containers/OnBoarding';
import Wallet from './contexts/wallet';

import style from './app.module.scss';

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [isMinimized, setMinimized] = useState(false);
  const { isLoading, wallet, balances, tokens, logout } = useContext(WalletContext);

  const toggleShowInfo = () => {
    if (!isMinimized) setShowInfo(!showInfo);
    else {
      setMinimized(false);
      setTimeout(() => {
        setShowInfo(true);
      }, 200);
    }
  };

  const toggleMinimize = () => {
    setMinimized(!isMinimized);
  };

  const handleLogout = () => {
    logout();
    toggleShowInfo();
  };

  const renderBody = () => {
    if (wallet) {
      return <Main isLoading={isLoading} tokens={tokens} balances={balances} wallet={wallet} />;
    } else {
      return <OnBoarding showInfo={showInfo} onToggle={toggleShowInfo} />;
    }
  };

  return (
    <div className={cx(style['blockparty-wallet-app'], { [style.min]: isMinimized })}>
      <Header isLoggedIn={!!wallet} onToggle={toggleShowInfo} onToggleMinimize={toggleMinimize} />

      {renderBody()}

      <HoverOver
        isLoggedIn={!!wallet}
        showInfo={showInfo}
        onToggle={toggleShowInfo}
        onLogout={handleLogout}
      />
      <Wallet />
    </div>
  );
}

export default App;
