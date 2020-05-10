import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { Tooltip } from 'reactstrap';

import style from './style.module.scss';

const InputField = ({ iconSrc, info, noBorder, ...rest }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className={style['bpw-container']} onMouseLeave={() => setVisible(false)}>
      <input
        {...rest}
        className={cx(
          style.textInput,
          {
            [style.textInputDisabled]: rest.disabled,
            [style.noBorder]: noBorder
          },
          'no-override'
        )}
      />
      {iconSrc && <img width={20} src={iconSrc} alt="icon" className={style.icon} />}
      {info && (
        <React.Fragment>
          <span
            id="info"
            className={style.info}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            i
          </span>

          <Tooltip isOpen={isVisible} placement="top" target="info">
            {info}
          </Tooltip>
        </React.Fragment>
      )}
    </div>
  );
};

InputField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  iconSrc: PropTypes.string,
  info: PropTypes.string,
  noBorder: PropTypes.bool,
  onChange: PropTypes.func
};

export default InputField;
