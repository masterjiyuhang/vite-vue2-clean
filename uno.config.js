import { defineConfig, presetAttributify, presetUno } from 'unocss';
import presetMini from '@unocss/preset-mini';
import presetWind from '@unocss/preset-wind';
import presetRemToPx from '@unocss/preset-rem-to-px';

export default defineConfig({
  // ...UnoCSS options
  presets: [presetWind(), presetAttributify(), presetUno(), presetRemToPx(), presetMini()], // disable default preset
  rules: [
    // your custom rules
  ],
});
