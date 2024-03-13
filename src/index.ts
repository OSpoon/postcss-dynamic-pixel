import { log } from 'node:console'
import type { Plugin } from 'postcss'
import postcss from 'postcss'
import { dynamicPixelValue } from './calculate'

export interface DynamicPixelOptions {
  /* 理想视窗宽度,设计稿宽度，按像素值设置，但省略单位（px） */
  idealViewportWidth: number
  /* 当前视窗宽度，按视口值设置，但省略单位（vw） */
  currentViewportWidth: number

  /* 最小视窗宽度，按像素值设置，但省略单位（px） */
  minViewportWidth: number
  /* 最大视窗宽度，按像素值设置，但省略单位（px） */
  maxViewportWidth: number

  /* 理想的字体大小，按像素值设置，但省略单位（px） */
  idealFontSize: number

  /* 是否替换原有值 */
  replace: boolean
}

const defaultOptions: DynamicPixelOptions = {
  idealViewportWidth: 1920,
  currentViewportWidth: 100,
  minViewportWidth: 768,
  maxViewportWidth: 2560,
  idealFontSize: 16,
  replace: true,
}

const UNIT_REGEXP = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/g

export function dynamicPixel(opts?: DynamicPixelOptions): Plugin {
  const options = Object.assign({}, defaultOptions, opts)
  return {
    postcssPlugin: 'postcss-dynamic-pixel',
    Rule(_rule, _helper) {
    },
    Declaration(decl, _helper) {
      const matchs = decl.value.match(UNIT_REGEXP)
      if (matchs) {
        for (let i = 0; i < matchs.length; i++) {
          const isSkip = Reflect.get(decl, 'skip')
          if (!isSkip) {
            const originalValue = Number(matchs[i].replace('px', ''))
            const dynamicValue = dynamicPixelValue(originalValue, options.idealViewportWidth, options.currentViewportWidth, options.minViewportWidth, options.maxViewportWidth)
            const declValue = decl.value.replace(UNIT_REGEXP, `${dynamicValue}px`)
            if (options.replace) {
              decl.value = declValue
              Reflect.set(decl, 'skip', true)
            }
          }
        }
      }
    },
  }
}

// export const postcss = true

(async () => {
  const result = await postcss([dynamicPixel({
    idealViewportWidth: 2560,
    currentViewportWidth: 100,
    minViewportWidth: 768,
    maxViewportWidth: 2560,
    idealFontSize: 16,
    replace: true,
  })]).process(`/**
  * Paste or drop some CSS here and explore
  * the syntax tree created by chosen parser.
  * Enjoy!
  */
 
 @media screen and (min-width: 480px) {
     body {
         background-color: lightgreen;
     }
 }
 
 #main {
     border: 1px solid black;
 }
 
 ul li {
    padding: 5px 15px;
 }`)
  log(result.css)
})()
