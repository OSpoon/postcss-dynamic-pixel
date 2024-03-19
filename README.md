# postcss-dynamic-pixel

> Dynamic Pixel is an adaptation for pixel-level UI scaling that dynamically modifies CSS pixel values based on the proportion of browser viewport width to design draft width.

Use [postcss-dynamic-pixel](https://github.com/OSpoon/postcss-dynamic-pixel) to achieve pixel-level UI scaling without adding any burden.

## Formula：

```bash
实际像素 = 设计稿UI尺寸 * 视口宽度 / 设计稿宽度
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
  /* 理想视窗宽度,设计稿宽度，按像素值设置，但省略单位（px） */
  idealViewportWidth?: number
  /* 当前视窗宽度，按视口值设置，但省略单位（vw） */
  currentViewportWidth?: number

  /* 最小视窗宽度，按像素值设置，但省略单位（px） */
  minViewportWidth?: number
  /* 最大视窗宽度，按像素值设置，但省略单位（px） */
  maxViewportWidth?: number

  /* 理想的字体大小，按像素值设置，但省略单位（px） */
  idealFontSize?: number

  /* 是否替换原有值 */
  replace?: boolean

  /* 跳过的属性列表 */
  skipProps?: string[]
  /* 跳过的选择器列表 */
  skipSelectors?: string[] | RegExp[]
  /* 是否处理媒体查询中的像素值 */
  mediaQuery?: boolean
  /* 排除文件列表 */
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

