# lightness / saturation (CSS-in-JS)
These functions change lightness and saturation for color

## Syntax example
```js
lightness('#b3ddb8', -20); // return '#7ac483' 
saturation('yellowgreen', 50); // return '#a2e718'
```
## Custom Parameters
1st parameter - color in hexadecimal format ('#b3ddb8') or color name ('yellowgreen')<br>
2nd parameter - percentage range [-100, 100]<br>

---

# opacity (CSS-in-JS)
This func change opacity for color

## Syntax example
```js
opacity('green', 80); // return '#008000cc' 
```
## Custom Parameters
1st parameter - color in hexadecimal format ('#008000') or color name ('green')<br>
2nd parameter - percentage range [0, 100]<br>

---

# hsla (CSS-in-JS)
This func change saturation, lightness and opacity for color

## Syntax example
```js
hsla('#cdb6df', 100, -50, 70); // return '#7200c9b3'
```
## Custom Parameters
1st parameter - color in hexadecimal format ('#cdb6df') or color name ('yellow')<br>
2nd parameter - percentage range of saturation [-100, 100]<br>
3rd parameter - percentage range of lightness [-100, 100]<br>
4th parameter - percentage range of opacity [0, 100]<br>
