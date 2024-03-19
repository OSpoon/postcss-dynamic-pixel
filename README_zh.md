# postcss-dynamic-pixel

> “动态像素”是实现像素级别 UI 缩放的一种适配方案，基于浏览器视口宽度和设计稿宽度的比例动态修改CSS 像素值。

使用 [postcss-dynamic-pixel](https://github.com/OSpoon/postcss-dynamic-pixel)可以在不增加任何负担的前提下实现像素级别的 UI 缩放。

## 公式：

```bash
实际像素 = 设计稿UI尺寸 * 视口宽度 / 设计稿宽度
```

| 设计稿 UI 尺寸        | 视口宽度 | 设计稿宽度 | 实际像素    |
| ---------------- | ---- | ----- | ------- |
| font-size: 16px; | 1600 | 1600  | 16px    |
| font-size: 16px; | 1366 | 1600  | 13.66px |
| font-size: 16px; | 1920 | 1600  | 19.2px  |

PS：表格中的视口宽度均为 100vw；

## 安装：

```bash
npm install postcss postcss-dynamic-pixel --save-dev
```

## 配置：

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

## 选项：

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

## 预览：

```bash
npm run example
```

## 兼容性：

![Image.png](https://github.com/OSpoon/postcss-dynamic-pixel/assets/10126623/077ca3f9-4a91-482f-aee5-fb287dcdd25f)

![Image.png](https://github.com/OSpoon/postcss-dynamic-pixel/assets/10126623/9fda3cb8-edfb-4b1e-bd1b-11c8600a6d33)

## 灵感：

[掘金付费小册《现代 Web 布局 · 大漠 著》如何像素级完美还原一个可缩放的 UI 界面？章节的 PostCSS 插件实现](https://juejin.cn/book/7161370789680250917/section/7165496907714789407#heading-14)

[Uniform UI viewport scaling demo](https://codepen.io/gbnikolov/pen/oNZRNQR)

## 感谢：

[https://juejin.cn/user/1908407916041614](https://juejin.cn/user/1908407916041614)

[https://github.com/evrone/postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)

## 执照：

[MIT](./LICENSE) License © 2024-PRESENT [OSpoon](https://github.com/OSpoon)

