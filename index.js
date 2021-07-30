const checkRange = (count, start, end) => {
  if (count < start) return start
  if (count > end) return end
  return count
}

const checkRGB = (r, g, b) => {
  r = checkRange(r, 0, 255)
  g = checkRange(g, 0, 255)
  b = checkRange(b, 0, 255)
  return {r, g, b}
}

const HEXToRGB = hex => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16)
})

const RGBToHEX = (r, g, b) => `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`

const RGBToHSL = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255

  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const delta = max - min
  let [h, s, l] = [0, 0, 0]

  if (delta === 0) {
    h = 0
  } else if (max === r) {
    h = ((g - b) / delta) % 6
  } else if (max === g) {
    h = (b - r) / delta + 2
  } else if (max === b) {
    h = (r - g) / delta + 4
  }

  h = Math.round(h * 60)
  h = h < 0 ? h + 360 : h

  l = (max + min) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  l = +(l * 100).toFixed(1)
  s = +(s * 100).toFixed(1)

  l = checkRange(l, 0, 100)
  s = checkRange(s, 0, 100)

  return {h, s, l}
}

const HSLToRGB = (h, s, l) => {
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let [r, g, b] = [0, 0, 0]

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0  
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return checkRGB(r, g, b)
}

export const lightness = (hex, percent = 0) => {
  percent = checkRange(percent, -100, 100)

  const {r, g, b} = HEXToRGB(hex)
  let {h, s, l} = RGBToHSL(r, g, b)
  const light = percent > 0
  const range = light ? 100 - l : l

  if (light) {
    l += Math.round(range * 0.01 * percent)
  } else {
    l -= Math.round(range * 0.01 * percent * -1)
  }

  const {r:R, g:G, b:B} = HSLToRGB(h, s, l)
  
  return RGBToHEX(R, G, B)
}

export const saturation = (hex, percent = 0) => {
  percent = checkRange(percent, -100, 100)

  const {r, g, b} = HEXToRGB(hex)
  let {h, s, l} = RGBToHSL(r, g, b)
  const contrast = percent > 0
  const range = contrast ? 100 - s : s

  if (contrast) {
    s += Math.round(range * 0.01 * percent)
  } else {
    s -= Math.round(range * 0.01 * percent * -1)
  }

  const {r:R, g:G, b:B} = HSLToRGB(h, s, l)
  
  return RGBToHEX(R, G, B)
}
