# Just a Counter

But it also listens to button 8 of XInput controller, which is "Select".

Use your mouse wheel or the button on the first connected controller to change the number, click anywhere for 500ms to reset the number.

You can add some Custom CSS to this page on OBS as below:

```css
body {
  background-color: BACKGROUND_COLOR;
  color: TEXT_COLOR;
  font-family: FONT;
}
.beingUpdated {
  color: FLASH_COLOR_WHEN_NUMBER_CHANGES;
}
.isResetting {
  color: FLASH_COLOR_WHEN_ABOUT_TO_BE_RESET;
}
```
