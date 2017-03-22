
CSS to animate both `width` and `height`:
```css
/* original class */

#flyjet {
  transition: all 3s;
}

/* JS adds .growing */
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

Please note that `transitionend` triggers two times -- once for every property. So if we don't perform an additional check then the message would show up 2 times.
