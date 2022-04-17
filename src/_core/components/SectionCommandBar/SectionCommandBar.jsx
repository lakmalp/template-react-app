import React from "react"
import { Button } from "../index.js"

const SectionCommandBar = (props) => {

  return (
    <div className="flex items-center font-montserrat text-sm font-semibold p-2">
      {
        props.buttons && props.buttons.map((button, index) =>
          <Button
            variant="primary"
            className="mr-2 px-2"
            key={index}
            text={button.caption}
            disabled={button.disabled}
            callback={button.callback}
            icon={{ component: button.icon, width: 13 }}
          />
        )
      }
    </div>
  )
}

export default SectionCommandBar