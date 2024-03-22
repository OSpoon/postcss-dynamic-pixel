import type { Declaration, Plugin, Rule } from 'postcss'

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

const UNIT = 'px'
const UNIT_REGEXP = new RegExp(`"[^"]+"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)${UNIT}`, 'g')

const DEFAULT_IDEAL_VIEWPORT_WIDTH = 1920
const DEFAULT_CURRENT_VIEWPORT_WIDTH = 100
const DEFAULT_MIN_VIEWPORT_WIDTH = 768
const DEFAULT_MAX_VIEWPORT_WIDTH = 2560
const DEFAULT_DEFAULT_FONT_SIZE = 16
const DEFAULT_MEDIAQUERY = false
const DEFAULT_REPLACE = true
const DEFAULT_SKIPPROPS = [] as string[]
const DEFAULT_SKIPSELECTORS = [] as string[]

const defaultOptions: DynamicPixelOptions = {
  idealViewportWidth: DEFAULT_IDEAL_VIEWPORT_WIDTH,
  currentViewportWidth: DEFAULT_CURRENT_VIEWPORT_WIDTH,
  minViewportWidth: DEFAULT_MIN_VIEWPORT_WIDTH,
  maxViewportWidth: DEFAULT_MAX_VIEWPORT_WIDTH,
  idealFontSize: DEFAULT_DEFAULT_FONT_SIZE,
  mediaQuery: DEFAULT_MEDIAQUERY,
  replace: DEFAULT_REPLACE,
  skipProps: DEFAULT_SKIPPROPS,
  skipSelectors: DEFAULT_SKIPSELECTORS,
}

/**
 * 动态生成 calc 表达式
 * @param value 设计稿元素尺寸值
 * @param idealViewportWidth 设计稿宽度
 * @param currentViewportWidth 当前视口宽度
 * @param min 最小视窗宽度
 * @param max 最大视窗宽度
 * @returns 返回 calc 表达式
 */
function genCalcExpression(value: number, idealViewportWidth: number, currentViewportWidth: number, min: number, max: number) {
  return `calc( ${value} * (clamp(${min}px, ${currentViewportWidth}vw, ${max}px) / ${idealViewportWidth}) )`
}

function skipSelectors(rule: Rule | undefined, skips: string[] | RegExp[]) {
  return skips.some((regex) => {
    if (typeof regex === 'string')
      return rule && rule.selector.includes(regex)
    return rule && rule.selector.match(regex)
  })
}

function skipProps(decl: Declaration, skips: string[]) {
  return skips.includes(decl.prop)
}

function skipMediaQuery(rule: Rule | undefined, mediaQuery: boolean) {
  return rule && rule.parent?.type === 'atrule' && !mediaQuery
}

function skipFiles(rule: Rule | undefined, exclude: RegExp | undefined) {
  const file = rule?.source?.input.file
  if (exclude && file)
    return exclude.test(file)
}

function dynamicPixel(opts?: DynamicPixelOptions): Plugin {
  const options = Object.assign({}, defaultOptions, opts)
  return {
    postcssPlugin: 'postcss-dynamic-pixel',
    Rule(rule) {
      // 跳过指定文件
      if (skipFiles(rule, options.exclude))
        return
      // 跳过媒体查询
      if (skipMediaQuery(rule, options.mediaQuery || DEFAULT_MEDIAQUERY))
        return
      // 跳过指定选择器
      if (skipSelectors(rule, options.skipSelectors || DEFAULT_SKIPPROPS))
        return
      rule.walkDecls((decl) => {
        // 跳过指定属性
        if (skipProps(decl, options.skipProps || DEFAULT_SKIPSELECTORS))
          return
        // 跳过已处理属性
        if (Reflect.get(decl, 'skip'))
          return
        const declValue = decl.value.replace(UNIT_REGEXP, (m): string => {
          const value = Number(m.replace(UNIT, ''))
          if (Number.isNaN(value))
            return m
          if (value === 0)
            return '0'
          return genCalcExpression(
            // 设计稿元素尺寸值
            value,
            // 设计稿宽度
            options.idealViewportWidth || DEFAULT_IDEAL_VIEWPORT_WIDTH,
            // 当前视口宽度
            options.currentViewportWidth || DEFAULT_CURRENT_VIEWPORT_WIDTH,
            // 最小视窗宽度
            options.minViewportWidth || DEFAULT_MIN_VIEWPORT_WIDTH,
            // 最大视窗宽度
            options.maxViewportWidth || DEFAULT_MAX_VIEWPORT_WIDTH,
          )
        })
        if (options.replace) {
          decl.value = declValue
          Reflect.set(decl, 'skip', true)
        }
      })
    },
  }
}

dynamicPixel.postcss = true
export default dynamicPixel
