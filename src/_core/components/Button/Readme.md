## Button

### Description:
A Button can display itself as a button or a link.

NB: `icon.component` is an svg representation.

### Usage:
```html
<Button
  type="button"
  text="Save"
  disabled={isButtonDisabled}
  callback={() => save()}
  icon={{ component: <Icon />, width: 13 }}
/>
```
