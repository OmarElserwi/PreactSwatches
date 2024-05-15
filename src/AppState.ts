import { signal } from "@preact/signals";

// state
export const count = signal(10);

export type swatch = {
  index: number;
  hue: number;
  sat: number;
  lum: number;
  selected: boolean;
  red: number;
  green: number;
  blue: number;
  hex: string;
};

export const swatches = signal<swatch[]>([]);

// function to convert hsl to rgb
function hslToRgb(h: number, s: number, l: number): [r: number, g: number, b: number ] {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
      r = g = b = l; // achromatic
  } else {
      const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


// function to convert rgb to hex
function rgbToHex(r: number, g: number, b: number): string {
  const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// function to convert rgb to hsl
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
      h = s = 0; // achromatic
  } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
          case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
          case g:
              h = (b - r) / d + 2;
              break;
          case b:
              h = (r - g) / d + 4;
              break;
      }

      h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// function to convert hex to rgb
function hexToRgb(hex: string): [number, number, number] {
  // Remove '#' from the beginning of the hex string
  hex = hex.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

// prepopulate 10 swatches with random colors
for (let i = 0; i < 10; i++) {
  const hue = Math.floor(Math.random() * 360);
  const sat = Math.floor(Math.random() * 100);
  const lum = Math.floor(Math.random() * 100);
  const selected = false;
  const index = i;

  const [r, g, b] = hslToRgb(hue, sat, lum);
  const hex = rgbToHex(r, g, b);

  swatches.value.push({ index, hue, sat, lum, selected, red: r, green: g, blue: b, hex: hex });
}

export const selected = signal<number>(0);

// very simple unique id generator
let nextId = 10;

// mutations
export const increment = () => {
  count.value++;
};

export const decrement = () => {
  count.value--;
}

export const addToSwatches = () => {
  count.value++;
  const hue = Math.floor(Math.random() * 360);
  const sat = Math.floor(Math.random() * 100);
  const lum = Math.floor(Math.random() * 100);
  const [r, g, b] = hslToRgb(hue, sat, lum);
  const hex = rgbToHex(r, g, b);
  const index = swatches.value.length;
  
  swatches.value = [
    ...swatches.value,
    {
      index,
      hue,
      sat,
      lum,
      selected: false,
      red: r,
      green: g,
      blue: b,
      hex,
    },
  ];

  // deselect previously selected swatch
  swatches.value[selected.value].selected = false;
  console.log(swatches.value);

  // select newly added swatch
  swatches.value[swatches.value.length - 1].selected = true;

  // update selected
  selected.value = swatches.value.length - 1;

  console.log(selected.value);
};

export const deleteSelectedSwatch = () => {
  count.value--;
  console.log("deleteSelectedSwatch selected: " + selected.value);
  swatches.value.splice(selected.value, 1);
  console.log(swatches.value);
  selected.value = 0;
  selectSwatch(0);

  // update swatches array indicies
  for (let i = 0; i < swatches.value.length; i++) {
    swatches.value[i].index = i;
  }

  // update swatches to force re-render
  swatches.value = [...swatches.value];
  
}

export const selectSwatch = (index: number) => {
  // deselect previously selected swatch
  swatches.value[selected.value].selected = false;

  // select newly selected swatch
  swatches.value[index].selected = true;

  // update selected
  selected.value = index;

  console.log("selectSwatch selected: " + selected.value);

  // update swatches to force re-render
  swatches.value = [...swatches.value];
}

function updateRGBHexGivenHSL(hue: number, sat: number, lum: number) {
  const [r, g, b] = hslToRgb(hue, sat, lum);
  const hex = rgbToHex(r, g, b);

  swatches.value[selected.value].red = r;
  swatches.value[selected.value].green = g;
  swatches.value[selected.value].blue = b;
  swatches.value[selected.value].hex = hex;
}

function updateHSLHexGivenRGB(red: number, green: number, blue: number) {
  const [h, s, l] = rgbToHsl(red, green, blue);
  const hex = rgbToHex(red, green, blue);

  swatches.value[selected.value].hue = h;
  swatches.value[selected.value].sat = s;
  swatches.value[selected.value].lum = l;
  swatches.value[selected.value].hex = hex;
}

function updateHSLRGBGivenHex(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);

  swatches.value[selected.value].red = r;
  swatches.value[selected.value].green = g;
  swatches.value[selected.value].blue = b;
  swatches.value[selected.value].hue = h;
  swatches.value[selected.value].sat = s;
  swatches.value[selected.value].lum = l;
}

export const updateHex = (hex: string) => {
  swatches.value[selected.value].hex = hex;

  // update RGB HSL
  updateHSLRGBGivenHex(hex);
  swatches.value = [...swatches.value];
}

export const updateHue = (hue: number) => {
  swatches.value[selected.value].hue = hue;

  // update RGB hex
  updateRGBHexGivenHSL(hue, swatches.value[selected.value].sat, swatches.value[selected.value].lum);
  swatches.value = [...swatches.value];
}

export const updateSat = (sat: number) => {
  swatches.value[selected.value].sat = sat;

  // update RGB hex
  updateRGBHexGivenHSL(swatches.value[selected.value].hue, sat, swatches.value[selected.value].lum);
  swatches.value = [...swatches.value];
}

export const updateLum = (lum: number) => {
  swatches.value[selected.value].lum = lum;

  // update RGB hex
  updateRGBHexGivenHSL(swatches.value[selected.value].hue, swatches.value[selected.value].sat, lum);
  swatches.value = [...swatches.value];
}

export const updateRed = (red: number) => {
  swatches.value[selected.value].red = red;

  // update HSL hex
  updateHSLHexGivenRGB(red, swatches.value[selected.value].green, swatches.value[selected.value].blue);
  swatches.value = [...swatches.value];
}

export const updateGreen = (green: number) => {
  swatches.value[selected.value].green = green;

  // update HSL hex
  updateHSLHexGivenRGB(swatches.value[selected.value].red, green, swatches.value[selected.value].blue);
  swatches.value = [...swatches.value];
}

export const updateBlue = (blue: number) => {
  swatches.value[selected.value].blue = blue;

  // update HSL hex
  updateHSLHexGivenRGB(swatches.value[selected.value].red, swatches.value[selected.value].green, blue);
  swatches.value = [...swatches.value];
}

selectSwatch(0);
