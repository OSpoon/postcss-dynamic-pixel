const { dynamicPixel } = require('./dist/index.cjs')

module.exports = {
  plugins: [
    dynamicPixel({
      idealViewportWidth: 750,
      currentViewportWidth: 100,
      minViewportWidth: 320,
      maxViewportWidth: 1440,
    }),
  ],
}
