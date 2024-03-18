# postcss-dynamic-pixel

基于“视窗宽度”动态调整CSS像素值

## Idea

[掘金付费小册《现代 Web 布局 · 大漠 著》如何像素级完美还原一个可缩放的 UI 界面？章节的 PostCSS 插件实现](https://juejin.cn/book/7161370789680250917/section/7165496907714789407#heading-14)

### 重点摘录:

像素缩放计算的公式: `元素像素缩放计算值 = 设计稿上元素尺寸基数 x  100vw / 设计稿视窗宽度基数`;

* 设计稿上元素尺寸基数：指的是设计稿上 UI 元素尺寸的基数值，不带任何单位。比如设计稿上的某个 UI 元素的字号是 16px，那么代表 font-size 的基数值是16，该值也被称为理想尺寸值；
* 100vw：代表访问应用设备当前视窗的宽度；
* 设计稿视窗宽度基数：指的是设计稿的尺寸宽度，该宽度也被称为理想视窗宽度，比如目前移动端设计稿都是750px 宽度做的设计，那么这个理想视窗宽度（设计稿视窗宽度基数）就是 750；
* 元素像素缩放计算值：指的就是 UI 元素根据计算公式得到的最终计算值，它会随着设备的当前视窗宽度值做缩放。

目前的像素缩放计算的公式，虽然能让 UI 元素尺寸大小根据视窗大小做出动态计算，从而实现完美的像素级缩放，但其还是略有不完美之处，因为不管视窗的大小，最终都会影响到计算值，也会影响到 UI 界面的最终效果。为此，我们可以给这种方式添加一把锁。即，使用 CSS 的 clamp() 函数来控制用户的最小视窗和最大视窗的宽度。

SCSS 函数实现:

```scss
/** 
* @param {Number} $value - 理想尺寸基数，不带任何单位，设计稿对应的元素尺寸值，eg 设计稿元素宽度是500，$value = 500 
* @param {Number} $idealViewportWidth - 理想视窗宽度基数，不带单位，设计稿的宽度 
* @param {String} $min - 最小视窗宽度 * @param {String} $max - 最大视窗宽度 
**/
@function scalePixelValue($value, $idealViewportWidth: 1600, $min: 320px, $max: 3480px) { 
    @return calc( #{$value} * (clamp(#{$min}, 100vw, #{$max}) / #{$idealViewportWidth})) 
}
```

## Install

```bash
npm install postcss postcss-dynamic-pixel --save-dev
```

## Configuration

```JavaScript
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

## All Options

```typescript
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

## Preview

```bash
npm run example
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [OSpoon](https://github.com/OSpoon)
