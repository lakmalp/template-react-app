import React from "react";
import PropTypes from 'prop-types';
import theme from "../../theme";

const TextField = ({
  name,
  value,
  title,
  disabled,
  className,
  textAlign,
  onChangeCallback,
  onBlurCallback
}) => {
  const getClassName = () => {
    return className + ' text-' + textAlign  + ' ' + theme.textBox[(disabled ? "disabled" : "enabled")]
  }
  
  return (
    <input
      name={name}
      value={value}
      type="text"
      title={title}
      disabled={disabled}
      className={getClassName()}
      onChange={e => onChangeCallback(e)}
      onBlur={e => onBlurCallback(e)}
    />
  )
}

TextField.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

TextField.defaultProps = {
}

export default TextField;