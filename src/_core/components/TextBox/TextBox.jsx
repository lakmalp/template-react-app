import React from "react";
import PropTypes from 'prop-types';
import theme from "../../theme";

const TextBox = ({
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

TextBox.propTypes = {
  value: PropTypes.string, 
  title: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string
  // textAlign:
  // onChangeCallback: 
  // onBlurCallback:
};

TextBox.defaultProps = {
  // title:
  // disabled:
  // className:
  // textAlign:
}

export default TextBox;