# Just a Credit Counter

But it also listens to one button of XInput controller, default is "Select", or button 8.

Use your mouse wheel or the button on the first connected controller to change the number, click anywhere for 500ms to reset the number.

You can add a query parameter at the end of the address to make some change to how it looks.

> - `convert=`[`us`|`jp`|`ko`]  
> If given, there will be a second line that shows the worth of the credits in the given currency.
> - `button=`[button index number]  
> One gamepad button to use to increase the number. Default is 8.
> - `color=`[text color]  
>   `flash=`[flash color when updating]  
>   `reset=`[flash color when resetting]  
>   `shadow=`[shadow color when flashing]  
> color can be any color names recognized by browsers, or 6-letter hex code without '#'.
> - `font=`[font name]  
> Font name typed can have spaces, which should be converted as `%20` by browsers then replaced back by the page.

eg) `?convert=jp&button=8&color=white&flash=ffff00&reset=ff0000&shadow=ffa500&font=Fira Code`
