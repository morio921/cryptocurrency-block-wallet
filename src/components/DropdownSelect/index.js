import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

const $color_white = '#ffffff';
const $color_green = '#5cbd6d';
const $color_grey = '#888888';
const $text_color = '#000000';

const DropdownSelect = ({ placeholder, defaultValue, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const customStyles = {
    control: provided => ({
      ...provided,
      border: `1px solid ${$color_grey}`,
      borderRadius: 5,
      boxShadow: 'none',
      paddingLeft: 5,
      fontSize: 14,
      color: $text_color,
      '&:hover': {
        boxShadow: 'none'
      }
    }),
    valueContainer: provided => ({
      ...provided,
      paddingLeft: 0,
      color: $text_color
    }),
    option: (provided, state) => ({
      ...provided,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: '100%',
      fontSize: 14,
      backgroundColor: state.isSelected ? $color_green : $color_white,
      color: state.isSelected ? $color_white : $text_color,
      '&:hover': {
        backgroundColor: $color_green,
        color: $color_white
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  };

  const handleChange = newOption => {
    setSelectedOption(newOption);
    if (onChange) {
      onChange(newOption);
    }
  };

  return (
    <Select
      styles={customStyles}
      isSearchable={false}
      placeholder={placeholder}
      value={selectedOption}
      options={options}
      onChange={handleChange}
    />
  );
};

DropdownSelect.propTypes = {
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.object,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default DropdownSelect;
