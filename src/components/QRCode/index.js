import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CopyToClipboard from 'react-copy-to-clipboard';
import RawQRCode from 'qrcode.react';
import { Tooltip } from 'reactstrap';

const QRCode = ({ address, wallet }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  return (
    <div>
      <CopyToClipboard text={wallet[address]}>
        <RawQRCode id="qrcode" onClick={handleClick} value={wallet[address]} size={180} />
      </CopyToClipboard>

      <Tooltip isOpen={visible} placement="top" target="qrcode">
        Copied!
      </Tooltip>
    </div>
  );
};

QRCode.propTypes = {
  address: PropTypes.string,
  wallet: PropTypes.object
};

export default QRCode;
