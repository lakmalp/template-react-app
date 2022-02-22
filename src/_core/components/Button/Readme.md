---
name: Button
menu: Components
---

import { Playground, Props } from 'docz'
import { Button } from './Button'
import { IconEdit } from '../../utilities/svg-icons.js'


# Button

## Properties

<Props of={Button} />

## Basic usage

<Playground>
  <Button
    type="button"
    text="Save"
    disabled={isButtonDisabled}
    callback={() => save()}
    icon={{ component: <IconEdit />, width: 13 }}
  />
</Playground>
