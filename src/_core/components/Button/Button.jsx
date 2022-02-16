import React from "react";

const Button = ({ type, text, disabled, callback, icon }) => {
  const className = () => {
    switch (type) {
      case "button":
        return `mr-2 py-1 text-xs font-roboto rounded text-black ` + (disabled ? "bg-gray-200 pointer-events-none" : "border border-blue-300 bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300 hover:shadow");
      default:
        return `mr-2 py-2 text-xs font-roboto rounded ` + (disabled ? "text-gray-500 pointer-events-none" : " text-black hover:text-white hover:bg-gray-500");
    }
  }
  return (
    <button
      className={className()}
      onClick={() => callback()}
      disabled={disabled}
    >
      <div className='flex items-center mx-2'>
        {
          icon && <LazyIcon icon={icon.component} width={icon.width} className="mr-2" color={disabled ? "#000" : "#000"} />
        }
        {text}
      </div>
    </button>
  )
}



const LazyIcon = (props) => {
  return React.cloneElement(props.icon, {
    ...props
  })
}

export default Button;