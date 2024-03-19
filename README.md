# postcss-dynamic-pixel

> Dynamic Pixel is an adaptation for pixel-level UI scaling that dynamically modifies CSS pixel values based on the proportion of browser viewport width to design draft width.

Use [postcss-dynamic-pixel](https://github.com/OSpoon/postcss-dynamic-pixel) to achieve pixel-level UI scaling without adding any burden.

[中文文档](./README_zh.md)

## Formula：

```bash
Actual pixel = Design Draft UI size * viewport width / Design draft width
```

| Design Draft UI size        | viewport width | Design draft width | Actual pixel    |
| ---------------- | ---- | ----- | ------- |
| font-size: 16px; | 1600 | 1600  | 16px    |
| font-size: 16px; | 1366 | 1600  | 13.66px |
| font-size: 16px; | 1920 | 1600  | 19.2px  |

PS: Viewports in the table are all 100vw wide;

## Installation：

```bash
npm install postcss postcss-dynamic-pixel --save-dev
```

## Configuration：

```javascript
// ./postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-dynamic-pixel': {
      idealViewportWidth: 750,
      currentViewportWidth: 100,
      minViewportWidth: 320,
      maxViewportWidth: 1440,
    },
  },
}
```

## Options：

```javascript
export interface DynamicPixelOptions {
  /* Ideal window width, design width, set by pixel value, but omit unit (px) */
  idealViewportWidth?: number
  /* Current window width, set by viewport value, but omit unit (vw) */
  currentViewportWidth?: number

  /* Minimum window width, set by pixel value but omit unit (px) */
  minViewportWidth?: number
  /* Maximum window width, set by pixel value but omit unit (px) */
  maxViewportWidth?: number

  /* Ideal font size, set by pixel value, but omit the unit (px) */
  idealFontSize?: number

  /* Whether to replace the original value */
  replace?: boolean

  /* A list of skipped properties */
  skipProps?: string[]
  /* Skip a list of selectors */
  skipSelectors?: string[] | RegExp[]
  /* Whether to process pixel values in media queries */
  mediaQuery?: boolean
  /* Excluded file list */
  exclude?: RegExp
}
```

## Previews：

```bash
npm run example
```

## Compatibility：

![Image.png](https://github.com/OSpoon/postcss-dynamic-pixel/assets/10126623/077ca3f9-4a91-482f-aee5-fb287dcdd25f)

![Image.png](https://github.com/OSpoon/postcss-dynamic-pixel/assets/10126623/9fda3cb8-edfb-4b1e-bd1b-11c8600a6d33)

## Inspiration：

[掘金付费小册《现代 Web 布局 · 大漠 著》如何像素级完美还原一个可缩放的 UI 界面？章节的 PostCSS 插件实现](https://juejin.cn/book/7161370789680250917/section/7165496907714789407#heading-14)

[Uniform UI viewport scaling demo](https://codepen.io/gbnikolov/pen/oNZRNQR)

## Thanks：

[https://juejin.cn/user/1908407916041614](https://juejin.cn/user/1908407916041614)

[https://github.com/evrone/postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)

## Licence：

[MIT](./LICENSE) License © 2024-PRESENT [OSpoon](https://github.com/OSpoon)

