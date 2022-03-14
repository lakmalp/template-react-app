# Button

## Syntax

`jsx
    <Button
        type="button"
        text="Submit"
        variant="primary"
        className="mr-2 px-2"
        disabled={false}
        callback={() => handler()}
        icon={{ component: <IconSubmit />, width: 13 }}
        animate={false}
    />
`
## Props

### *_type_*

Can be of `button` or `link`. It defines how the html button element should be rendered.
### *_text_*

Display text of the button.
### *_variant_*

Accent of the button. Which can take "primary", "secondary", "danger", "default". All these variants have to be defined in the [theme.js](https://github.com/lakmalp/template-react-app/blob/develop/src/_core/theme.js).
### *_className_*

Additional css classes to be included in the container of the button html element.
### *_disabled_*

A boolean which specifies whether the button is disabled.
### *_callback_*

A callback to be called on `onClick` event.
### *_icon_*

Icon to be rendered to the left of the display text. It is an icon from the icon repository.
### *_animate_*

When `true`, it renders a spinning loading icon instead of the icon specified in `icon` prop.
## Default Props

1. animate: `false`
2. disabled: `false`
3. type: `button`
4. variant: `primary`
5. className: ""
