As we can see from HTML/CSS, the slider is a `<div>` with a colored background, that contains a runner -- another `<div>` with `position:relative`.

To position the runner we use `position:relative`, to provide the coordinates relative to its parent, here it's more convenient here than `position:absolute`.

Then we implement horizontal-only Drag'n'Drop with limitation by width.
