import React from "react";
import PropTypes from 'prop-types';
import { IconLoading } from "../../utilities/svg-icons";
import theme from "../../theme";

const Button = ({
  type,
  text,
  disabled,
  callback,
  icon,
  animate,
  variant,
  className
}) => {

  const getClassName = () => {
    return className + ' ' + theme[type][variant][(disabled ? "disabled" : "enabled")]
  }
  
  return (
    <button
      className={getClassName()}
      onClick={() => callback()}
      disabled={disabled}
    >
      <div className='flex justify-center items-center'>
        {
          icon && !animate && <LazyIcon icon={icon.component} width={icon.width} className={" " + (animate ? "animate-spin-slow" : "")} color={disabled ? "#fff" : "#fff"} />
        }
        {
          animate && <IconLoading className=" animate-spin mr-2" width="15" color="white" />
        }
        {text && <span className={(icon?"ml-2":"")}>{text}</span>}
      </div>
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(["button", "link"]),
  text: PropTypes.string,
  disabled: PropTypes.bool,
  callback: PropTypes.func,
  icon: PropTypes.object,
  variant: PropTypes.oneOf(["primary", "warning", "danger", "info", "default"]),
  className: PropTypes.string
};

Button.defaultProps = {
  animate: false,
  disabled: false,
  type: "button",
  variant: "primary",
  className: ""
}

const LazyIcon = (props) => {
  return React.cloneElement(props.icon, {
    ...props
  })
}

export default Button;