import React from 'react';
import PropTypes from 'prop-types';

import { MdFileDownload } from 'react-icons/md';
import Button from 'components/Button';
import CopyToClipboard from 'components/CopyToClipboard';

import style from './style.module.scss';

const Generate = ({ mnemonic }) => {
  const handleDownload = () => {
    const fileType = 'text/plain';
    const filename = 'blockparty-wallet-mnemonic.txt';
    const blob = new Blob([mnemonic], { type: fileType });

    const a = document.createElement('a');
    a.download = filename;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
    }, 1500);
  };

  return (
    <div className={style['bpw-container']}>
      <p>
        Ensure you save these words and keep them safe, they are the key to your new wallet. Without
        them, your money will be lost forever. Go to Import after saving.
      </p>

      <h6>
        <span>{mnemonic}</span>
        <CopyToClipboard text={mnemonic} />
      </h6>

      <Button color="success" onClick={handleDownload}>
        <span>
          Download
          <MdFileDownload />
        </span>
      </Button>
    </div>
  );
};

Generate.propTypes = {
  mnemonic: PropTypes.string
};

export default Generate;
