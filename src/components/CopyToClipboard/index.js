import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CopyToClipboard from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';
import { Tooltip } from 'reactstrap';

const QRCode = ({ text }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 1500);
  };

  return (
    <React.Fragment>
      <CopyToClipboard text={text}>
        <MdContentCopy style={{ outline: 'none' }} id="copy" onClick={handleClick} />
      </CopyToClipboard>

      <Tooltip isOpen={visible} placement="top" target="copy">
        Copied!
      </Tooltip>
    </React.Fragment>
  );
};

QRCode.propTypes = {
  text: PropTypes.string
};

export default QRCode;
