import React from "react";
import PropTypes from 'prop-types';
import theme from "../../theme";

const TextBox = ({
  title,
  disabled,
  className,
  textAlign,
  onChangeCallback,
  onBlurCallback
}) => {

  const getClassName = () => {
    return className + ' ' + theme.textBox[(disabled ? "disabled" : "enabled")]
  }
  
  return (
    <input
      type="text"
      //title
      disabled={disabled}
      className={getClassName()}
      //onChange
      //onBlur
    />
  )
}

TextBox.propTypes = {
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