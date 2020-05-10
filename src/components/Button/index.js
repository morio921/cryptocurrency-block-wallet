import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { Button as ReactstrapButton } from 'reactstrap';

import './style.scss';

/**
 * This component creates a standard button.
 *
 * This is a wrapper around the **Button** component from *reactstrap*
 */
const Button = ({ round, disabled, color, block, outline, children, onClick }) => {
  return (
    <ReactstrapButton
      color={color}
      disabled={disabled}
      outline={outline}
      block={block}
      className={cx('blockparty-wallet-btn', { ['btn-round']: round })}
      onClick={onClick}
    >
      {children}
    </ReactstrapButton>
  );
};

Button.propTypes = {
  block: PropTypes.bool,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark',
    'light',
    'link'
  ]),
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  round: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  block: false,
  color: 'primary',
  disabled: false,
  outline: false,
  round: false
};

export default Button;
