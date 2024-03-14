import postcss from 'postcss'
import { describe, expect, it } from 'vitest'
import { dynamicPixel } from '../src'

describe('should all pass 😄', () => {
  it('should replace all px with the formula', async () => {
    const result = await postcss([dynamicPixel()]).process(`h1 { margin: 0 0 20px; font-size: 32px; line-height: 2; letter-spacing: 1px; }`)
    expect(result.css).toMatchInlineSnapshot('"h1 { margin: 0 0 calc( 20 * (clamp(768px, 100vw, 2560px) / 1920) ); font-size: calc( 32 * (clamp(768px, 100vw, 2560px) / 1920) ); line-height: 2; letter-spacing: calc( 1 * (clamp(768px, 100vw, 2560px) / 1920) ); }"')
  })

  it('should remain unitless if 0', async () => {
    const result = await postcss([dynamicPixel()]).process(`.rule { font-size: 0px; font-size: 0; }`)
    expect(result.css).toMatchInlineSnapshot('".rule { font-size: 0; font-size: 0; }"')
  })

  it('should not replace units inside mediaQueries by default', async () => {
    const result = await postcss([dynamicPixel()]).process(`@media (min-width: 500px) { .rule { font-size: 16px } }`)
    expect(result.css).toMatchInlineSnapshot('"@media (min-width: 500px) { .rule { font-size: 16px } }"')
  })

  it('should not replace values in double quotes or single quotes', async () => {
    const result = await postcss([dynamicPixel()]).process(`.rule { content: \'16px\'; font-family: "16px"; font-size: 16px; }`)
    expect(result.css).toMatchInlineSnapshot('".rule { content: \'16px\'; font-family: \\"16px\\"; font-size: calc( 16 * (clamp(768px, 100vw, 2560px) / 1920) ); }"')
  })

  it('should not replace values in `url()`', async () => {
    const result = await postcss([dynamicPixel()]).process(`.rule { background: url(16px.jpg); font-size: 16px; }`)
    expect(result.css).toMatchInlineSnapshot('".rule { background: url(16px.jpg); font-size: calc( 16 * (clamp(768px, 100vw, 2560px) / 1920) ); }"')
  })

  it('should not replace values with an uppercase P or X', async () => {
    const result = await postcss([dynamicPixel()]).process(`.rule { margin: 12px calc(100% - 14PX); height: calc(100% - 20px); font-size: 12Px; line-height: 16px; }`)
    expect(result.css).toMatchInlineSnapshot('".rule { margin: calc( 12 * (clamp(768px, 100vw, 2560px) / 1920) ) calc(100% - 14PX); height: calc(100% - calc( 20 * (clamp(768px, 100vw, 2560px) / 1920) )); font-size: 12Px; line-height: calc( 16 * (clamp(768px, 100vw, 2560px) / 1920) ); }"')
  })

  it('should ignore non px values by default', async () => {
    const result = await postcss([dynamicPixel()]).process(`.rule { font-size: 2em }`)
    expect(result.css).toMatchInlineSnapshot('".rule { font-size: 2em }"')
  })

  it('should ignore selectors in the selector black list', async () => {
    const result = await postcss([dynamicPixel({
      skipSelectors: ['.rule2'],
    })]).process(`.rule { font-size: 15px } .rule2 { font-size: 15px }`)
    expect(result.css).toMatchInlineSnapshot('".rule { font-size: calc( 15 * (clamp(768px, 100vw, 2560px) / 1920) ) } .rule2 { font-size: 15px }"')
  })

  it('should ignore every selector with `body$`', async () => {
    const result = await postcss([dynamicPixel({
      skipSelectors: ['body$'],
    })]).process(`body { font-size: 16px; } .class-body$ { font-size: 16px; } .simple-class { font-size: 16px; }`)
    expect(result.css).toMatchInlineSnapshot('"body { font-size: calc( 16 * (clamp(768px, 100vw, 2560px) / 1920) ); } .class-body$ { font-size: 16px; } .simple-class { font-size: calc( 16 * (clamp(768px, 100vw, 2560px) / 1920) ); }"')
  })

  it('should only ignore exactly `body`', async () => {
    const result = await postcss([dynamicPixel({
      skipSelectors: [/^body$/],
    })]).process(`body { font-size: 16px; } .class-body { font-size: 16px; } .simple-class { font-size: 16px; }`)
    expect(result.css).toMatchInlineSnapshot('"body { font-size: 16px; } .class-body { font-size: calc( 16 * (clamp(768px, 100vw, 2560px) / 1920) ); } .simple-class { font-size: calc( 16 * (clamp(768px, 100vw, 2560px) / 1920) ); }"')
  })

  it('should replace px inside media queries if opts.mediaQuery', async () => {
    const result = await postcss([dynamicPixel({
      mediaQuery: true,
    })]).process(`@media (min-width: 500px) { .rule { font-size: 16px } }`)
    expect(result.css).toMatchInlineSnapshot('"@media (min-width: 500px) { .rule { font-size: calc( 16 * (clamp(768px, 100vw, 2560px) / 1920) ) } }"')
  })

  it('should not replace px inside media queries if not opts.mediaQuery', async () => {
    const result = await postcss([dynamicPixel({
      mediaQuery: false,
    })]).process(`@media (min-width: 500px) { .rule { font-size: 16px } }`)
    expect(result.css).toMatchInlineSnapshot('"@media (min-width: 500px) { .rule { font-size: 16px } }"')
  })

  it('when using regex at the time, the style should not be overwritten.', async () => {
    const result = await postcss([dynamicPixel({
      exclude: /\/node_modules\//,
    })]).process(`.rule { border: 1px solid #000; font-size: 16px; margin: 1px 10px; }`, {
      from: '/node_modules/main.css',
    })
    expect(result.css).toMatchInlineSnapshot('".rule { border: 1px solid #000; font-size: 16px; margin: 1px 10px; }"')
  })

  it('when using regex at the time, the style should be overwritten.', async () => {
    const result = await postcss([dynamicPixel({
      exclude: /\/node_modules\//,
    })]).process(`.rule { border: 1px solid #000; font-size: 16px; margin: 1px 10px; }`, {
      from: '/example/main.css',
    })
    expect(result.css).toMatchInlineSnapshot('".rule { border: calc( 1 * (clamp(768px, 100vw, 2560px) / 1920) ) solid #000; font-size: calc( 16 * (clamp(768px, 100vw, 2560px) / 1920) ); margin: calc( 1 * (clamp(768px, 100vw, 2560px) / 1920) ) calc( 10 * (clamp(768px, 100vw, 2560px) / 1920) ); }"')
  })

  it('empty template', async () => {
    const result = await postcss([dynamicPixel()]).process(``)
    expect(result.css).toMatchInlineSnapshot('""')
  })
})
