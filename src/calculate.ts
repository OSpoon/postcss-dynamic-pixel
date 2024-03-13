declare const window: { innerWidth: number }

/**
 * 限制输入值 value 在 min 和 max 之间
 * @param value 输入值
 * @param min 最小值
 * @param max 最大值
 * @returns value 小于最小值返回最小值，value大于最大值返回最大值，value介于两者中间返回value值。
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * 计算当前视口宽度的像素值（px）
 * @param currentViewportWidth 视口宽度（vw）
 * @returns 通过传入的 vw 的数值计算当前视口宽度的像素值（px）
 */
function currentViewportWidthInPixels(currentViewportWidth: number) {
  const viewportWidthInPixels = 1920
  // if (window !== undefined)
  //   viewportWidthInPixels = window.innerWidth
  return viewportWidthInPixels / 100 * currentViewportWidth
}

/**
 * 动态计算像素值
 * @param value 设计稿元素尺寸值
 * @param idealViewportWidth 设计稿宽度
 * @param currentViewportWidth 当前视口宽度
 * @param min 最小视窗宽度
 * @param max 最大视窗宽度
 * @returns 动态计算像素值
 */
export function dynamicPixelValue(value: number, idealViewportWidth: number, currentViewportWidth: number, min: number, max: number): number {
  return value * clamp(currentViewportWidthInPixels(currentViewportWidth), min, max) / idealViewportWidth
}
